import './Modal.scss';
import ReactDOM from 'react-dom';
import { Children } from 'react';


type ModalProps = {
  isShowing: boolean;
  hide: () => void;
  children?: React.ReactNode;
}

const closeModal = (func: () => void) => (e: React.MouseEvent) => {
  const target = e.target as HTMLElement;
  if(target.classList.contains('modal-overlay')) {
    func();
  }
}

const Modal = ({ isShowing, hide, children }: ModalProps) => isShowing ? ReactDOM.createPortal(
  <div className='modal-overlay' onClick={closeModal(hide)}>
    {children}
  </div>, document.body
) : null;

export default Modal;