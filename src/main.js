// ================================
// Импорты
// ================================
import { fetchImages } from './js/pixabay-api.js'; // HTTP-запросы к Pixabay через Axios
import {
  createGalleryMarkup,
  clearGallery,
  renderGallery,
} from './js/render-functions.js'; // функции для отображения картинок
import { errorToast, infoToast } from './js/izi-toast.js'; // уведомления
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ================================
// Переменные DOM
// ================================
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

// ================================
// Настройка Lightbox
// ================================
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// ================================
// Переменные состояния
// ================================
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedImages = 0;

// ================================
// События
// ================================
form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

// ================================
// Функция поиска картинок
// ================================
async function onSearch(event) {
  event.preventDefault();

  currentQuery = event.target.elements.search.value.trim();
  if (!currentQuery) {
    infoToast('Please, enter a search query!');
    return;
  }

  // сброс галереи и состояния
  clearGallery();
  currentPage = 1;
  loadedImages = 0;
  loader.classList.add('active');
  loadMoreBtn.style.display = 'none';

  try {
    // получаем картинки с API
    const { images, totalHits: total } = await fetchImages(
      currentQuery,
      currentPage
    );

    if (images.length === 0) {
      infoToast('Sorry, there are no images matching your search query.');
      return;
    }

    totalHits = total;
    loadedImages = images.length;

    renderGallery(createGalleryMarkup(images));
    lightbox.refresh();

    if (loadedImages < totalHits) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    errorToast('An error occurred while fetching images.');
  } finally {
    loader.classList.remove('active');
  }
}

// ================================
// Функция подгрузки следующей страницы
// ================================
async function onLoadMore() {
  currentPage += 1;
  loader.classList.add('active');
  loadMoreBtn.style.display = 'none';

  try {
    const { images } = await fetchImages(currentQuery, currentPage);

    if (images.length === 0) {
      infoToast('No more images.');
      return;
    }

    loadedImages += images.length;

    renderGallery(createGalleryMarkup(images), true);
    lightbox.refresh();

    // Плавная прокрутка страницы
    smoothScroll();

    // Проверяем, достигли ли конца коллекции
    if (loadedImages >= totalHits) {
      infoToast("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    errorToast('An error occurred while fetching images.');
  } finally {
    loader.classList.remove('active');
  }
}

// ================================
// Плавная прокрутка страницы
// ================================
function smoothScroll() {
  const galleryItems = document.querySelectorAll('.gallery .card');
  if (galleryItems.length > 0) {
    const cardHeight = galleryItems[0].getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
