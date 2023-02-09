import './AddFlag.scss'
import { ReactComponent as FlagSVG} from './icons/AddFlag.svg';

interface AddFlagProps {
  checked: boolean;
  onClick?: () => void;
}

const AddFlag  = ({checked, onClick}: AddFlagProps) => {
  const className = `add-flag-wrap ${checked ? 'checked' : 'unchecked'}`
  return (
  <div className={className} onClick={onClick} >
    <FlagSVG className='add-flag'></FlagSVG>
    <div className="plus-icon"></div>
  </div>
  );
}

export default AddFlag;