import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { displayImages } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.loader-btn');

let searchText = '';
let page = 1;
const perPage = 15;

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const newSearchText = form.elements['search-text'].value.trim();

  if (!newSearchText) {
    iziToast.info({
      title: 'Info',
      position: 'topRight',
      message: 'Enter a search term!',
    });
    return;
  }

  if (newSearchText !== searchText) {
    searchText = newSearchText;
    page = 1;
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
  }

  loader.style.display = 'block';

  try {
    const images = await searchImages(searchText, page, perPage);
    displayImages(images, gallery, page > 1);
    if (images.length === perPage) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'There was an error loading the images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.style.display = 'block';

  try {
    const images = await searchImages(searchText, page, perPage);
    displayImages(images, gallery, true);
    if (images.length < perPage) {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message:
        'There was an error loading more images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});
