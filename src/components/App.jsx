import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [query, setQuery] = useState('');

  const onSubmit = input => {
    setQuery(input);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery propQuery={query} />
    </>
  );
};
