import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) onClose();
  };
  
  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={image.image} alt={image.alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.objectOf(PropTypes.string.isRequired),
  onClose: PropTypes.func.isRequired,
};
