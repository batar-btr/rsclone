import { Link } from 'react-router-dom';
import './registration.scss';

interface SocialLoginButtonProps {
  to: string,
  name: string,
  disabled: boolean
}

const SocialLoginButton = ({ name, to, disabled }: SocialLoginButtonProps) => {
  return (
    <button className='social-login-btn' disabled={disabled}>
      <Link to={to}>
        <span className={`social-icon ${name.toLowerCase()}`}></span>
        {`Sign in with ${name}`}
      </Link>
    </button>
  );
}

interface DeviderProps{
  name: string,
  color?: string
}

export const Devider = ({name, color}: DeviderProps) => (
  <div className="devider">
    <div style={{backgroundColor: color}}></div>
    <span style={{color}}>{name}</span>
    <div style={{backgroundColor: color}}></div>
  </div>
);

interface RegistrationProps {

}

const RegistrationPage = (props: RegistrationProps) => {
  return (
    <div className='registration-wrap'>
      <div>
        <div className='login-block'>
          <h3>Sign In</h3>
          <div className="social-buttons">
            <SocialLoginButton name='IMDB' to='signin' disabled={false} />
            <SocialLoginButton name='Amazon' to='' disabled={true}/>
            <SocialLoginButton name='Google' to='' disabled={true}/>
            <SocialLoginButton name='Apple' to='' disabled={true}/>
          </div>
          <Devider name='or'/>
          <Link className='new-aacount-btn' to='signup'>Create a New Account</Link>
        </div>
        <div className='info-block'>
          <div className='benefits'>
            <h3>Benefits of your free IMDb account</h3>
            <div>
              <h5>Personalized Recommendations</h5>
              <p>Discover shows you'll love.</p>
            </div>
            <div>
              <h5>Your Watchlist</h5>
              <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
            </div>
            <div>
              <h5>Your Ratings</h5>
              <p>Rate and remember everything you've seen.</p>
            </div>
            <div>
              <h5>Contribute to IMDb</h5>
              <p>Add data that will be seen by millions of people and get cool badges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;