const images = Array.from(document.querySelectorAll('.lightbox-image'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxMeta = document.getElementById('lightbox-meta');
const lightboxPrice = document.getElementById('lightbox-price');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const image = images[currentIndex];

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightboxTitle.textContent = image.dataset.title || image.alt;
  lightboxMeta.textContent = image.dataset.meta || '';
  lightboxPrice.textContent = image.dataset.price || '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
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

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', showNext);
document.querySelector('.lightbox-prev').addEventListener('click', showPrevious);

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('active')) return;

  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowRight') showNext();
  if (event.key === 'ArrowLeft') showPrevious();
});
