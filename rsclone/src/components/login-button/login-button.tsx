import { User } from 'firebase/auth';
import { ReactComponent as UserIcon } from './user-icon.svg';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { useState } from 'react';
import './login-button.scss'
import { UserAuth } from '../../context/AuthContext';

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
    <ArrowIcon className={isOpen ? 'open' : ''} />
    {isOpen && <ul className='sub-menu' onMouseLeave={closeSubMenu}>
      <li>Your Watchlist</li>
      <li>Your Ratings</li>
      <li>Account settings</li>
      <li onClick={() => logOut()}>Sign Out</li>
    </ul>}
  </>;


  return (
    <div className='login-btn' onClick={clickHandler}>
      {user ? withUser(user) : 'Sign In'}
    </div>
  );
}

export { LoginButton }