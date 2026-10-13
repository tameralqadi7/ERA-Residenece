// Script #6 Attrs: 
document.addEventListener('DOMContentLoaded', function () {
    function loadtwc(e) {
      let t = document.createElement('script');
      (t.setAttribute('src', e), t.setAttribute('type', 'module'), document.body.appendChild(t));
    }
    let src = window.location.host.includes('webflow.io') ? 'https://slater.app/20164.js' : 'https://assets.slater.app/slater/20164.js?v=1.0';
    loadtwc(src);
  });