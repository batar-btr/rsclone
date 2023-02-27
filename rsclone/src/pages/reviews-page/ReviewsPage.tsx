import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../chart/spinner/Spinner";
import React from "react";
import { TransformDetails } from "../../models/title";
import IMDBService from "../../services/IMDBService";
import { Link } from "react-router-dom";

import "./reviewsPage.scss";


export const ReviewsPage = () => {
  const initial = [] as Array<TransformDetails>;
  const [releaseDate, setReleaseDate] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [poster, setPoster] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [reviewList, setReviewList] = useState(initial);

  const params = useParams();
  const type = useLocation().pathname.split("/")[1];

  useEffect(() => {

    window.scrollTo(0, 0);
    onRequest();
    // eslint-disable-next-line
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
            .getReviews(type, params.id!)
            .then((reviewList) => setReviewList(reviewList))
            .then(() => setLoading(true));
        });
    } else {
      IMDBService()
        .getTitleTV(type, params.id!)
        .then((data) => {
          setReleaseDate(data.year);
          setTitle(data.title);
          setPoster(data.thumbnail);
        });

      IMDBService()
        .getReviews(type, params.id!)
        .then((reviewList) => setReviewList(reviewList))
        .then(() => setLoading(true));
    }
  };

  const HeaderContent = () => {
    const redirectTotitle = `/${type}/${params.id}`;
    return (
      <div className="fullcredit__header">
        <Link className="fullcredit__header_img" to={redirectTotitle}>
          <img src={poster} alt={title} />
        </Link>
        <div className="fullcredit__header_wrapper">
          <div className="fullcredit__header_title">
            <Link to={redirectTotitle}>{title}</Link>
            <span>({releaseDate})</span>
          </div>
          <h1 className="review__header_subtitle">User Reviews</h1>
        </div>
      </div>
    );
  };

  const Reviews = (arr: TransformDetails[]) => {
    const items = arr.map((item, id) => {
      const transformDate = (str: string) => {
        let day = str.split("-")[2];
        let month = str.split("-")[1];
        let year = str.split("-")[0];

        switch (month) {
          case "01":
            return `${day} Jan, ${year}`;
          case "02":
            return `${day} Feb, ${year}`;
          case "03":
            return `${day} Mar, ${year}`;
          case "04":
            return `${day} Apr, ${year}`;
          case "05":
            return `${day} May, ${year}`;
          case "06":
            return `${day} Jun, ${year}`;
          case "07":
            return `${day} Jul, ${year}`;
          case "08":
            return `${day} Aug, ${year}`;
          case "09":
            return `${day} Sep, ${year}`;
          case "10":
            return `${day} Oct, ${year}`;
          case "11":
            return `${day} Nov, ${year}`;
          case "12":
            return `${day} Dec, ${year}`;
          default:
            return `${day} Mon, ${year}`;
        }
      };

      const evenOrOdd = id % 2 === 0;
      const Rate = () => {
        return (
          <div className="review__wrapper_item-rate-bar">
            <span className="review__wrapper_item-rate-bar-other">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                <path d="M0 0h24v24H0z" fill="none"></path>
              </svg>
              <span>{item.rating}</span>
              <span className="review__wrapper_item-rate-bar-pointscale">
                /10
              </span>
            </span>
          </div>
        );
      };

      const rate = item.rating === null ? null : <Rate />;

      return (
        <li
          key={uuidv4()}
          className={
            evenOrOdd ? "review__wrapper_item odd" : "review__wrapper_item even"
          }
        >
          <div className="review__wrapper_item-rate">{rate}</div>

          <div className="review__wrapper_item-date">
            <span className="review__wrapper_item-date-user">
              {item.username}
            </span>
            <span className="review__wrapper_item-date-create">
              {transformDate(new Date(item.create).toISOString().split("T")[0])}
            </span>
          </div>

          <div className="review__wrapper_item-description">
            {item.description
              .replaceAll("&#39;", "")
              .split("**Full review:**")[0]
              .split("**")
              .map((el) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {el
                      .replace(".", "")
                      .replace("FULL SPOILER-FREE REVIEW @", "")}
                    <br />
                  </React.Fragment>
                );
              })}
          </div>          
        </li>
      );
    });

    return <ul className="review__wrapper_list">{items}</ul>;
  };

  let rev = Reviews(reviewList);

  const Content = () => {
    return reviewList.length === 0 ? (
      <OutOfReview />
    ) : (
      <>
        <div className="review__wrapper">{rev}</div>
      </>
    );
  };

  const OutOfReview = () => {
    return <div className="review__outOfReview">There are no reviews yet.</div>;
  };

  const loaded = loading ? <HeaderContent /> : <Spinner />;
  const content = loading ? <Content /> : null;

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
