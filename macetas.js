(function() {
  'use strict';

  var FIXED_HEX = '#2D6A4F';

  function hexToRgb(hex) {
    var m = hex.replace(/^#/, '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
  }

  function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(function(x) {
      var h = Math.round(Math.max(0, Math.min(255, x))).toString(16);
      return h.length === 1 ? '0' + h : h;
    }).join('');
  }

  function deriveThemeFromColor(hex) {
    var r = hexToRgb(hex);
    var base = 8;
    var start = rgbToHex(
      Math.min(255, r[0] * 0.08 + base),
      Math.min(255, r[1] * 0.08 + base),
      Math.min(255, r[2] * 0.08 + base + 4)
    );
    var mid = rgbToHex(
      Math.min(255, r[0] * 0.2 + base + 4),
      Math.min(255, r[1] * 0.2 + base + 4),
      Math.min(255, r[2] * 0.2 + base + 10)
    );
    var blobRgba = 'rgba(' + r[0] + ',' + r[1] + ',' + r[2] + ',0.12)';
    var blobMainRgba = 'rgba(' + r[0] + ',' + r[1] + ',' + r[2] + ',0.35)';
    return { bgStart: start, bgMid: mid, bgEnd: start, blob: blobRgba, blobMain: blobMainRgba };
  }

  var root = document.documentElement;
  var rgb = hexToRgb(FIXED_HEX);
  root.style.setProperty('--theme-bg-start', '#1e3d32');
  root.style.setProperty('--theme-bg-mid', '#2d4a3f');
  root.style.setProperty('--theme-bg-end', '#1e3d32');
  root.style.setProperty('--theme-blob', 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.15)');
  root.style.setProperty('--theme-blob-main', 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.25)');

  root.style.setProperty('--macetas-brand', FIXED_HEX);
  root.style.setProperty('--macetas-brand-hover', rgbToHex(
    Math.min(255, rgb[0] * 1.15 + 15),
    Math.min(255, rgb[1] * 1.15 + 15),
    Math.min(255, rgb[2] * 1.15 + 15)
  ));
})();

(function() {
  'use strict';

  var PLACEHOLDER_SVG = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">' +
    '<rect fill="%23475569" width="400" height="400"/>' +
    '<path fill="%2364748b" d="M120 200h160v120H120z"/>' +
    '<ellipse fill="%2364748b" cx="200" cy="200" rx="80" ry="20"/>' +
    '<text x="200" y="265" font-family="system-ui,sans-serif" font-size="14" fill="%23cbd5e1" text-anchor="middle">Maceta</text>' +
    '</svg>'
  );
  var AVATAR_PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
    '<circle fill="%23475569" cx="60" cy="60" r="60"/>' +
    '<circle fill="%2364748b" cx="60" cy="45" r="22"/>' +
    '<path fill="%2364748b" d="M30 105c0-16.5 13.5-30 30-30s30 13.5 30 30z"/>' +
    '</svg>'
  );

  function useFallback(img, isAvatar) {
    if (img.dataset.fallbackUsed) return;
    img.dataset.fallbackUsed = '1';
    img.src = isAvatar ? AVATAR_PLACEHOLDER : PLACEHOLDER_SVG;
    img.alt = img.alt || 'Imagen no disponible';
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card-image-wrap img').forEach(function(img) {
      img.addEventListener('error', function() { useFallback(img, false); });
    });
    var heroImg = document.querySelector('.hero-avatar') || document.querySelector('.hero-logo');
    if (heroImg) heroImg.addEventListener('error', function() { useFallback(heroImg, true); });
  });
})();
