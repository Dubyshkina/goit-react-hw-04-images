import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = e => {

    if (e.currentTarget === e.target) this.props.onClose();
    
  };
  
  render() {
    
    const { image, alt } = this.props.image;
    console.log(image)
    return (
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={image} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes={
  image: PropTypes.objectOf(PropTypes.string.isRequired),
  onClose: PropTypes.func.isRequired,
}
export default Modal;
