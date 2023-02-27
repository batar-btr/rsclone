import './account-page.scss'
import { UserAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { reauthenticateWithCredential, deleteUser, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {

  const { user, userData } = UserAuth()

  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const favoriteMovie = userData?.favorite.movie.length;
  const favoriteTv = userData?.favorite.tv.length;

  const rateMovie = userData && Object.keys(userData.rate.movie).length;
  const rateTv = userData && Object.keys(userData.rate.tv).length;

  const deleteHandler = async () => {
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user).catch(err => setError(true));
    }
    if(!user) {
      navigate('/');
    }
  }
  
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(user) {
      const credential = EmailAuthProvider.credential(user.email as string, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      navigate('/');
    }
  }

  return (
    <div className='account-page-wrap'>
      {user && <>
        <h1>User Info</h1>
        <p>Email: <span>{user?.email}</span></p>
        <p>{`Created at: ${user?.metadata.creationTime}`}</p>
        <p>{`Favorite movies: ${favoriteMovie}`}</p>
        <p>{`Favorite tv: ${favoriteTv}`}</p>
        <p>{`Rate movies: ${rateMovie}`}</p>
        <p>{`Rate tv: ${rateTv}`}</p>
        <button onClick={() => deleteHandler()}>Delete account</button>
        {error &&
          <form onSubmit={submitHandler}>
            <label htmlFor="repass">
              Enter Password<br />
              <input type="password" id='repass' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value='enter' />
          </form>}
      </>}
    </div>
  );
}

export { AccountPage }