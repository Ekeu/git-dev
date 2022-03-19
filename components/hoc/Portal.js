import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? ReactDOM.createPortal(children, document.getElementById('modal-root'))
    : null;
};

export default Portal;
