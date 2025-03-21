import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorIcon from '../img/error.svg';

let lightbox;

export function displayImages(images, gallery) {
  gallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.error({
      buttons: [
        [
          '<a class="close-btn" href=""><img src="./img/close.svg" alt="" /></a>',
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: 'fadeOutUp',
              },
              toast,
              'buttonName'
            );
          },
        ],
      ],
      close: false,
      position: 'topRight',
      backgroundColor: ' #ef4040',
      messageColor: 'white',
      iconUrl: errorIcon,
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const imageCards = images
    .map(image => {
      return `
          <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="image-info">
            <p><span class="label">Likes:</span>${image.likes}</p>
            <p><span class="label">Views:</span>${image.views}</p>
            <p><span class="label">Comments:</span>${image.comments}</p>
            <p><span class="label">Downloads:</span>${image.downloads}</p>
          </div>
        </li>
    `;
    })
    .join('');

  gallery.innerHTML = imageCards;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
