import { useState } from 'react';
import './rate-box.scss';
import { ReactComponent as Star } from './star.svg'
import { ReactComponent as StrokeStar } from '../movie-card-carousel/icons/stroke-star.svg'
import { ReactComponent as CloseIcon } from './close-icon.svg'
import { UserAuth } from '../../context/AuthContext';
import { updateRate } from '../../User/updata-rate';

interface RateBoxProps {
  id: number
  type: 'tv' | 'movie'
  title: string;
  hide: () => void;
  currentCount?: number;
  rate?: number | null;
}

const RateBox = ({ title, hide, id, type }: RateBoxProps) => {

  const {user} = UserAuth()

  const [selectStar, setSelectStar] = useState<number>(0);
  const [rate, setRate] = useState<number | null>(null);

  const clickHandler = (e: React.MouseEvent) => {
    if(user) {
      console.log(id, type,  selectStar, user.uid);
      updateRate(user.uid, type, id, selectStar);
    }
    setRate(selectStar);
  }

  const mouseEnter = (idx: number) => {
    setSelectStar(idx + 1);
  }

  const mouseLeave = () => {
    setSelectStar(rate || 0);
  }

  return (
    <div className='rate-box'>
      <div className='top-section'>
        <div className='top-star' style={{ transform: `${rate ? `scale(1.${String(rate * 3).padStart(2, '0')})` : ''}` }}>
          <div className="count">{rate ? rate : '?'}</div>
        </div>
        <button className='close-btn' onClick={hide}><CloseIcon /></button>
      </div>
      <h5>Rate This</h5>
      <h6>{title}</h6>
      <div className="stars" onMouseLeave={mouseLeave}>
        {new Array(10).fill('').map((item, idx) => {
          return <div className='star-wrap' key={idx} onMouseEnter={() => mouseEnter(idx)} onClick={clickHandler}>
            {idx < selectStar ? <Star width='24' height='24' fill='#5799ef'></Star> : <StrokeStar width='24' height='24' fill='#aaaaaa'></StrokeStar>}
          </div>;
        })}
      </div>
      <button className='rate-btn' disabled={!rate}>Rate</button>
    </div>
  );
}

export { RateBox }