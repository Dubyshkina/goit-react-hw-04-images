import s from './ImageGalleryItem.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {

    const { image, openModal } = this.props;
    
    return (
      <li
        className={s.ImageGalleryItem}
        onClick={e => openModal(image.largeImageURL, image.tags)}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={s.ImageGalleryItem_image}
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes={
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func,
}

export default ImageGalleryItem;
