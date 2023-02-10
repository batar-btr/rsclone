import './Modal.scss';
import ReactDOM from 'react-dom';


type ModalProps = {
  isShowing: boolean;
  hide: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isShowing, hide }: ModalProps) => isShowing ? ReactDOM.createPortal(
  <div className='modal-overlay' onClick={hide}>

  </div>, document.body
) : null;

export default Modal;