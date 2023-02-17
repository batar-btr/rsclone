import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Cast, Crew } from "../../models/title";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../chart/spinner/Spinner";
import React from "react";
import IMDBService from "../../services/IMDBService";

import "./fullCreditsPage.scss";

export const FullCreditsPage = () => {
  window.scrollTo(0, 0)
  
  const [releaseDate, setReleaseDate] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [poster, setPoster] = useState<string>();
  const [cast, setCast] = useState<Cast[]>();
  const [crew, setCrew] = useState<Crew[]>();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const type = useLocation().pathname.split("/")[1];

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    if (type === "movie") {

      IMDBService()
      .getTitleMovie(type, params.id!)
      .then((data) => {
        setReleaseDate(data.year);
        setTitle(data.title);
        setPoster(data.thumbnail);

        IMDBService()
        .getCredits(type, params.id!)
        .then((data) => {
          setCast(data.cast);
          setCrew(data.crew);
        }).then(() => setLoading(true));
      });
    } else {
      IMDBService()
      .getTitleTV(type, params.id!)
      .then((data) => {
        setReleaseDate(data.year);
        setTitle(data.title);
        setPoster(data.thumbnail);

        IMDBService()
          .getCredits(type, params.id!)
          .then((data) => {
            setCast(data.cast);
            setCrew(data.crew);
        }).then(() => setLoading(true));
      });
    }    

    
  };

  const HeaderContent = () => {
    return (
      <div className="fullcredit__header">
        <a className="fullcredit__header_img">
          <img src={poster} alt={title} />
        </a>
        <div className="fullcredit__header_wrapper">
          <div className="fullcredit__header_title">
            <a href="">{title}</a>
            <span>({releaseDate})</span>
          </div>
          <h1 className="fullcredit__header_subtitle">Full Cast & Crew</h1>
        </div>
      </div>
    );
  };

  const CastList = () => {
    const items = cast?.map((item, id) => {
      const _image = "https://image.tmdb.org/t/p/w500";
      const evenOrOdd = id % 2 === 0;
      const fullImage = _image + item.profile_path;
      const nullImage =
        "https://m.media-amazon.com/images/S/sash/N1QWYSqAfSJV62Y.png";

      return (
        <li
          key={uuidv4()}
          className={`${
            evenOrOdd
              ? "fullcredit__content_list-item odd"
              : "fullcredit__content_list-item even"
          }`}
        >
          <div className="fullcredit__content_list-img">
            <img
              src={`${item.profile_path === null ? nullImage : fullImage}`}
              alt=""
            />
          </div>
          <div className="fullcredit__content_list-name">
            <a href="">{item.name}</a>
          </div>
          <div className="fullcredit__content_list-dotted">...</div>
          <div className="fullcredit__content_list-character">
            {item.character}
          </div>
        </li>
      );
    });

    return <ul className="fullcredit__content_list">{items}</ul>;
  };

  const Сontent = () => {
    const castItems = CastList();

    return (
      <div className="fullcredit__content">
        <div className="fullcredit__content_crew">
          <DirectedBy />
        </div>
        <div className="fullcredit__content_cast">
          <h4 className="fullcredit__content_cast-title">
            Cast
            <span>(in credits order) verified as complete &nbsp;</span>
          </h4>
          {castItems}
        </div>
        <Writers />
      </div>
    );
  };

  const DirectedBy = () => {
    const directed = crew?.filter((item) => item.job === "Director");

    let directedArray: JSX.Element[] = [];

    if (directed) {
      for (let i = 0; i < directed.length; i++) {
        let directedItem = directed.map((item) => {
          return (
            <li className="fullcredit__content_crew-item" key={uuidv4()}>
              <div className="fullcredit__content_crew-item-name">
                <a href="">{item.name}</a>
              </div>
              <div>...</div>
              <div className="fullcredit__content_crew-item-job">
                (directed by)
              </div>
            </li>
          );
        });

        directedArray.push(...directedItem);
      }
    }

    return (
      <>
        <h4 className="fullcredit__content_crew-title">Directed by &nbsp;</h4>
        <ul className="fullcredit__content_crew-list">{directedArray}</ul>
      </>
    );
  };

  const renderCrewList = (str: string) => {
    const arrayCrew: JSX.Element[] = [];

    const items = crew?.filter((item) => item.job === str);

    if (items) {
      let crewItem = items.map((item) => {
        return (
          <li key={uuidv4()} className="fullcredit__content_crew-list-item">
            <a href="">{item.name}</a>
          </li>
        );
      });
      arrayCrew.push(...crewItem);
    }

    return (
      <React.Fragment key={uuidv4()}>
        <h4 className="fullcredit__content_crew-title">
          {items![0].job} &nbsp;
        </h4>
        <ul className="fullcredit__content_crew-list">{arrayCrew}</ul>
      </React.Fragment>
    );
  };

  const Writers = () => {
    const writedBy = crew?.map((item) => item.job);

    const uniqueCrewList = [...new Set(writedBy)];

    const renderList: JSX.Element[] = [];

    if (uniqueCrewList) {
      for (let i = 0; i < uniqueCrewList.length; i++) {
        const itemsCrew = renderCrewList(uniqueCrewList[i]);
        renderList.push(itemsCrew);
      }
    }

    return <>{renderList}</>;
  };

  const loaded =  loading ? <HeaderContent /> : <Spinner/>;
  const content = loading ? <Сontent /> : null;

  return (
    <>
      <div className="fullcredit">
        <div className="fullcredit__article">
          {loaded}
          {content}
        </div>
      </div>
    </>
  );
};
