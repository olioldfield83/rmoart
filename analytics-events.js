document.addEventListener('click', function (event) {
  const link = event.target.closest('a');
  if (!link) return;

  const text = link.textContent.trim();
  const href = link.getAttribute('href') || '';

  if (!href.startsWith('mailto:')) return;

  let eventName = 'email_click';

  if (text.includes('artwork')) {
    eventName = 'artwork_enquiry_click';
  }

  if (text.includes('card')) {
    eventName = 'card_enquiry_click';
  }

  if (text.includes('commission')) {
    eventName = 'commission_enquiry_click';
  }

  if (typeof gtag === 'function') {
    gtag('event', eventName, {
      link_text: text,
      email_link: href,
      page_location: window.location.href
    });
  }
});
