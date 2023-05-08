import s from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick = null }) => {
  return (
    <>
      <button className={s.Button} onClick={onClick}>
        Load more
      </button>
    </>
  );
};

Button.propTypes={
onClick: PropTypes.func.isRequired,
}

