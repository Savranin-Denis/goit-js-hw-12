import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImages } from './js/pixabay-api';
import { displayImages } from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

loader.style.display = 'none';

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchText = form.elements['search-text'].value.trim();

  if (!searchText) {
    iziToast.info({
      title: 'Info',
      position: 'topRight',
      message: 'Enter a search term!',
    });
    return;
  }

  loader.style.display = 'block';

  searchImages(searchText)
    .then(images => {
      displayImages(images, gallery);
      loader.style.display = 'none';
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message:
          'There was an error loading the images. Please try again later.',
      });
      loader.style.display = 'none';
    });
});
