import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import fetchImagesWithQuery from '../../Services/Api';

class ImageGallery extends Component {

  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    isModalOpen: false,
    dataModal: { image: '', alt: '' },
    loadMore: false,
    
  };

  static getDerivedStateFromProps(props, state) {
    const { query } = props;
    if (query !== state.query) {
      return { page: 1, query, images: [] };
    }
    return null;
  }

  getSnapshotBeforeUpdate() {
    return document.body.clientHeight + 72;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (prevProps.query !== this.props.query && this.props.query) ||
      prevState.page !== this.state.page
    ) {
      this.getSearchedImages();
    }
    if (prevState.images !== this.state.images && this.state.page !== 1) {
      window.scrollTo({
        top: snapshot,
        behavior: 'smooth',
      });
    }
  }
  
  getSearchedImages = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await fetchImagesWithQuery(
        this.props.query,
        this.state.page
      );
      this.setState(prev => ({ images: [...prev.images, ...data.hits] }));
      if((this.state.page*12)<data.totalHits) {
        this.setState(()=>({loadMore:true}))}
        else this.setState(()=>({loadMore:false}))
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  openModal = (image, alt) => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      dataModal: { image, alt },
    }));
  };

  render() {
    
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              openModal={this.openModal}
            />
          ))}
        </ul>
        {this.state.isLoading && <Loader />}
        {this.state.loadMore && <Button onClick={this.changePage} />}
        {this.state.isModalOpen && (
          <Modal image={this.state.dataModal} onClose={this.openModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes={
  query: PropTypes.string.isRequired,
}

export default ImageGallery;
