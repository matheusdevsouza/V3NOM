import { useEffect, useState } from 'react';
import './Loader.css';

export const Loader = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="page-loader" className={hidden ? 'loader-hidden' : ''}>
      <div className="loader-spinner"></div>
    </div>
  );
};

