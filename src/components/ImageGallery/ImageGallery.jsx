import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import fetchImagesWithQuery from '../../Services/Api';

export const ImageGallery = ({ propQuery }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState({ image: '', alt: '' });
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (propQuery !== query) {
      setPage(1);
      setQuery(propQuery);
    }
  }, [propQuery, query]);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getSearchedImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImagesWithQuery(propQuery, page);
        setImages(prev => (page === 1 ? data.hits : [...prev, ...data.hits]));
        page * 12 < data.totalHits ? setLoadMore(true) : setLoadMore(false);
      } catch (error) {
        setError({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    };
    getSearchedImages();
  }, [query, page, propQuery]);

  const changePage = () => {
    setPage(prev => prev + 1);
  };

  const openModal = (image, alt) => {
    setIsModalOpen(!isModalOpen);
    setDataModal({ image, alt });
  };

  return (
    <>
    {error && <p>Oops...</p>}
      <ul className={s.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={openModal}
          />
        ))}
      </ul>
      {isLoading && <Loader />}
      {loadMore && <Button onClick={changePage} />}
      {isModalOpen && <Modal image={dataModal} onClose={openModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  propQuery: PropTypes.string.isRequired,
};
