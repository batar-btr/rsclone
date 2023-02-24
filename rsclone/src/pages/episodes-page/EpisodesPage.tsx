import { Link, useParams, useNavigate } from 'react-router-dom';
import { ITitle, ITitleImage, ITitleImages, ITitleVideos, ITvEpisode, ITvSeason } from '../../models/title';
import IMDBService from '../../services/IMDBService';
import './episodesPage.scss';
import { useEffect, useState } from 'react';
import { DotSpinner } from '../../components/dots-spinner/DotSpinner';

interface ITransformedEpisodes{
  [year: string]: ITvEpisode[]
}

export const EpisodesPage = () => {
  const id = useParams().id
  const type = IMDBService().type 
  const _imgBaseSmall = IMDBService()._imageSmall 
  const _imgBaseBig = IMDBService()._image
  const isTvShow = IMDBService().isTvShow()
  const [title, setTitle] = useState<ITitle>()
  const [titleLoading, setTitleLoading] = useState<boolean>(true)
  const [seasons, setSeasons] = useState<ITvSeason[]>()
  const [years, setYears] = useState<ITransformedEpisodes>()
  const [selectedSeason, setSelectedSeason] = useState(0)
  const [selectedYear, setSelectedYear] = useState('')
  const [yearsAndSeasonsLoading, setYearsAndSeasonsLoading] = useState(true)
  const [onChangeLoading, setOnChangeLoading] = useState(true)
  const [sort, setSort] = useState('asc')

  const navigate = useNavigate(); 

  let currentArr = selectedSeason !== 0 ? 
    seasons && seasons![selectedSeason - 1].episodes
    : years && years![selectedYear]

  useEffect(() => {
    onRequest();
    currentArr = sortArr(currentArr!)
  }, [id, sort]);

  const onRequest = async () => {
    const title = await IMDBService().getTitle(+id!)
    setTitle(title)
    if (title) {
      setTitleLoading(false)
    }

    const seasonsNum = title ? title.number_of_seasons : null
    const seasons: ITvSeason[] = []
    for (let i = 1; i <= seasonsNum!; i++) {
      const season = await IMDBService().getTvSeasons(+id!, i)
      seasons.push(season)
    }
    setSeasons(seasons)
    const checkQuerySeason = window.location.href.split('season=')[1]
    const checkQueryYear = window.location.href.split('year=')[1]

    const episodes: ITvEpisode[] = []
    for (let i = 0; i < seasonsNum!; i++) {
      seasons[i].episodes.map(el => episodes.push(el))
    }
    const episodesClone = episodes.map(el =>  Object.assign({}, el))
    const mappedEpisodes = episodesClone.map(el => {
      el.air_date = el.air_date.split('-')[0]
      return el
    })
    const years = mappedEpisodes.reduce((acc, item, i) => {
      if (!acc[item.air_date]) {
        acc[item.air_date] = [];
      }
    
      acc[item.air_date].push(episodes[i]);
      return acc;
    }, {} as ITransformedEpisodes)
    setYears(years)
    let currentSeason = (checkQuerySeason && +checkQuerySeason < +seasons.length && +checkQuerySeason > 0) 
      ? +checkQuerySeason : 
      (+checkQueryYear >= +Object.keys(years)[0] &&
      +checkQueryYear <= +Object.keys(years)[Object.keys(years).length - 1] ? 0 : +seasons.length)
    setSelectedSeason(currentSeason)

    let currentYear = checkQueryYear && +checkQueryYear >= +Object.keys(years)[0] &&
    +checkQueryYear <= +Object.keys(years)[Object.keys(years).length - 1] 
      ? checkQueryYear : ''
    setSelectedYear(currentYear)

    if (years && seasons) {
      setYearsAndSeasonsLoading(false)
      setOnChangeLoading(false)
    }
  }

  const numberWithCommas = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const sortArr = (arr: ITvEpisode[]): ITvEpisode[] => sort === 'asc' ? arr : arr.reverse()

  return(
    <div className='episodes-container'>
      <div className='episodes-wrapper'>
        <div className='episodes-main-wrapper'>
          <div className='episodes-main'>
            <div className='episodes-title-info-wrapper'>
              <Link to={`/tv/${id}`} className="episodes-title-info-poster">
                {
                  titleLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleLoading && <img src={_imgBaseSmall + title?.poster_path} alt="poster"/>
                }
              </Link>
              <div className='episodes-title-info'>
                <h3 className='episodes-title-info-name'>
                {
                  titleLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !titleLoading && 
                  <>
                    <Link to={`/tv/${id}`}>
                      {title?.name}
                    </Link>
                    <span>
                      {`(${new Date(title?.first_air_date as '').getFullYear()}–${
                        !title?.in_production ? new Date(title?.last_air_date as '').getFullYear() : '' 
                      })`}
                    </span>
                  </>
                }
                </h3>
                <h1 className="episodes-title-info-title">Episode List</h1>
              </div>
            </div>
            <div className='episodes'>
              <div className='episodes-season-and-year'>
                {
                  yearsAndSeasonsLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !yearsAndSeasonsLoading && <>
                    <div className='episodes-season-choose'>
                      {
                        seasons && <>
                        <label htmlFor="season">Season:</label>
                          <select name="season" id="season-choose" value={selectedSeason} 
                            onChange={e => {
                              setSelectedSeason(+e.target.value)
                              navigate(`/tv/${id}/episodes/?season=${e.target.value}`)
                              setSelectedYear('')
                              setOnChangeLoading(true)
                              setTimeout(() => setOnChangeLoading(false), 700)
                            }}>
                            {
                              selectedSeason === 0 && <option></option>
                            }
                            {seasons?.map((el, i) => <option value={i+1} key={i}>{i+1}</option>)}
                          </select>
                        </>
                      }
                    </div>
                    <span> OR </span>
                    <div className='episodes-year-choose'>
                      {
                        years && <>
                        <label htmlFor="season">Year:</label>
                          <select name="season" id="season-choose" value={selectedYear} 
                            onChange={e => {
                              setSelectedYear(e.target.value)
                              navigate(`/tv/${id}/episodes/?year=${e.target.value}`)
                              setSelectedSeason(0)
                              setOnChangeLoading(true)
                              setTimeout(() => setOnChangeLoading(false), 700)
                            }}>
                            {
                              selectedYear === '' && <option></option>
                            }
                            {Object.keys(years)?.map((el, i) => <option value={el} key={i}>{el}</option>)}
                          </select>
                        </>
                      }
                    </div>
                  </>
                }
              </div>
              <div className='episodes-current-item-sorting'>
                <div className='episodes-current-item'>
                  {
                    yearsAndSeasonsLoading && <DotSpinner theme='light' size='big'/>
                  }
                  {
                    !yearsAndSeasonsLoading && 
                    selectedYear === '' ? `Season ${selectedSeason}` : selectedYear
                  }
                </div>
                <div className='episodes-sort'>
                  <button className={`episodes-sort-btn ${sort === 'asc' ? 'sort-asc' : 'sort-desc'}`}
                    onClick={() => setSort(sort === 'asc' ? 'desc' : 'asc')}></button>
                </div>
              </div>
              <div className='episodes-content'>
                {
                  onChangeLoading && <DotSpinner theme='light' size='big'/>
                }
                {
                  !onChangeLoading && currentArr &&
                 sortArr(currentArr).map((el, i) => 
                    <div className={`episodes-item ${i % 2 !== 0 ? 'even' : 'odd'}`} key={i}>
                      <img src={_imgBaseBig + el.still_path} alt="episode-still" className='episodes-item-img'/>
                      <div className='episodes-item-info'>
                        <div className='episodes-item-info-name-date'>
                          <div className='episodes-item-info-name'>{el.name}</div>
                          <div className='episodes-item-info-date'>{
                            `${new Date(el.air_date).getDate()} ${new Date(el.air_date).toLocaleDateString('us', { month: 'short' })}.
                            ${new Date(el.air_date).getFullYear()}`
                          }</div>
                        </div>
                        <div className='episodes-item-info-rating'>
                          <svg className="episodes-item-info-rating-icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                          </svg>
                          <div className='episodes-item-info-rating-value'>{el.vote_average.toFixed(1)}</div>
                          <div className='episodes-item-info-rating-count'>({numberWithCommas(el.vote_count)})</div>
                        </div>
                        <div className='episodes-item-info-overview'>
                          {el.overview}
                        </div>
                      </div>
                    </div>
                  )
                 
                }
                
              </div>
            </div>
          </div>
          
        </div>
        <div className='episodes-sidebar'></div>
      </div>
    </div>
  )
}
