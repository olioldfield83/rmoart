const GA_MEASUREMENT_ID = 'G-75J8XZVFWK';
const COOKIE_CHOICE_KEY = 'rmoart_cookie_choice';

function loadGoogleAnalytics() {
  if (window.rmoartAnalyticsLoaded) return;

  window.rmoartAnalyticsLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

function createCookieBanner() {
  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <h3>Cookies</h3>
    <p>
      RMO Art uses analytics cookies to understand how visitors use the website
      and improve the experience. You can accept or decline analytics cookies.
    </p>
    <div class="cookie-actions">
      <button class="cookie-accept" type="button">Accept analytics</button>
      <button class="cookie-decline" type="button">Decline</button>
    </div>
  `;

  document.body.appendChild(banner);

  banner.querySelector('.cookie-accept').addEventListener('click', function () {
    localStorage.setItem(COOKIE_CHOICE_KEY, 'accepted');
    loadGoogleAnalytics();
    banner.remove();
  });

  banner.querySelector('.cookie-decline').addEventListener('click', function () {
    localStorage.setItem(COOKIE_CHOICE_KEY, 'declined');
    banner.remove();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const choice = localStorage.getItem(COOKIE_CHOICE_KEY);

  if (choice === 'accepted') {
    loadGoogleAnalytics();
    return;
  }

  if (choice === 'declined') {
    return;
  }

  createCookieBanner();
});
