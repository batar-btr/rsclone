import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
    if(!isShowing) {
      // document.body.classList.add('hide-scroll');
      document.body.classList.add('scroll-disabled');
    } else {
      // document.body.classList.remove('hide-scroll');
      document.body.classList.remove('scroll-disabled');
    }
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;