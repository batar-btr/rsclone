import '../header/headerMenuItem.scss';

interface ItemProps{
  children: React.ReactNode
  title: string
  icon: React.ReactElement
}

export const HeaderMenuItem = ({title, icon, children }: ItemProps) => {
  return (
    <div className='header-menu-item'>
      <span className='header-menu-item-top'>
      <span className="header-menu-item-image">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="header-menu-item-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">{ icon }</svg>
      </span>
      <span className="header-menu-item-title">{ title }</span>
      <span className="header-menu-item-expand">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="header-menu-item-expand-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path></svg></span>
      </span>
      <div className='header-menu-item-links'>
        { children }
      </div>
    </div>
  )
}
