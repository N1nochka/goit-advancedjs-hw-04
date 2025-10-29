import axios from 'axios';

const API_KEY = '52933898-64c235b98ac290495c49a4d77';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Получает массив изображений по запросу и номеру страницы
 * @param {string} query - слово для поиска
 * @param {number} page - номер страницы
 * @returns {Promise<Array>} - массив объектов изображений
 */
export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return {
    images: response.data.hits,
    totalHits: response.data.totalHits,
  };
}
