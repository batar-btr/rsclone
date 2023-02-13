import './signInPage.scss';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import logo from '../registration/imdb_logo.png'
import { Devider } from '../registration/registration';

export const SingInPage = () => {

  const [eMail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signIn } = UserAuth();

  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn(eMail, password);
      navigate('/')
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
      }
    }
  }

  return (
    <div className='signin-page'>
      <img src={logo} alt="" />
      <form onSubmit={onSubmitHandler}>
        <h2>Sign In</h2>
        <div>
          <label htmlFor="signin-email">Email</label>
          <input type="email" id='signin-email' value={eMail} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="signin-password">Password</label>
          <input type="password" id='signin-password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
          <input type="submit" value='Sign in' />
          <Devider name='New to IMDb?' color='#767676'/>
          <Link className='create-account-btn' to='/registration/signup'>Create your IMDb account</Link>
      </form>
      <h4>Create IMDB Account <Link to='/registration/signup'>SignUp</Link></h4>
    </div>
  )
}
