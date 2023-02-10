import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
    if(!isShowing) {
      document.body.classList.add('hide-scroll');
    } else {
      document.body.classList.remove('hide-scroll');
    }
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;