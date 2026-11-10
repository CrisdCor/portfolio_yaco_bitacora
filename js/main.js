(function () {
  'use strict';

  var data = window.PORTFOLIO;
  var root = document.documentElement;
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ================= Tema ================= */
  var toggle = document.querySelector('.theme-toggle');
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  toggle.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ================= Libro ================= */
  var book = document.getElementById('book');
  var projects = data.projects;
  var n = projects.length;

  function bodyHTML(p) {
    var html = (p.body || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('');
    if (p.quote) {
      html +=
        '<blockquote class="quote">' +
          p.quote.text.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          '<cite>— ' + esc(p.quote.cite) + '</cite>' +
        '</blockquote>';
    }
    if (p.client) html += '<p class="client">' + esc(p.client) + '</p>';
    return html;
  }

  function notesHTML(p, i) {
    return (
      '<div class="notes">' +
        '<div class="notes__head">' +
          '<div class="notes__num">' + pad(i + 1) + '<span>.</span></div>' +
          '<div>' +
            '<h3 class="notes__title">' + esc(p.title) + '</h3>' +
            '<p class="notes__hand">entrada de bitácora nº ' + pad(i + 1) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="notes__body scrollable">' + bodyHTML(p) + '</div>' +
        '<div class="notes__foot">' +
          '<ul class="notes__tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<a class="notes__link" href="' + data.behance + '" target="_blank" rel="noopener">Ver en Behance ↗</a>' +
        '</div>' +
      '</div>'
    );
  }

  function projectHTML(p, i) {
    return (
      '<div class="leaf">' +
        '<div class="leaf__meta"><span>Bitácora</span><b>' + pad(i + 1) + ' / ' + pad(n) + '</b></div>' +
        '<figure class="frame" style="margin:0">' +
          '<div class="frame__img"><img src="' + p.image + '" data-fallback="' + (p.fallback || '') + '" alt="' + esc(p.title) + '" loading="' + (i < 2 ? 'eager' : 'lazy') + '" decoding="async"></div>' +
          '<figcaption class="frame__caption">' +
            '<h2 class="frame__title">' + esc(p.title) + '</h2>' +
            '<span class="frame__num">Nº ' + pad(i + 1) + '</span>' +
            '<p class="frame__text">' + esc(p.excerpt) +
              ' <button class="read-btn" type="button" aria-label="Leer texto completo de ' + esc(p.title) + '">Leer</button></p>' +
          '</figcaption>' +
        '</figure>' +
        '<div class="reader" role="dialog" aria-label="' + esc(p.title) + '">' +
          '<div class="reader__top"><span class="reader__num">Nº ' + pad(i + 1) + '</span>' +
            '<button class="reader__close" type="button" aria-label="Cerrar">×</button></div>' +
          '<h3 class="reader__title">' + esc(p.title) + '</h3>' +
          '<div class="reader__body scrollable">' + bodyHTML(p) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  var coverHTML =
    '<div class="cover">' +
      '<div class="cover__img" style="background-image:url(\'' + data.cover.image + '\')"></div>' +
      '<span class="cover__kicker">' + data.cover.kicker + '</span>' +
      '<h1 class="cover__title">' + data.cover.title + '</h1>' +
      '<div class="cover__foot"><span class="cover__note">' + data.cover.note + '</span><span class="cover__label">A. C. O.</span></div>' +
    '</div>';

  var endHTML =
    '<div class="endpaper">' +
      '<span class="cover__kicker" style="color:var(--ink-3)">Fin del volumen</span>' +
      '<h2>Sigue la bitácora<br><em>en Behance.</em></h2>' +
      '<p>Procesos, bocetos y proyectos completos.</p>' +
      '<a class="btn" href="' + data.behance + '" target="_blank" rel="noopener">Abrir Behance ↗</a>' +
      '<a class="btn btn--ghost" href="#contacto">Contactar</a>' +
    '</div>';

  var closingBack =
    '<div class="endpaper"><span class="cover__kicker" style="color:var(--ink-3)">Notas</span>' +
    '<p style="font-family:var(--f-hand);font-size:24px">— gracias por pasar las páginas.</p></div>';

  // Hojas: frente / reverso. El reverso de la hoja i acompaña al frente de la hoja i+1.
  var sheets = [{ front: coverHTML, back: notesHTML(projects[0], 0) }];
  projects.forEach(function (p, i) {
    sheets.push({
      front: projectHTML(p, i),
      back: i + 1 < n ? notesHTML(projects[i + 1], i + 1) : closingBack
    });
  });
  sheets.push({ front: endHTML, back: closingBack });

  var total = sheets.length;
  var maxIndex = total - 1; // la contraportada queda como última página visible
  var index = 0;            // hojas pasadas

  var pageEls = sheets.map(function (s, i) {
    var el = document.createElement('div');
    el.className = 'page';
    el.innerHTML =
      '<div class="face face--front">' + s.front + '</div>' +
      '<div class="face face--back" aria-hidden="true">' + s.back + '</div>';
    el.style.zIndex = total - i;
    book.appendChild(el);
    return el;
  });

  // Respaldo de imágenes (808px → 404px)
  book.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function onErr() {
      var fb = img.getAttribute('data-fallback');
      if (fb && img.src !== fb) img.src = fb;
      else img.removeEventListener('error', onErr);
    });
  });

  var counter = document.getElementById('counter');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');
  var hint = document.getElementById('hint');
  var TURN_MS = parseFloat(getComputedStyle(root).getPropertyValue('--turn')) || 950;
  var busy = false;

  function updateUI() {
    counter.textContent = pad(index + 1) + ' / ' + pad(total);
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === maxIndex;
    book.setAttribute('data-pos', index === 0 ? 'start' : 'mid');
    pageEls.forEach(function (el, i) {
      var isTurned = i < index;
      el.querySelector('.face--front').setAttribute('aria-hidden', String(i !== index));
      el.querySelectorAll('a,button').forEach(function (a) {
        var visibleFront = i === index && a.closest('.face--front');
        var visibleBack = i === index - 1 && a.closest('.face--back');
        a.tabIndex = visibleFront || visibleBack ? 0 : -1;
      });
      if (!el.classList.contains('is-turning')) el.style.zIndex = isTurned ? i + 1 : total - i;
    });
  }

  function turn(dir) {
    if (busy) return;
    var target = index + dir;
    if (target < 0 || target > maxIndex) return;
    busy = true;
    closeReaders();
    var el = dir > 0 ? pageEls[index] : pageEls[index - 1];
    el.classList.add('is-turning');
    el.style.zIndex = total + 2;
    el.classList.toggle('turned', dir > 0);
    index = target;
    updateUI();
    if (hint) hint.classList.add('is-hidden');
    setTimeout(function () {
      el.classList.remove('is-turning');
      updateUI();
      busy = false;
    }, TURN_MS);
  }

  prevBtn.addEventListener('click', function () { turn(-1); });
  nextBtn.addEventListener('click', function () { turn(1); });

  function closeReaders() {
    book.querySelectorAll('.reader.is-open').forEach(function (r) { r.classList.remove('is-open'); });
  }

  book.addEventListener('click', function (e) {
    var readBtn = e.target.closest('.read-btn');
    if (readBtn) {
      var reader = readBtn.closest('.leaf').querySelector('.reader');
      reader.classList.add('is-open');
      reader.querySelector('.reader__close').focus();
      return;
    }
    if (e.target.closest('.reader__close')) { closeReaders(); return; }
    if (e.target.closest('a, button, .reader, .notes__body')) return;
    var page = e.target.closest('.page');
    if (!page) return;
    turn(page.classList.contains('turned') ? -1 : 1);
  });

  // Rueda / trackpad: un gesto = una página
  var acc = 0, lastWheel = 0, lockUntil = 0;
  function canScroll(el, dy) {
    if (!el || el.scrollHeight <= el.clientHeight + 1) return false;
    return dy > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0;
  }

  document.getElementById('view-proyectos').addEventListener('wheel', function (e) {
    // Texto largo: deja desplazar el texto antes de pasar la página
    var sc = e.target.closest('.scrollable');
    if (sc && Math.abs(e.deltaY) >= Math.abs(e.deltaX) && canScroll(sc, e.deltaY)) {
      lastWheel = performance.now();
      return;
    }
    e.preventDefault();
    var now = performance.now();
    var gap = now - lastWheel;
    lastWheel = now;
    if (now < lockUntil) { if (gap < 220) lockUntil = now + 220; return; } // ignora la inercia
    if (gap > 250) acc = 0;
    acc += Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(acc) > 45) {
      turn(acc > 0 ? 1 : -1);
      acc = 0;
      lockUntil = now + TURN_MS * 0.8;
    }
  }, { passive: false });

  // Táctil
  var tx = null, ty = null;
  book.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  book.addEventListener('touchend', function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    var dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1);
    tx = ty = null;
  });

  document.addEventListener('keydown', function (e) {
    if (activeView !== 'proyectos') return;
    if (e.key === 'Escape') { closeReaders(); return; }
    if (e.key === 'ArrowRight' || e.key === 'PageDown') turn(1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') turn(-1);
  });

  updateUI();

  /* ================= Contacto ================= */
  document.getElementById('contact-list').innerHTML = data.contact.map(function (c) {
    var ext = /^https?:/.test(c.href) ? ' target="_blank" rel="noopener"' : '';
    return '<li><a href="' + c.href + '"' + ext + '><span class="k">' + esc(c.label) + '</span><span class="v">' + esc(c.value) + '</span><span class="arrow">↗</span></a></li>';
  }).join('');

  /* ================= Vistas ================= */
  var views = document.querySelectorAll('.view');
  var links = document.querySelectorAll('.sidebar__link[data-view]');
  var activeView = null;

  function show(name) {
    if (!document.getElementById('view-' + name)) name = 'proyectos';
    if (name === activeView) return;
    activeView = name;
    views.forEach(function (v) {
      var on = v.dataset.view === name;
      v.hidden = !on;
      v.classList.toggle('is-active', on);
      v.classList.remove('is-entering');
      if (on) { void v.offsetWidth; v.classList.add('is-entering'); }
    });
    links.forEach(function (l) {
      var on = l.dataset.view === name;
      l.classList.toggle('is-active', on);
      if (on) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
    });
  }

  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });
  show(location.hash.slice(1) || 'proyectos');
})();
