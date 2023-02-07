import { Link } from 'react-router-dom';
import '../header/headerMenu.scss';
import { useContext} from "react"
import { MenuContext } from '../../context/MenuContext';
import { HeaderMenuItem } from './HeaderMenuItem';

export const HeaderMenu = () => {
  const {menu, close} = useContext(MenuContext)

  return (
    <aside className={`header-menu ${menu ? 'manu-open' : ''}`}>
      <div className={`header-menu-container ${menu ? 'manu-open' : ''}`}>
        <div className='header-menu-top'>
          <Link to='/' className='header-menu-logo-link'>
            <svg className="header-menu-logo-link-icon" xmlns="http://www.w3.org/2000/svg" width="98" height="56" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
          </Link>
          <div className='header-menu-close-btn' title="Close Navigation Drawer" onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="header-menu-close-btn-icon" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path></svg>
          </div>
        </div>
        <div className='header-menu-items'>
          <HeaderMenuItem 
            title='Movies' 
            icon={<>
              <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
            </>}
          >
            <Link to='/' className='header-menu-item-link'>Release Calendar</Link>
            <Link to='/' className='header-menu-item-link'>Top 250 Movies</Link>
            <Link to='/' className='header-menu-item-link'>Most Popular Movies</Link>
            <Link to='/' className='header-menu-item-link'>Browse Movies by Genre</Link>
            <Link to='/' className='header-menu-item-link'>Top Box Office</Link>
            <Link to='/' className='header-menu-item-link'>Showtimes & Tickets</Link>
            <Link to='/' className='header-menu-item-link'>Movie News</Link>
            <Link to='/' className='header-menu-item-link'>India Movie Spotlight</Link>
          </HeaderMenuItem>
          <div className='header-menu-items-wrapper'>
            <HeaderMenuItem 
              title='TV Shows' 
              icon={<>
                <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path>
              </>}
            >
              <Link to='/' className='header-menu-item-link'>What's on TV & Streaming</Link>
              <Link to='/' className='header-menu-item-link'>Top 250 TV Shows</Link>
              <Link to='/' className='header-menu-item-link'>Most Popular TV Shows</Link>
              <Link to='/' className='header-menu-item-link'>Browse TV Shows by Genre</Link>
              <Link to='/' className='header-menu-item-link'>TV News</Link>
              <Link to='/' className='header-menu-item-link'>India TV Spotlight</Link>
            </HeaderMenuItem>
            <HeaderMenuItem 
              title='Watch' 
              icon={<>
                <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
              </>}
            >
              <Link to='/' className='header-menu-item-link'>What to Watch</Link>
              <Link to='/' className='header-menu-item-link'>Latest Trailers</Link>
              <Link to='/' className='header-menu-item-link'>IMDb Originals</Link>
              <Link to='/' className='header-menu-item-link'>IMDb Picks</Link>
              <Link to='/' className='header-menu-item-link'>IMDb Podcasts</Link>
            </HeaderMenuItem>
          </div>
          <HeaderMenuItem 
            title='Awards & Events' 
            icon={<>
              <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.23 15.39L12 15.45l-3.22 1.94a.502.502 0 0 1-.75-.54l.85-3.66-2.83-2.45a.505.505 0 0 1 .29-.88l3.74-.32 1.46-3.45c.17-.41.75-.41.92 0l1.46 3.44 3.74.32a.5.5 0 0 1 .28.88l-2.83 2.45.85 3.67c.1.43-.36.77-.74.54z"></path>
            </>}
          >
            <Link to='/' className='header-menu-item-link'>Oscars</Link>
            <Link to='/' className='header-menu-item-link'>Best Picture Winners</Link>
            <Link to='/' className='header-menu-item-link'>Sundance Film Festival</Link>
            <Link to='/' className='header-menu-item-link'>Independent Spirit Awards</Link>
            <Link to='/' className='header-menu-item-link'>Black History Month</Link>
            <Link to='/' className='header-menu-item-link'>SXSW</Link>
            <Link to='/' className='header-menu-item-link'>STARmeter Awards</Link>
            <Link to='/' className='header-menu-item-link'>IAwards Central</Link>
            <Link to='/' className='header-menu-item-link'>Festival Central</Link>
            <Link to='/' className='header-menu-item-link'>All Events</Link>
          </HeaderMenuItem>
          <HeaderMenuItem 
            title='Celebs' 
            icon={<>
              <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path>
            </>}
          >
            <Link to='/' className='header-menu-item-link'>Born Today</Link>
            <Link to='/' className='header-menu-item-link'>Most Popular Celebs</Link>
            <Link to='/' className='header-menu-item-link'>Celebrity News</Link>
          </HeaderMenuItem>
          <HeaderMenuItem 
            title='Community' 
            icon={<>
              <path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
            </>}
          >
            <Link to='/' className='header-menu-item-link'>Help Center</Link>
            <Link to='/' className='header-menu-item-link'>Contributor Zone</Link>
            <Link to='/' className='header-menu-item-link'>Polls</Link>
          </HeaderMenuItem>
        </div>
      </div>
    </aside>
  )
}
