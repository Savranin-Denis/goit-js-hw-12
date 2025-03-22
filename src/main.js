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
let totalHits = 0;

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const { height } = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}

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
    totalHits = 0;
  }

  loader.style.display = 'block';

  try {
    const data = await searchImages(searchText, page, perPage);
    const images = data.hits;
    totalHits = data.totalHits;
    displayImages(images, gallery, page > 1);
    if (images.length === perPage && page * perPage < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
    smoothScroll();
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
    const data = await searchImages(searchText, page, perPage);
    const images = data.hits;
    totalHits = data.totalHits;

    displayImages(images, gallery, true);
    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    smoothScroll();
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
