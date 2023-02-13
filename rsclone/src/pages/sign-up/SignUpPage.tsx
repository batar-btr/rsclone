import './signUpPage.scss';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import logo from '../registration/imdb_logo.png'
import UserData from '../../User/UserData';

export const SingUpPage = () => {

  const [eMail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { signUp, logOut, user} = UserAuth();



  const userToDB = async (uid: string) => {
    const data = new UserData();
    await setDoc(doc(db, 'users', uid ), {...data})
  }

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      let res = await signUp(eMail, password);
      console.log(res.user)
      userToDB(res.user.uid);
    } catch (e) {
      const message = `${e}`
      setError(message);
    }
  }


  return (
    <div className='signin-page'>
      <img src={logo} alt="" />
      <form onSubmit={onSubmitHandler}>
        <input type="email" value={eMail} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" />
      </form>
      <h4>Have an Acc?! <Link to='/registration/signin'>SignIn</Link></h4>
      {user && `Hello User Id${user.uid}`}
      <button onClick={logOut}>Logout</button>
      {error && <h1>{error}</h1>}
    </div>
  )
}
