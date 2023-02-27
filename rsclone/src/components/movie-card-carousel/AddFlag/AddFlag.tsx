import './AddFlag.scss'
import { ReactComponent as FlagSVG } from '../icons/AddFlag.svg';
import { RotatingLines } from 'react-loader-spinner';

interface AddFlagProps {
  loading: boolean;
  checked: boolean;
  onClick?: () => void;
}

const AddFlag = ({ loading, checked, onClick }: AddFlagProps) => {
  const className = loading ? 'add-flag-wrap' : `add-flag-wrap ${checked ? 'checked' : 'unchecked'}`
  return (
    <div className={className} onClick={onClick} >
      <FlagSVG className='add-flag'></FlagSVG>
      <div className="plus-icon">
        {loading && <RotatingLines
          strokeColor="#fff"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />}
      </div>
    </div>
  );
}

export default AddFlag;