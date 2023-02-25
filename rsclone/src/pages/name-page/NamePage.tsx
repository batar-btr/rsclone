import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CombinedActorCreditsCast,
  CombinedActorCreditsCrew,
} from "../../models/title";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../chart/spinner/Spinner";
import React from "react";
import IMDBService from "../../services/IMDBService";
import { IMDBRatingSVG } from "./namePageSVG";
import { Awards } from "./namePageStatic";
import { DotSpinner } from "../../components/dots-spinner/DotSpinner";
import { NameAside } from "./nameAside";
import { HollywoodIcons } from "./namePageStatic";
import { Photos } from "./namePageStatic";
import { Videos } from "./namePageStatic";

import { IActor } from "../../models/title";

import "./namePage.scss";

export const NamePage = () => {
  window.scrollTo(0, 0);

  const initialCombinedCast = [] as CombinedActorCreditsCast[];
  const initialCombinedCrew = [] as CombinedActorCreditsCrew[];

  const initialYoutubeKey = "dQw4w9WgXcQ";

  const initialObj = {} as IActor;

  const [movieLoading, setMovieLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState(initialYoutubeKey);
  const [general, setGeneral] = useState(initialObj);
  const [combinedCast, setCombinedCast] = useState(initialCombinedCast);
  const [combinedCrew, setCombinedCrew] = useState(initialCombinedCrew);
  const { id } = useParams();

  const img = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    if (id) {
      IMDBService()
        .getActor(id)
        .then((data) => setGeneral(data))
        .then(() =>
          IMDBService()
            .getCombinedActorCredits(id))
        .then((data) => {
          if (data.cast.length === 0) {
            let sortAr = [...data.crew].sort((x, y) => {
              const first = new Date(x.popularity);
              const second = new Date(y.popularity);

              if (first > second) {
                return -1;
              }

              if (second < first) {
                return 1;
              }

              return 0;
            });

            setCombinedCrew(sortAr);

            for (let i = 0; i < sortAr.length; i++) {
              if (sortAr[i].backdrop_path === null) {
                continue;
              } else {
                IMDBService()
                  .getVideos(sortAr[i].id)
                  .then((data) => {
                    if (data.results.length === 0) {
                      return;
                    } else {
                      setYoutubeKey(data.results[0].key);
                    }
                  })
                  .then(() => setVideoLoading(true));
                break;
              }
            }
          } else {
            let sortAr = [...data.cast].sort((x, y) => {
              const first = new Date(x.popularity);
              const second = new Date(y.popularity);

              if (first > second) {
                return -1;
              }

              if (second < first) {
                return 1;
              }

              return 0;
            });

            setCombinedCast(sortAr);

            for (let i = 0; i < sortAr.length; i++) {
              if (sortAr[i].backdrop_path === null) {
                continue;
              } else {
                IMDBService()
                  .getVideos(sortAr[i].id)
                  .then((data) => {
                    if (data.results.length === 0) {
                      return;
                    } else {
                      setYoutubeKey(data.results[0].key);
                    }
                  })
                  .then(() => setVideoLoading(true));
                break;
              }
            }
          }
        })
        .then(() => setMovieLoading(true));
    }
  };

  const NamePageContainer = () => {
    const popularity = general.popularity ? general.popularity.toFixed() : null;
    return (
      <>
        <div className="namePage__blur_bg"></div>
        <div className="namePage">
          <div className="namePage__title">
            <div className="namePage__title_name">{general.name}</div>
            <div className="namePage__title_rate">
              <div className="namePage__title_rate-imdbPro">
                <div className="namePage__title_rate-high">IMDbPro</div>
                <div className="namePage__title_rate-low">Starmeter</div>
              </div>
              <a href="" className="namePage__title_rate-top500">
                <div className="namePage__title_rate-svgWrapper">
                  <IMDBRatingSVG />
                  <span className="namePage__title_rate-difference">
                    {popularity}
                  </span>
                </div>
              </a>
            </div>
          </div>
          <Interactive />
          <Description />
        </div>
      </>
    );
  };

  const Interactive = () => {
    const image = img + general.profile_path;
    const imageCount = `99+ Photos`;

    return (
      <>
        <div className="namePage__interactive">
          <div className="namePage__interactive_dropshadow">
            <img src={image} alt="" className="namePage__interactive_image" />
          </div>
          <div className="namePage__interactive_video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeKey}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <a
            href={`https://www.imdb.com/name/${general.imdb_id}/videogallery?ref_=nm_ov_vi_sm`}
            className="namePage__interactive_videos"
          >
            <div className="namePage__interactive_videos-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-video-library"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
              </svg>
              <div className="namePage__interactive_videos-wrapper-count">
                99+ Videos
              </div>
            </div>
          </a>

          <a href={`https://www.imdb.com/name/${general.imdb_id}/mediaindex?ref_=nm_ov_mi_sm`} className="namePage__interactive_images">
            <div className="namePage__interactive_videos-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="ipc-icon ipc-icon--collections ipc-icon--inline sc-d7379f8f-0 jDDubC"
                id="iconContext-collections"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
              </svg>
              <div className="namePage__interactive_videos-wrapper-count">
                {imageCount}
              </div>
            </div>
          </a>
        </div>
      </>
    );
  };

  const Description = () => {
    const transformDate = (str: string) => {
      let day = str.split("-")[2];
      let month = str.split("-")[1];
      let year = str.split("-")[0];

      switch (month) {
        case "01":
          return `January ${day}, ${year}`;
        case "02":
          return `February ${day}, ${year}`;
        case "03":
          return `March ${day}, ${year}`;
        case "04":
          return `April ${day}, ${year}`;
        case "05":
          return `May ${day}, ${year}`;
        case "06":
          return `June ${day}, ${year}`;
        case "07":
          return `July ${day}, ${year}`;
        case "08":
          return `August ${day}, ${year}`;
        case "09":
          return `September ${day}, ${year}`;
        case "10":
          return `October ${day}, ${year}`;
        case "11":
          return `November ${day}, ${year}`;
        case "12":
          return `December ${day}, ${year}`;
        default:
          return `Month ${day}, ${year}`;
      }
    };

    let bornDate = transformDate(general.birthday);
    const contactInfo = `https://pro.imdb.com/name/${general.imdb_id}/?rf=cons_nm_contact&amp;ref_=cons_nm_contact`;
    const agentInfo = `https://pro.imdb.com/name/${general.imdb_id}/?rf=cons_nm_ov_agent&amp;ref_=cons_nm_ov_agent`;
    const resume = `https://pro.imdb.com/name/${general.imdb_id}/?rf=cons_nm_ov_res&amp;ref_=cons_nm_ov_res`;
    const mainLink = `https://pro.imdb.com/name/${general.imdb_id}/?rf=cons_nm_more&amp;ref_=cons_nm_more`;

    const Biography = () => {
      return (
        <>
          <div className="namePage__description_biography">
            <a href="">
              <div className="namePage__description_biography-mainText">
                {general.biography}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="namePage__description_biography-mainText-link"
                  id="iconContext-chevron-right"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path>
                </svg>
              </div>
            </a>

            <div className="namePage__description_biography-links">
              <div className="namePage__description_biography-links-PRO">
                <a href="">More at IMDbPro</a>
              </div>

              <ul className="namePage__description_biography-items">
                <li className="namePage__description_biography-item">
                  <a
                    className="namePage__description_biography-item-link"
                    href={contactInfo}
                  >
                    Contact info
                  </a>
                </li>
                <li className="namePage__description_biography-item">
                  <a
                    className="namePage__description_biography-item-link"
                    href={agentInfo}
                  >
                    Agent info
                  </a>
                </li>
                <li className="namePage__description_biography-item">
                  <a
                    className="namePage__description_biography-item-link"
                    href={resume}
                  >
                    Resume
                  </a>
                </li>
              </ul>

              <a
                className="namePage__description_biography-mainLink"
                href={mainLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="namePage__description_biography-mainLink-launch"
                  id="iconContext-launch"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path d="M16 16.667H8A.669.669 0 0 1 7.333 16V8c0-.367.3-.667.667-.667h3.333c.367 0 .667-.3.667-.666C12 6.3 11.7 6 11.333 6h-4C6.593 6 6 6.6 6 7.333v9.334C6 17.4 6.6 18 7.333 18h9.334C17.4 18 18 17.4 18 16.667v-4c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667V16c0 .367-.3.667-.667.667zm-2.667-10c0 .366.3.666.667.666h1.727L9.64 13.42a.664.664 0 1 0 .94.94l6.087-6.087V10c0 .367.3.667.666.667.367 0 .667-.3.667-.667V6h-4c-.367 0-.667.3-.667.667z"></path>
                </svg>
              </a>
            </div>
          </div>
        </>
      );
    };

    const OutOfBiography = () => {
      return (
        <>
          <div className="namePage__description_biography">
            The biography of this actor is not available
          </div>
        </>
      );
    };

    const biographyInformation =
      general.biography.length !== 0 ? <Biography /> : <OutOfBiography />;

    return (
      <>
        <div className="namePage__description">
          {biographyInformation}
          <div className="namePage__description_born">
            <div className="namePage__description_born-wrapper">
              <div className="namePage__description_born-date">
                <span>Born</span>
                {bornDate}
              </div>

              <div className="namePage__description_born-button">
                <button className="namePage__description_born-addToListBtn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="namePage__description_born-addToListBtn-svg"
                    id="iconContext-add"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
                  </svg>
                  <div className="namePage__description_born-addToListBtn-text">
                    Add to list
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const KnownFor = (arr: CombinedActorCreditsCast[]) => {
    let knownForItems = [...arr].slice(0, 4);

    const knownItems = knownForItems.map((item) => {
      const image = "https://image.tmdb.org/t/p/w500";

      return (
        <li key={uuidv4()} className="knownFor__wrapper_item">
          <div className="knownFor__wrapper_poster">
            <div className="knownFor__wrapper_poster-image">
              <img src={image + item.poster_path} alt="" />
              <a
                href={`/movie/${item.id}`}
                className="knownFor__wrapper_poster-overlay"
              >
                <div className="knownFor__wrapper_poster-overlay-screen"></div>
              </a>
            </div>
          </div>

          <div className="knownFor__wrapper_about">
            <div className="knownFor__wrapper_about-title">
              <a
                href={`/movie/${item.id}`}
                className="knownFor__wrapper_about-title-link"
              >
                {item.title}
              </a>
            </div>
            <div className="knownFor__wrapper_about-vote">
              <div className="knownFor__wrapper_about-vote-group">
                <span className="knownFor__wrapper_about-vote-span">
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="knownFor__wrapper_about-vote-svg"
                    id="iconContext-star-inline"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
                  </svg>
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="knownFor__wrapper_about-character">
              {" "}
              {item.character}{" "}
            </div>

            <div className="knownFor__wrapper_about-content">
              <div className="knownFor__wrapper_about-release">
                {item.release_date.split("-")[0]}
              </div>
            </div>
          </div>
        </li>
      );
    });

    const knownList = <ul className="knownFor__wrapper">{knownItems}</ul>;

    return (
      <>
        <div className="knownFor">
          <div className="knownFor__title">
            <h3 className="knownFor__title_header">Known for</h3>
          </div>
          <div>{knownList}</div>
        </div>
      </>
    );
  };

  const Works = (arr: CombinedActorCreditsCast[]) => {
    const sortedCast = [...arr].filter(el => el.release_date).sort((x, y) => {
      const first = new Date(x.release_date);
      const second = new Date(y.release_date);

      if (first > second) {
        return -1;
      }

      if (second < first) {
        return 1;
      }

      return 0;
    });

    const worksListItems = sortedCast.map((item) => {
      const image =
        item.poster_path === null
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Ewm7Q6q1Hfk27r_fzAvwYr6IBHQt0PyQ9KgbFZVmrB_FoO2FydBS2tba2RqdxgjpIEg&usqp=CAU"
          : img + item.poster_path;

      const releaseDate =
        item.release_date !== null ? item.release_date.split("-")[0] : "";
      return (
        <li key={uuidv4()} className="namePage__works_item">
          <div className="namePage__works_item-image">
            <img loading="lazy" src={image} alt={item.title} />
          </div>

          <div className="namePage__works_item-description">
            <div className="namePage__works_item-description-about">
              <Link to={`/movie/${item.id}`} className="namePage__works_item-description-title">
                <div>{item.title}</div>
              </Link>
              <div className="namePage__works_item-description-character">
                {item.character}
              </div>
            </div>

            <div className="namePage__works_item-description-release">
              {releaseDate}
            </div>
          </div>
        </li>
      );
    });

    const worksList = (
      <ul className="namePage__works_content">{worksListItems}</ul>
    );

    return (
      <>
        <div className="namePage__works">
          <div className="namePage__works_title-wrapper">
            <h3 className="namePage__works_title">Works</h3>
          </div>
        </div>
        <div className="namePage__works_wrapper">{worksList}</div>
      </>
    );
  };

  const PersonalDetails = () => {
    const transformDate = (str: string) => {
      let day = str.split("-")[2];
      let month = str.split("-")[1];
      let year = str.split("-")[0];

      switch (month) {
        case "01":
          return `January ${day}, ${year}`;
        case "02":
          return `February ${day}, ${year}`;
        case "03":
          return `March ${day}, ${year}`;
        case "04":
          return `April ${day}, ${year}`;
        case "05":
          return `May ${day}, ${year}`;
        case "06":
          return `June ${day}, ${year}`;
        case "07":
          return `July ${day}, ${year}`;
        case "08":
          return `August ${day}, ${year}`;
        case "09":
          return `September ${day}, ${year}`;
        case "10":
          return `October ${day}, ${year}`;
        case "11":
          return `November ${day}, ${year}`;
        case "12":
          return `December ${day}, ${year}`;
        default:
          return `Month ${day}, ${year}`;
      }
    };

    const officialLink = `https://www.imdb.com/name/${general.imdb_id}/externalsites?ref_=nm_pdt_osites#official`;
    const nameArray = [...general.also_known_as].slice(0, 3);

    let names = nameArray.map((item) => {
      return (
        <li
          className="personalDetails__wrapper_list-item-alternativeName"
          key={uuidv4()}
        >
          {item}
        </li>
      );
    });

    const birthDate = transformDate(general.birthday);

    return (
      <>
        <div className="personalDetails">
          <div className="personalDetails__title_wrapper">
            <div className="personalDetails__title">
              <h3>Personal details</h3>
            </div>
          </div>

          <div className="personalDetails__wrapper">
            <ul className="personalDetails__wrapper_list">
              <li className="personalDetails__wrapper_list-item">
                <a href={officialLink}>Official site</a>
              </li>
              <li className="personalDetails__wrapper_list-item alternativeFlex">
                <div className="personalDetails__wrapper_list-item-altName">
                  Alternative names
                </div>
                <ul className="personalDetails__wrapper_list-item-alternative">
                  {names}
                </ul>
              </li>
              <li className="personalDetails__wrapper_list-item bornDate">
                <div className="personalDetails__wrapper_list-item-born">
                  Born
                </div>
                <div className="personalDetails__wrapper_list-item-birth ">
                  <div className="personalDetails__wrapper_list-item-birthDate">
                    {birthDate}
                  </div>
                  <div className="personalDetails__wrapper_list-item-birthPlace">
                    {general.place_of_birth}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  const Left = () => {
    return (
      <>
        {awards}
        <HollywoodIcons />
        <Photos ids={general.imdb_id} />
        {known}

        {works}

        <Videos ids={general.imdb_id} />

        <PersonalDetails />
      </>
    );
  };

  const spinner =
    movieLoading && videoLoading ? <NamePageContainer /> : <Spinner />;

  const awards =
    movieLoading && videoLoading ? (
      <Awards IMDBid={general.imdb_id} />
    ) : (
      DotSpinner({ theme: "light", size: "big" })
    );

  const known = combinedCast.length !== 0 ? KnownFor(combinedCast) : null;

  const works = combinedCast.length !== 0 ? Works(combinedCast) : null;

  const rightSide =
    movieLoading && videoLoading ? (
      <NameAside general={general} />
    ) : (
      DotSpinner({ theme: "light", size: "big" })
    );

  const leftSide =
    movieLoading && videoLoading ? (
      <Left />
    ) : (
      DotSpinner({ theme: "light", size: "big" })
    );

  return (
    <>
      <div className="namePage__container" style={{ backgroundImage: `url(${img + general.profile_path})` }}>{spinner}</div>

      <div className="namePage__container_wrapper">
        <div className="namePage__container_about">
          <div className="namePage__container_about-left">{leftSide}</div>

          <div className="namePage__container_about-right">{rightSide}</div>
        </div>
      </div>
    </>
  );
};
