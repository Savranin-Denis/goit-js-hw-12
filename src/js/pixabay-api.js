import axios from 'axios';

const API_KEY = '49352946-bc37130ddbdb199550e5d4773';
const url = 'https://pixabay.com/api/';

export async function searchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(url, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });
    return { images: response.data.hits, total: response.data.totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
