document.addEventListener('click', function (event) {
  const link = event.target.closest('a');
  if (!link) return;

  const text = link.textContent.trim().replace(/\s+/g, ' ');
  const href = link.getAttribute('href') || '';
  const card = link.closest('.art-card');

  const itemTitle = card?.querySelector('h3')?.textContent?.trim() || text || 'Unknown item';
  const itemMeta = card?.querySelector('.meta')?.textContent?.trim() || '';
  const itemPrice = card?.querySelector('.price')?.textContent?.trim() || '';

  if (typeof gtag !== 'function') return;

  if (href.startsWith('mailto:')) {
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

    gtag('event', eventName, {
      item_title: itemTitle,
      item_type: itemType,
      item_meta: itemMeta,
      item_price: itemPrice,
      link_text: text,
      email_link: href,
      page_path: window.location.pathname
    });
  }

  if (text.toLowerCase().includes('view artwork details')) {
    gtag('event', 'view_artwork_details_click', {
      item_title: itemTitle,
      item_meta: itemMeta,
      item_price: itemPrice,
      link_text: text,
      link_url: href,
      page_path: window.location.pathname
    });
  }

  if (text.toLowerCase().includes('view card details')) {
    gtag('event', 'view_card_details_click', {
      item_title: itemTitle,
      item_meta: itemMeta,
      item_price: itemPrice,
      link_text: text,
      link_url: href,
      page_path: window.location.pathname
    });
  }

  if (href.includes('facebook.com')) {
    gtag('event', 'social_click', {
      platform: 'Facebook',
      link_url: href,
      page_path: window.location.pathname
    });
  }

  if (href.includes('instagram.com')) {
    gtag('event', 'social_click', {
      platform: 'Instagram',
      link_url: href,
      page_path: window.location.pathname
    });
  }

  if (text.toLowerCase().includes('back to gallery')) {
    gtag('event', 'back_to_gallery_click', {
      page_path: window.location.pathname
    });
  }

  if (
    href.includes('watercolours.html') ||
    href.includes('greeting-cards.html') ||
    href.includes('urban-sketching.html') ||
    href.includes('oil-acrylic.html') ||
    href.includes('portraits.html')
  ) {
    gtag('event', 'gallery_category_opened', {
      category: text,
      link_url: href,
      page_path: window.location.pathname
    });
  }
});
