(function () {
  'use strict';
  if (window.houzukiAds) return;
  var key = 'houzuki-ms-consent-v1', choice = null;
  try { choice = localStorage.getItem(key); } catch (_) {}
  window.uetq = window.uetq || [];
  window.uetq.push('consent', 'default', { ad_storage: 'denied' });
  if (choice === 'granted') window.uetq.push('consent', 'update', { ad_storage: 'granted' });
  var tag = document.createElement('script');
  tag.src = 'https://bat.bing.net/bat.js?ti=187281049';
  tag.async = true;
  tag.onload = function () {
    if (typeof window.UET !== 'function') return;
    var queue = window.uetq;
    window.uetq = new window.UET({ ti: '187281049', q: queue, enableAutoSpaTracking: false, enableAutoConsent: false });
    window.uetq.push('pageLoad');
  };
  document.head.appendChild(tag);
  function track(action) {
    try { window.uetq.push('event', action, { event_category: 'contact', event_label: location.pathname }); } catch (_) {}
  }
  window.houzukiAds = { track: track };
  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.createElement('section');
    banner.className = 'ads-consent';
    banner.setAttribute('aria-label', '広告Cookieの設定');
    banner.hidden = choice === 'granted' || choice === 'denied';
    banner.innerHTML = '<p>Microsoft広告の効果測定にCookieを使用します。許可・拒否はいつでも変更できます。拒否してもお問い合わせはご利用いただけます。<a href="privacy.html">詳しく見る</a></p><div><button type="button" data-consent="granted">許可する</button><button type="button" data-consent="denied">拒否する</button></div>';
    document.body.appendChild(banner);
    var settings = document.createElement('button');
    settings.type = 'button'; settings.className = 'ads-consent-settings'; settings.textContent = '広告Cookie設定';
    var footer = document.querySelector('footer');
    (footer || document.body).appendChild(settings);
    settings.addEventListener('click', function () { banner.hidden = false; banner.querySelector('button').focus(); });
    banner.addEventListener('click', function (event) {
      var button = event.target.closest('[data-consent]');
      if (!button) return;
      choice = button.getAttribute('data-consent');
      try { localStorage.setItem(key, choice); } catch (_) {}
      try { window.uetq.push('consent', 'update', { ad_storage: choice }); } catch (_) {}
      banner.hidden = true;
      settings.focus();
    });
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[data-ms-line]');
      if (link) track('line_click');
    });
  });
}());