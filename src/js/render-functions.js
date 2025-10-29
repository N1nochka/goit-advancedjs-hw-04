/**
 * Создаёт HTML-разметку картинок
 * @param {Array} images
 * @returns {string} HTML
 */
export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="card">
        <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="stats">
          <div><span>Likes</span>${likes}</div>
          <div><span>Views</span>${views}</div>
          <div><span>Comments</span>${comments}</div>
          <div><span>Downloads</span>${downloads}</div>
        </div>
      </li>`
    )
    .join('');
}

/**
 * Очищает галерею
 */
export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

/**
 * Отображает разметку в галерее
 * @param {string} markup - HTML строка
 * @param {boolean} append - если true, добавляет к существующим картинкам
 */
export function renderGallery(markup, append = false) {
  const gallery = document.querySelector('.gallery');
  if (append) {
    gallery.insertAdjacentHTML('beforeend', markup);
  } else {
    gallery.innerHTML = markup;
  }
}
