document.addEventListener('click', function (event) {
  const link = event.target.closest('a');
  if (!link) return;

  const text = link.textContent.trim().replace(/\s+/g, ' ');
  const href = link.getAttribute('href') || '';

  if (!href.startsWith('mailto:')) return;

  const card = link.closest('.art-card');
  const itemTitle = card?.querySelector('h3')?.textContent?.trim() || 'Unknown item';
  const itemMeta = card?.querySelector('.meta')?.textContent?.trim() || '';
  const itemPrice = card?.querySelector('.price')?.textContent?.trim() || '';

  let eventName = 'email_click';
  let itemType = 'general';

  if (text.toLowerCase().includes('artwork')) {
    eventName = 'artwork_enquiry_click';
    itemType = 'artwork';
  }

  if (text.toLowerCase().includes('card')) {
    eventName = 'card_enquiry_click';
    itemType = 'greeting_card';
  }

  if (text.toLowerCase().includes('commission')) {
    eventName = 'commission_enquiry_click';
    itemType = 'commission';
  }

  if (typeof gtag === 'function') {
    gtag('event', eventName, {
      item_title: itemTitle,
      item_type: itemType,
      item_meta: itemMeta,
      item_price: itemPrice,
      link_text: text,
      email_link: href,
      page_path: window.location.pathname,
      page_location: window.location.href
    });
  }
});
