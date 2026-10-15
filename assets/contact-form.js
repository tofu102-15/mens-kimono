(function () {
  'use strict';
  var form = document.getElementById('contact-form');
  if (!form || !window.fetch || !window.FormData) return;
  var busy = false;
  var button = form.querySelector('button[type="submit"]');
  var status = document.getElementById('contact-status');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    busy = true; button.disabled = true; button.textContent = '送信中…';
    status.textContent = '送信しています。しばらくお待ちください。';
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 30000);
    try {
      var fields = new FormData(form);
      fields.delete('_next');
      var response = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { Accept: 'application/json' }, body: fields, signal: controller.signal
      });
      var result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('Not accepted');
      clearTimeout(timer);
      status.textContent = 'お問い合わせを受け付けました。ありがとうございます。';
      button.textContent = '送信完了';
      try { if (window.houzukiAds) window.houzukiAds.track('contact_submit_success'); } catch (_) {}
      // A short delay lets the asynchronous UET request start; tracking never blocks completion.
      setTimeout(function () { window.location.assign('thanks.html'); }, 800);
    } catch (_) {
      status.textContent = '送信完了を確認できませんでした。入力内容は残っています。通信状況をご確認ください。再送すると重複する場合があります。お急ぎの場合はLINEをご利用ください。';
      busy = false; button.disabled = false; button.textContent = '送信する';
    } finally { clearTimeout(timer); }
  });
}());