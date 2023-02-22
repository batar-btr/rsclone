import { IActor } from "../../models/title";
import "./nameAside.scss";

export const NameAside = (props: { general: IActor }) => {
  const MoreToExplore = () => {
    return (
      <div className="nameAside__explore_wrapper">
        <h3 className="nameAside__explore">More to explore</h3>
      </div>
    );
  };

  const BlackHolywoodStars = () => {
    return (
      <>
        <div className="nameAside__black">
          <div className="nameAside__black_wrapper">
            <div className="nameAside__black_imageSet">
              <a href="https://www.imdb.com/imdbpicks/black-hollywood-stars/rg2741213952/mediaviewer/rm2623748097?ref_=nm_eds_right-3_sw_g_csegbhm_bhs_r_i" className="nameAside__black_imageSet-link">
                <div className="nameAside__black_imageSet-wrapper">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BOWE1MjI5NzgtMjdhZC00ZTQ3LWJkYjAtYjhkOWI1Mzc0YzNmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX380_CR0,36,380,214_.jpg"
                    alt=""
                  />

                  <div className="nameAside__black_imageSet-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      className="nameAside__black_imageSet-svg"
                      id="iconContext-collections"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
                    </svg>
                    <span className="nameAside__black_imageSet-text">
                      Photos
                    </span>
                  </div>
                  <div className="nameAside__black_imageSet-gradient"></div>
                </div>
              </a>
            </div>
          </div>

          <div className="nameAside__black_linksContainer">
            <a
              className="nameAside__black_linksContainer-title"
              href="https://www.imdb.com/imdbpicks/black-hollywood-stars/rg2741213952/mediaviewer/rm2623748097?ref_=nm_eds_right-3_sw_g_csegbhm_bhs_r_t"
            >
              <div className="nameAside__black_linksContainer-title-text">
                Black Hollywood Stars to Watch
              </div>
            </a>
            <div className="nameAside__black_linksContainer-gallery">
              <a
                className="nameAside__black_linksContainer-gallery-link"                
                href="https://www.imdb.com/imdbpicks/black-hollywood-stars/rg2741213952/mediaviewer/rm2623748097?ref_=nm_eds_right-3_sw_g_csegbhm_bhs_r_cta"
              >
                See the gallery
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  const EditorialList = () => {

    return (
      <>
        <div className="nameAside__editorial">
          <div className="nameAside__editorial_title">
            <h3 className="nameAside__editorial_title-text">Editorial lists</h3>

            <div className="nameAside__editorial_description">
              Related lists created by IMDb editors
            </div>
          </div>

          <div className="nameAside__editorial_wrapper">
            <ul className="nameAside__editorial_list">

              <li className="nameAside__editorial_list-item">
                <a href="https://www.imdb.com/list/ls063095038/?ref_=nm_rels_1"
                className="nameAside__editorial_list-item-link">
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                      The Billion-Dollar Film Club: 50+ Movies to Reach $1 Billion
                      Worldwide
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first"> updated 1 day ago </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">&nbsp;•&nbsp;</span>
                      <span className="nameAside__editorial_list-item-content-update-last">52 images</span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img src="https://m.media-amazon.com/images/M/MV5BZmI3ZTVhMmYtMDA0MS00MmFhLWIzOTAtODVjYzI2NzJjODY3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UY107_CR44,0,72,107_.jpg" alt="" />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a href="https://www.imdb.com/list/ls562750077/?ref_=nm_rels_2"
                className="nameAside__editorial_list-item-link">
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                      The most anticipated sequels, prequels, and spin-offs coming in 2023
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first"> updated 4 days ago </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">&nbsp;•&nbsp;</span>
                      <span className="nameAside__editorial_list-item-content-update-last">26 images</span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img src="https://m.media-amazon.com/images/M/MV5BMTExNDE4Y2YtOTA4Zi00MzBmLTk1MWEtYTk4OTY4Mzk3NWE3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UY107_CR65,0,72,107_.jpg" alt="" />
                    </div>
                  </div>
                </a>
              </li>


              <li className="nameAside__editorial_list-item">
                <a href="https://www.imdb.com/list/ls566265171/?ref_=nm_rels_3"
                className="nameAside__editorial_list-item-link">
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    The best things to watch this weekend: Dec. 16 - Dec. 19
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first"> updated 2 months ago </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">&nbsp;•&nbsp;</span>
                      <span className="nameAside__editorial_list-item-content-update-last">7 images</span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img src="https://m.media-amazon.com/images/M/MV5BOWNjY2I1ZjgtNDA4Zi00ODk4LWI2NDMtNDZmMjhjZjkwMjFiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY107_CR65,0,72,107_.jpg" alt="" />
                    </div>
                  </div>
                </a>
              </li>


              <li className="nameAside__editorial_list-item">
                <a href="https://www.imdb.com/list/ls566562419/?ref_=nm_rels_4"
                className="nameAside__editorial_list-item-link">
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    December Picks: The Movies and TV You Can't Miss
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first"> updated 2 monts ago </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">&nbsp;•&nbsp;</span>
                      <span className="nameAside__editorial_list-item-content-update-last">20 images</span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img src="https://m.media-amazon.com/images/M/MV5BMGZmOGZhOTItM2QxNy00OWQxLTlmNTQtZDg2ZWEzMzE3ODUxXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UY107_CR44,0,72,107_.jpg" alt="" />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a href="https://www.imdb.com/list/ls567861881/?ref_=nm_rels_5"
                className="nameAside__editorial_list-item-link">
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    New and upcoming sequels, prequels, and spin-offs
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first"> updated 3 monts ago </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">&nbsp;•&nbsp;</span>
                      <span className="nameAside__editorial_list-item-content-update-last">45 images</span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img src="https://m.media-amazon.com/images/M/MV5BMWUyOGEzMjktMTYxOC00MDZiLTgzYzctNDFmMGE0YTFlOGQzXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY107_CR44,0,72,107_.jpg" alt="" />
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </>
    );

  }

  const FamousMotherAndChildren = () => {
    return (
      <>
        <div className="nameAside__black">
          <div className="nameAside__black_wrapper">
            <div className="nameAside__black_imageSet">
              <a href="https://www.imdb.com/whats-on-tv/famous-moms-kids/rg2849282816/mediaviewer/rm2214608129?ref_=nm_eds_right-5_sw_fmac_r_i" className="nameAside__black_imageSet-link">
                <div className="nameAside__black_imageSet-wrapper">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BOTcxODZkNTktNmVmZC00NjMwLWFkYjMtMjVmN2E4NzM0ZWM5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_QL75_UX380_CR0,0,380,214_.jpg"
                    alt=""
                  />

                  <div className="nameAside__black_imageSet-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      className="nameAside__black_imageSet-svg"
                      id="iconContext-collections"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
                    </svg>
                    <span className="nameAside__black_imageSet-text">
                      Photos
                    </span>
                  </div>
                  <div className="nameAside__black_imageSet-gradient"></div>
                </div>
              </a>
            </div>
          </div>

          <div className="nameAside__black_linksContainer">
            <a
              className="nameAside__black_linksContainer-title"
              href="https://www.imdb.com/whats-on-tv/famous-moms-kids/rg2849282816/mediaviewer/rm2214608129?ref_=nm_eds_right-5_sw_fmac_r_t"
            >
              <div className="nameAside__black_linksContainer-title-text">
                Famous Mothers and Their Famous Children
              </div>
            </a>
            <div className="nameAside__black_linksContainer-gallery">
              <a
                className="nameAside__black_linksContainer-gallery-link"                
                href="https://www.imdb.com/whats-on-tv/famous-moms-kids/rg2849282816/mediaviewer/rm2214608129?ref_=nm_eds_right-5_sw_fmac_r_cta"
              >
                See the gallery
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };

  const UserLists = () => {

    const listLink = `https://www.imdb.com/lists/${props.general.imdb_id}/?ref_=nm_rls_sm`

    return (
      <>
        <div className="nameAside__editorial">
          <div className="nameAside__editorial_title">
            <a
              href={listLink}
              className="nameAside__editorial-title-userLink"
            >
              <h3 className="nameAside__editorial-title-userText">
                User lists
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="nameAside__editorial-title-userSvg"
                  id="iconContext-chevron-right-inline"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
                </svg>
              </h3>
            </a>

            <div className="nameAside__editorial_description">
              Related lists from IMDb users
            </div>
          </div>

          <div className="nameAside__editorial_wrapper">
            <ul className="nameAside__editorial_list">
              <li className="nameAside__editorial_list-item">
                <a
                  href="https://www.imdb.com/list/ls022638292/?ref_=nm_rls_1"
                  className="nameAside__editorial_list-item-link"
                >
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                      Atrizes
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first">
                        {" "}
                        created 4 years ago{" "}
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">
                        &nbsp;•&nbsp;
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-last">
                        22 people
                      </span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img
                        src="https://m.media-amazon.com/images/M/MV5BMjAyNjM4NTAwN15BMl5BanBnXkFtZTcwNDkxNzQzNg@@._V1_QL75_UY107_CR44,0,72,107_.jpg"
                        alt="Kareena Kapoor in Bodyguard (2011)"
                      />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a
                  href="https://www.imdb.com/list/ls561092018/?ref_=nm_rls_2"
                  className="nameAside__editorial_list-item-link"
                >
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                      Best Movie Couple of 2022
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first">
                        {" "}
                        created 6 months ago{" "}
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">
                        &nbsp;•&nbsp;
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-last">
                        35 images
                      </span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img
                        src="https://m.media-amazon.com/images/M/MV5BYzg3Mjc2MzgtMmRkNS00NjhhLWEwYjUtMWRlZGE2ZmRiNTk5XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UY107_CR44,0,72,107_.jpg"
                        alt="Natalie Portman and Chris Hemsworth in Thor: Love and Thunder (2022)"
                      />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a
                  href="https://www.imdb.com/list/ls564523302/?ref_=nm_rls_3"
                  className="nameAside__editorial_list-item-link"
                >
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    Top 40 Actresses “All time”: BZ
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first">
                        {" "}
                        created 2 weeks ago{" "}
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">
                        &nbsp;•&nbsp;
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-last">
                        40 people
                      </span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img
                        src="https://m.media-amazon.com/images/M/MV5BMTc1MDI0MDg1NV5BMl5BanBnXkFtZTgwMDM3OTAzMTE@._V1_QL75_UY107_CR1,0,72,107_.jpg"
                        alt="Cate Blanchett"
                      />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a
                  href="https://www.imdb.com/list/ls092494782/?ref_=nm_rls_4"
                  className="nameAside__editorial_list-item-link"
                >
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    Cs: Actresses - Favs
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first">
                        {" "}
                        created 2 years ago{" "}
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">
                        &nbsp;•&nbsp;
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-last">
                        39 people
                      </span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img
                        src="https://m.media-amazon.com/images/M/MV5BNjMzNTAxNDUwNV5BMl5BanBnXkFtZTcwMjMyNjI5MQ@@._V1_QL75_UY107_CR5,0,72,107_.jpg"
                        alt="Thandiwe Newton at an event for RocknRolla (2008)"
                      />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a
                  href="https://www.imdb.com/list/ls025794545/?ref_=nm_rls_5"
                  className="nameAside__editorial_list-item-link"
                >
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    Dancers
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first">
                        {" "}
                        created 5 years ago{" "}
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">
                        &nbsp;•&nbsp;
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-last">
                        26 people
                      </span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img
                        src="https://m.media-amazon.com/images/M/MV5BMTllYmE5YTYtZGZmYy00ZTBlLWJlODEtYWQ0ZmU1YTJkMjJlXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_QL75_UX72_CR0,1,72,107_.jpg"
                        alt="Anya Taylor-Joy at an event for Emma. (2020)"
                      />
                    </div>
                  </div>
                </a>
              </li>

              <li className="nameAside__editorial_list-item">
                <a
                  href="https://www.imdb.com/list/ls027409920/?ref_=nm_rls_6"
                  className="nameAside__editorial_list-item-link"
                >
                  <div className="nameAside__editorial_list-item-content">
                    <div className="nameAside__editorial_list-item-content-title">
                    Female
                    </div>
                    <div className="nameAside__editorial_list-item-content-update">
                      <span className="nameAside__editorial_list-item-content-update-first">
                        {" "}
                        created 5 years ago{" "}
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-dot">
                        &nbsp;•&nbsp;
                      </span>
                      <span className="nameAside__editorial_list-item-content-update-last">
                        22 people
                      </span>
                    </div>
                  </div>
                  <div className="nameAside__editorial_list-item-poster_wrapper">
                    <div className="nameAside__editorial_list-item-poster">
                      <img
                        src="https://m.media-amazon.com/images/M/MV5BMTRhNzQ3NGMtZmQ1Mi00ZTViLTk3OTgtOTk0YzE2YTgwMmFjXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_QL75_UY107_CR7,0,72,107_.jpg"
                        alt="Anne Hathaway"
                      />
                    </div>
                  </div>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </>
    );

  }

  const NewAndUpcomingSuperhero = () => {
    return (
      <>
        <div className="nameAside__black">
          <div className="nameAside__black_wrapper">
            <div className="nameAside__black_imageSet">
              <a
                href="https://www.imdb.com/list/ls505300263/mediaviewer/rm2826634753?ref_=nm_eds_right-7_sw_supes_r_i"
                className="nameAside__black_imageSet-link"
              >
                <div className="nameAside__black_imageSet-wrapper">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BZTk1YTg4ZTMtYWE3Ny00MGIyLTlkYzEtZjUxMzAwNGRhNTJmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_QL75_UX380_CR0,36,380,214_.jpg"
                    alt="View list"
                  />

                  <div className="nameAside__black_imageSet-content">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      className="nameAside__black_imageSet-svg"
                      id="iconContext-list"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <g fill="none">
                        <path d="M0 0h24v24H0V0z"></path>
                        <path opacity=".87" d="M0 0h24v24H0V0z"></path>
                      </g>
                      <path d="M4 13c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1zm-3 5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0 4c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm0-8c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1zM7 8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1z"></path>
                    </svg>
                    <span className="nameAside__black_imageSet-text">List</span>
                  </div>
                  <div className="nameAside__black_imageSet-gradient"></div>
                </div>
              </a>
            </div>
          </div>

          <div className="nameAside__black_linksContainer">
            <a
              className="nameAside__black_linksContainer-title"
              href="https://www.imdb.com/list/ls505300263/mediaviewer/rm2826634753?ref_=nm_eds_right-7_sw_supes_r_t"
            >
              <div className="nameAside__black_linksContainer-title-text">
                New and Upcoming Superhero Movies and Series
              </div>
            </a>
            <div className="nameAside__black_linksContainer-gallery">
              <a
                className="nameAside__black_linksContainer-gallery-link"
                href="https://www.imdb.com/list/ls505300263/mediaviewer/rm2826634753?ref_=nm_eds_right-7_sw_supes_r_cta"
              >
                See the list
              </a>
            </div>
          </div>
        </div>
      </>
    );
  };


  return (
    <>
      <MoreToExplore />
      <BlackHolywoodStars />
      <EditorialList/>
      <FamousMotherAndChildren/>
      <UserLists/>
      <NewAndUpcomingSuperhero/>
    </>
  );
};
