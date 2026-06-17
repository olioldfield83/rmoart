const images = Array.from(document.querySelectorAll('.lightbox-image'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxPrice = document.getElementById('lightbox-price');

let currentIndex = 0;

function getCardDetails(image) {
  const card = image.closest('.art-card');
  return {
    title: card?.querySelector('h3')?.textContent || image.alt || '',
    meta: card?.querySelector('.meta')?.textContent || '',
    price: card?.querySelector('.price')?.textContent || ''
  };
}

function openLightbox(index) {
  currentIndex = index;
  const image = images[currentIndex];
  const details = getCardDetails(image);

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxTitle.textContent = details.title;
  lightboxMeta.textContent = details.meta;
  lightboxPrice.textContent = details.price;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (typeof gtag === 'function') {
    gtag('event', 'artwork_lightbox_open', {
      item_title: details.title,
      item_meta: details.meta,
      item_price: details.price,
      image_src: image.getAttribute('src'),
      page_path: window.location.pathname
    });
  }
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  openLightbox(currentIndex);
}

function showPrevious() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openLightbox(currentIndex);
}

images.forEach((image, index) => {
  image.addEventListener('click', () => openLightbox(index));
});

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next')?.addEventListener('click', showNext);
document.querySelector('.lightbox-prev')?.addEventListener('click', showPrevious);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('active')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showNext();
  if (event.key === 'ArrowLeft') showPrevious();
});
