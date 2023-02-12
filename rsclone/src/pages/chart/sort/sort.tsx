import { useState, useEffect } from "react";
import { ITransformMovie } from "../../../models/IMDBModels";
import { MostPopularSortState } from '../../../models/IMDBModels';
import { useSearchParams } from "react-router-dom";

import "./sort.scss";

export interface MostPopularSort {
  item: MostPopularSortState;
}

export const Sort = ({ item }: MostPopularSort) => {
  let defaultSelectValue = "asc";
  let defaultSelectCategory = "ir";
  const [selected, setSelected] = useState(defaultSelectValue);
  const [category, setCategory] = useState(defaultSelectCategory);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortCheck = "sort";

  const selectOptions = () => {
    let optionsArray: string[] = ["IMDb Rating", "Name", "Release Date"];
    let valueArray: string[] = ["ir", "rk", "us"];

    let items = optionsArray.map((item, i) => {
      return (
        <option value={`${valueArray[i]}:${selected}`} key={i}>
          {item}
        </option>
      );
    });

    return (
      <select
        id="sort-by-options"
        value={`${category}:${selected}`}
        name="sort"
        className="sort__options"
        onChange={(e) => {
          changeArray(e.target.value);
        }}
      >
        {items}
      </select>
    );
  };

  useEffect(() => {
    const sortCheck = "sort";
    const searchTerm = searchParams.get(sortCheck);

    if (searchTerm) {
      setCategory(searchTerm.split(".")[0]);
      setSelected(searchTerm.split(".")[1]);
      setLoading(true);

      if (loading) {
        changeArrowDirection();
      }
    }
    // eslint-disable-next-line
  }, [loading]);

  const changeArray = (array: string) => {
    let categ = array.split(":")[0];
    setCategory(categ);
  };

  const changeURLParams = () => {
    const searchTerm = searchParams.get(sortCheck) || [];

    if (searchTerm) {
      let sort = [category, selected].join(".");

      setSearchParams({ sort });
    }
  };

  const changeState = (arr: ITransformMovie[]) => {
    let newState: ITransformMovie[];

    if (selected === "asc") {
      if (category === "ir") {
        newState = [...arr].sort((x, y) => x.vote - y.vote);
        return newState;
      }

      if (category === "rk") {
        newState = [...arr].sort((x, y) => x.title.localeCompare(y.title));
        return newState;
      }

      if (category === "us") {
        newState = [...arr].sort((x, y) => {
          const first = new Date(x.year);
          const second = new Date(y.year);

          if (first < second) {
            return -1;
          }

          if (second > first) {
            return 1;
          }

          return 0;
        });
        return newState;
      }
    } else {
      if (category === "ir") {
        newState = [...arr].sort((x, y) => y.vote - x.vote);
        return newState;
      }

      if (category === "rk") {
        newState = [...arr].sort((x, y) => y.title.localeCompare(x.title));
        return newState;
      }

      if (category === "us") {
        newState = [...arr].sort((x, y) => {
          const first = new Date(x.year);
          const second = new Date(y.year);

          if (first > second) {
            return -1;
          }

          if (second < first) {
            return 1;
          }

          return 0;
        });
        return newState;
      }
    }
  };

  const changeArrowDirection = () => {
    selected === "asc" ? setSelected("desc") : setSelected("asc");
    let arr = item.item;

    let finalState = changeState(arr);

    if (finalState) {
      item.func(finalState);
    }
  };

  return (
    <div className="mostPopular__sort_wrapper">
      <label className="sort__label" htmlFor="sort-by-options">
        Sort by:
      </label>
      {selectOptions()}
      <span
        className={`sort__btn ${selected}ending`}
        onClick={() => {
          changeURLParams();
          changeArrowDirection();
        }}
      ></span>
    </div>
  );
};
