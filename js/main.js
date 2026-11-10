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

  // Imágenes de la galería: si aún no hay, se usa la portada del proyecto
  function imagesOf(p) {
    return p.images && p.images.length ? p.images : [{ src: p.image, fallback: p.fallback }];
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
            '<p class="frame__text">' + esc(p.excerpt) + '</p>' +
            '<button class="gallery-btn" type="button" data-project="' + i + '" aria-label="Ver imágenes de ' + esc(p.title) + '">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="m4 18 5.5-5 4 3.5 2.5-2 4 3.5"/></svg>' +
              '<span>Ver imágenes</span><em>' + pad(imagesOf(p).length) + '</em>' +
            '</button>' +
          '</figcaption>' +
        '</figure>' +
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

  // Volver a la portada: las hojas regresan en cascada
  function goHome() {
    if (index === 0 || busy) return;
    busy = true;
    var turnedEls = pageEls.slice(0, index).reverse();
    var step = Math.min(110, 600 / turnedEls.length);
    turnedEls.forEach(function (el, k) {
      setTimeout(function () {
        el.classList.add('is-turning');
        el.style.zIndex = total + 2 + k;
        el.classList.remove('turned');
      }, k * step);
    });
    index = 0;
    setTimeout(function () {
      pageEls.forEach(function (el) { el.classList.remove('is-turning'); });
      updateUI();
      busy = false;
    }, (turnedEls.length - 1) * step + TURN_MS);
    counter.textContent = pad(1) + ' / ' + pad(total);
    prevBtn.disabled = true; nextBtn.disabled = false;
    book.setAttribute('data-pos', 'start');
  }

  book.addEventListener('click', function (e) {
    var gBtn = e.target.closest('.gallery-btn');
    if (gBtn) { openGallery(+gBtn.dataset.project, gBtn); return; }
    if (e.target.closest('a, button, .notes__body')) return;
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

  /* ================= Galería del proyecto ================= */
  var gallery = document.createElement('div');
  gallery.className = 'gallery';
  gallery.setAttribute('role', 'dialog');
  gallery.setAttribute('aria-modal', 'true');
  gallery.hidden = true;
  gallery.innerHTML =
    '<div class="gallery__progress"><span></span></div>' +
    '<header class="gallery__bar">' +
      '<span class="gallery__label"></span>' +
      '<span class="gallery__count"></span>' +
      '<button class="gallery__close" type="button" aria-label="Cerrar galería">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
      '</button>' +
    '</header>' +
    '<div class="gallery__scroll"></div>';
  document.body.appendChild(gallery);

  var gScroll = gallery.querySelector('.gallery__scroll');
  var gCount = gallery.querySelector('.gallery__count');
  var gLabel = gallery.querySelector('.gallery__label');
  var gProgress = gallery.querySelector('.gallery__progress span');
  var galleryOpen = false, lastTrigger = null, observer = null;

  function openGallery(i, trigger) {
    var p = projects[i];
    var imgs = imagesOf(p);
    lastTrigger = trigger || null;
    gLabel.innerHTML = '<b>Nº ' + pad(i + 1) + '</b> ' + esc(p.title);
    gallery.setAttribute('aria-label', 'Imágenes de ' + p.title);
    gScroll.innerHTML =
      '<section class="gallery__intro">' +
        '<div class="gallery__num">' + pad(i + 1) + '<span>.</span></div>' +
        '<h2 class="gallery__title">' + esc(p.title) + '</h2>' +
        '<ul class="notes__tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
        '<div class="gallery__text">' + bodyHTML(p) + '</div>' +
        '<p class="gallery__cue">desliza para ver las imágenes ↓</p>' +
      '</section>' +
      imgs.map(function (im, k) {
        return '<figure class="gallery__item" data-k="' + (k + 1) + '">' +
          '<img src="' + im.src + '" data-fallback="' + (im.fallback || '') + '" alt="' + esc(p.title + ' — imagen ' + (k + 1)) + '" loading="' + (k < 2 ? 'eager' : 'lazy') + '" decoding="async">' +
          '<figcaption><span>' + pad(k + 1) + ' / ' + pad(imgs.length) + '</span>' + (im.caption ? esc(im.caption) : '') + '</figcaption>' +
        '</figure>';
      }).join('') +
      (p.images && p.images.length ? '' : '<p class="gallery__pending">Pronto más imágenes de este proyecto.</p>') +
      '<button class="btn gallery__back" type="button">Volver a la bitácora</button>';

    gScroll.querySelectorAll('img[data-fallback]').forEach(function (img) {
      img.addEventListener('error', function () {
        var fb = img.getAttribute('data-fallback');
        if (fb && img.src !== fb) img.src = fb;
      }, { once: true });
    });

    gCount.textContent = '— / ' + pad(imgs.length);
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) gCount.textContent = pad(+en.target.dataset.k) + ' / ' + pad(imgs.length);
      });
    }, { root: gScroll, threshold: 0.55 });
    gScroll.querySelectorAll('.gallery__item').forEach(function (f) { observer.observe(f); });

    gScroll.scrollTop = 0;
    gProgress.style.transform = 'scaleX(0)';
    gallery.hidden = false;
    void gallery.offsetWidth;
    gallery.classList.add('is-open');
    document.body.classList.add('gallery-lock');
    galleryOpen = true;
    gallery.querySelector('.gallery__close').focus({ preventScroll: true });
  }

  function closeGallery() {
    if (!galleryOpen) return;
    galleryOpen = false;
    gallery.classList.remove('is-open');
    document.body.classList.remove('gallery-lock');
    setTimeout(function () { if (!galleryOpen) gallery.hidden = true; }, 400);
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  gScroll.addEventListener('scroll', function () {
    var max = gScroll.scrollHeight - gScroll.clientHeight;
    gProgress.style.transform = 'scaleX(' + (max > 0 ? gScroll.scrollTop / max : 1) + ')';
  }, { passive: true });

  gallery.addEventListener('click', function (e) {
    if (e.target.closest('.gallery__close, .gallery__back')) closeGallery();
  });

  document.addEventListener('keydown', function (e) {
    if (galleryOpen) {
      if (e.key === 'Escape') closeGallery();
      return;
    }
    if (activeView !== 'proyectos') return;
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

  // "Mi Portafolio" → inicio (vista Proyectos, portada del libro)
  document.querySelector('.topbar__title').addEventListener('click', function (e) {
    e.preventDefault();
    closeGallery();
    if (location.hash !== '#proyectos') history.pushState(null, '', '#proyectos');
    var wasActive = activeView === 'proyectos';
    show('proyectos');
    if (wasActive) goHome();
    else {
      // Sin animación si venimos de otra vista
      pageEls.forEach(function (el) { el.classList.remove('turned', 'is-turning'); });
      index = 0;
      updateUI();
    }
  });

  window.addEventListener('hashchange', function () { closeGallery(); show(location.hash.slice(1)); });
  show(location.hash.slice(1) || 'proyectos');
})();
