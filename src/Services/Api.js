import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';

const API_KEY = '34261787-55afb9b453f4d470311699488';

export default async function fetchImagesWithQuery(query, page = 1) {
  const response = await axios.get(
    `/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  
  return response.data;
}