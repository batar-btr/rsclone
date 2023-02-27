import { User } from 'firebase/auth';
import { ReactComponent as UserIcon } from './user-icon.svg';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { useState } from 'react';
import './login-button.scss'
import { UserAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface LoginButtonProps {
  user: User | null
}

const LoginButton = ({ user }: LoginButtonProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const { logOut } = UserAuth();

  const clickHandler = () => {
    if(user) {
      setIsOpen((prevState) => !prevState);
    }
  }

  const closeSubMenu = () => {
    setIsOpen(false)
  }

  const withUser = (user: User) => <>
    <UserIcon />
    {user.email?.split('@')[0]}
    <ArrowIcon className={`login-btn-icon ${isOpen ? 'active' : ''}`} />
    <ul className={`sub-menu ${isOpen ? 'open' : ''}`} onMouseLeave={closeSubMenu}>
      <li><Link to='watchlist'>Your Watchlist</Link></li>
      <li><Link to='ratings'>Your Ratings</Link></li>
      <li><Link to='account'>Account settings</Link></li>
      <li onClick={() => logOut()}>Sign Out</li>
    </ul>
  </>;


  return (
    <div className={`login-btn ${isOpen ? 'active' : ''}`} onClick={clickHandler}>
      {user ? withUser(user) : 'Sign In'}
    </div>
  );
}

export { LoginButton }