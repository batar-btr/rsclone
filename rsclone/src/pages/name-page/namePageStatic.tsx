import "./namePageStatic.scss";

export const Awards = (props: { IMDBid: string; }) => {

    const {IMDBid} = props;

    const baseLink = `https://www.imdb.com/name/${IMDBid}/awards/?ref_=nm_awd`;
    const listitemLink = `https://www.imdb.com/name/${IMDBid}/awards/?ref_=nm_awd`;

  return (
    <>
      <section className="awards__wrapper">
        <div className="awards">
        <div className="awards__base"> </div>       
          <ul className="awards__base_list">
            <li className="awards__base_list-item">
              <a
                className="awards__base_list-item-link"
                href={baseLink}
              >
                Awards
              </a>
              <a
                className="awards__base_list-item-linkIMDB"
                href={listitemLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="awards__base_list-item-svgright"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path>
                </svg>
              </a>
            </li>
          </ul>
        
        </div>
      </section>
    </>
  );
};

export const HollywoodIcons = () => {
    return (
      <>
        <div className="hollywoodIcons__wrapper">
            <div className="hollywoodIcons">
            <div className="hollywoodIcons__about">
                <h2 className="hollywoodIcons__about_title">
                Hollywood Icons, Then and Now
                </h2>
                <div className="hollywoodIcons__about_description">
                Take a look back at these Hollywood icons in their early days to
                see how far they've come in their careers.
                </div>
                <a href="https://www.imdb.com/gallery/rg1738382080/mediaviewer/rm567452672?ref_=nm_eds_center-3_sw_gal_icons_c_cta">
                    <div className="hollywoodIcons__about_link">See the gallery</div>
                </a>
            </div>

            <div className="hollywoodIcons__imageSet">
                <a href="https://www.imdb.com/gallery/rg1738382080/mediaviewer/rm567452672?ref_=nm_eds_center-3_sw_gal_icons_c_i" className="hollywoodIcons__imageSet_image-galleryLink">
                    <div className="hollywoodIcons__imageSet_image">
                        <img src="https://m.media-amazon.com/images/M/MV5BZTUyZTRiMWQtMmViMy00M2M0LTk5MjEtNTBkM2QwMzNkNWQ0XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL75_UX500_CR0,0,500,281_.jpg" alt="" />
                        <div className="hollywoodIcons__imageSet_gradient"></div>
                        <div className="hollywoodIcons__imageSet_content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            className="hollywoodIcons__imageSet_svg"
                            id="iconContext-collections"
                            viewBox="0 0 24 24"
                            fill="white"
                            role="presentation"
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22a.5.5 0 0 1 .78 0l2.96 3.7c.26.33.03.81-.39.81H9a.5.5 0 0 1-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
                        </svg>
                        <span className="hollywoodIcons__imageSet_text">Photos</span>
                        </div>                    
                    </div>
                </a>

                

            </div>
            </div>
        </div>
      </>
    );

}

export const Photos = (id: { ids: string; }) => {

    return (
      <>
        <div
          className="namePageStatic__photos"
          
        >
          <div className="namePageStatic__photos_wrapper">
            <a
              href={`https://www.imdb.com/name/${id.ids}/mediaindex/?ref_=nm_mi_sm`}
              className="namePageStatic__photos_link"
            >
              <h3 className="namePageStatic__photos_text">
                Photos
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="namePageStatic__photos_svg"
                  id="iconContext-chevron-right-inline"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="presentation"
                >
                  <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
                </svg>
              </h3>
            </a>
            <div className="namePageStatic__photos_actions"></div>
          </div>
        </div>
      </>
    );

}




export const Videos = (id: { ids: string; }) => {

  return (
    <>
      <div
        className="namePageStatic__photos videosWrapper"
        
      >
        <div className="namePageStatic__photos_wrapper">
          <a                   
            href={`https://www.imdb.com/name/${id.ids}/videogallery/?ref_=nm_vi_sm`}
            className="namePageStatic__photos_link"
          >
            <h3 className="namePageStatic__photos_text">
              Videos
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="namePageStatic__photos_svg"
                id="iconContext-chevron-right-inline"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
              </svg>
            </h3>
          </a>
          <div className="namePageStatic__photos_actions"></div>
        </div>
      </div>
    </>
  );

}

