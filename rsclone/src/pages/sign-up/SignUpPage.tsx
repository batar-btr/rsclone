import './signUpPage.scss';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';
import logo from '../registration/imdb_logo.png'
import UserData from '../../User/UserData';
import { FirebaseError } from 'firebase/app';
import { ErrorBox } from '../sign-in/SignInPage';

export const SingUpPage = () => {

  const [eMail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [passError, setPassError] = useState<boolean>(false);

  const { signUp } = UserAuth();

  const navigate = useNavigate();

  const userToDB = async (uid: string) => {
    const data = new UserData({ movie: [], tv: [] }, { movie: {}, tv: {} });
    console.log(data);
    await setDoc(doc(db, 'users', uid), { ...data })
  }

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if(password !== rePassword) {
      setPassError(true);
      return;
    }
    try {
      let res = await signUp(eMail, password);
      userToDB(res.user.uid);
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error.code);
        setError(error.code);
      }
    }
  }


  const passwordInputHandler = (func: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassError(false);
    func(e.target.value);
  }

  return (
    <div className='signup-page'>
      <img src={logo} alt="" />
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" value={eMail} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input className={`${passError ? 'pass-error' : ''}`} minLength={6} placeholder='at least 6 characters' type="password" value={password} onChange={passwordInputHandler(setPassword)} />
        </div>
        <div>
          <label htmlFor="">Re-enter password</label>
          <input className={`${passError ? 'pass-error' : ''}`} minLength={6} placeholder='at least 6 characters' type="password" value={rePassword} onChange={passwordInputHandler(setRePassword)} />
        </div>
        <input type="submit" value="Create your IMDb account" />
        {passError && <ErrorBox message='Password must match'/>}
        {error && <ErrorBox message={error}/>}
      </form>
      <h4>Have an Acc?! <Link to='/registration/signin'>SignIn</Link></h4>

    </div>
  )
}
