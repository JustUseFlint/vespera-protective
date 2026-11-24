/* Vespera Protective — site.js (native scroll; GSAP used only for transform/opacity reveals + interactions) */
(function () {
  'use strict';
  var doc = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var motion = hasGsap && !reduce;
  if (!motion) doc.classList.add('no-motion');
  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- split text (words, optional chars), preserving inline markup */
  function splitEl(el, mode) {
    var targets = [];
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'sw';
            if (mode === 'chars') {
              Array.prototype.forEach.call(p, function (ch) { var c = document.createElement('span'); c.textContent = ch; w.appendChild(c); targets.push(c); });
            } else { var i = document.createElement('span'); i.textContent = p; w.appendChild(i); targets.push(i); }
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR' && n.tagName !== 'svg') { walk(n); }
      });
    }
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    walk(el);
    $$('.sw', el).forEach(function (s) { s.setAttribute('aria-hidden', 'true'); });
    var sr = document.createElement('span'); sr.className = 'sr'; sr.textContent = label; el.insertBefore(sr, el.firstChild);
    return targets;
  }

  function initSplits() {
    $$('[data-split]').forEach(function (el) {
      var mode = el.getAttribute('data-split') === 'chars' ? 'chars' : 'words';
      if (!motion) { el.style.visibility = 'visible'; return; }
      var t = splitEl(el, mode);
      gsap.set(t, { yPercent: 115 });
      el.style.visibility = 'visible';
      var isHero = !!el.closest('[data-hero]') || el.classList.contains('phero__h') || el.classList.contains('shero__h') || el.classList.contains('post__h');
      var tw = { yPercent: 0, duration: mode === 'chars' ? 1.15 : 1.05, ease: 'expo.out', stagger: mode === 'chars' ? 0.022 : 0.045 };
      if (isHero) { gsap.to(t, Object.assign(tw, { delay: 0.15 })); }
      else { ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () { gsap.to(t, tw); } }); }
    });
  }

  function initReveals() {
    var els = $$('[data-reveal]');
    if (!motion) { els.forEach(function (e) { e.style.opacity = 1; e.classList.add('is-in'); }); return; }
    gsap.set(els, { opacity: 0, y: 34 });
    ScrollTrigger.batch(els, {
      start: 'top 90%', once: true,
      onEnter: function (batch) {
        batch.forEach(function (b) { b.classList.add('is-in'); });
        gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: 'auto', clearProps: 'y' });
      }
    });
  }

  /* ---------- header */
  function initHeader() {
    var h = $('[data-hdr]'); if (!h) return;
    var last = window.scrollY, ticking = false;
    function upd() {
      var y = window.scrollY;
      h.classList.toggle('is-scrolled', y > 24);
      if (!doc.classList.contains('menu-open')) {
        if (y > last + 6 && y > 320) h.classList.add('is-hidden');
        else if (y < last - 6 || y < 320) h.classList.remove('is-hidden');
      }
      last = y; ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
    h.addEventListener('focusin', function () { h.classList.remove('is-hidden'); });
  }

  /* ---------- full-screen menu */
  function initMenu() {
    var btn = $('[data-menu-btn]'), menu = $('[data-menu]'); if (!btn || !menu) return;
    var label = $('[data-menu-label]', btn), roll = label && label.parentNode;
    var curtains = $$('.menu__curtain', menu), links = $$('.menu__links li > a', menu), aside = $('.menu__aside', menu), main = $('.menu__main .menu__eyebrow', menu);
    var shots = $$('[data-shot]', menu), brief = $('[data-menu-brief]', menu);
    var open = false, tl = null;
    function setLabel(t) { if (label) { label.textContent = t; roll.setAttribute('data-t', t); } }
    function show() {
      open = true; menu.hidden = false; doc.classList.add('is-locked', 'menu-open');
      btn.setAttribute('aria-expanded', 'true'); setLabel('Close');
      $('[data-hdr]').classList.remove('is-hidden');
      if (motion) {
        if (tl) tl.kill();
        tl = gsap.timeline();
        tl.fromTo(curtains, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.8, ease: 'expo.inOut', stagger: 0.08 })
          .fromTo(links, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.05 }, '-=0.35')
          .fromTo([main, aside], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 }, '-=0.8');
      } else { curtains.forEach(function (c) { c.style.transform = 'none'; }); }
      setTimeout(function () { links[0] && links[0].focus({ preventScroll: true }); }, motion ? 450 : 0);
    }
    function hide(returnFocus) {
      open = false; btn.setAttribute('aria-expanded', 'false'); setLabel('Menu');
      var done = function () { menu.hidden = true; doc.classList.remove('is-locked', 'menu-open'); };
      if (motion) {
        if (tl) tl.kill();
        tl = gsap.timeline({ onComplete: done });
        tl.to([main, aside].concat(links), { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in' })
          .to(curtains.slice().reverse(), { scaleY: 0, transformOrigin: 'bottom', duration: 0.6, ease: 'expo.inOut', stagger: 0.06 }, '-=0.1');
      } else done();
      if (returnFocus) btn.focus({ preventScroll: true });
    }
    btn.addEventListener('click', function () { open ? hide(false) : show(); });
    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); hide(true); }
      if (e.key === 'Tab') {
        var f = [btn].concat($$('a[href], button', menu).filter(function (x) { return x.offsetParent !== null; }));
        var i = f.indexOf(document.activeElement);
        if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    function preview(key, text) {
      shots.forEach(function (s) { s.classList.toggle('is-on', s.getAttribute('data-shot') === key); });
      if (brief && text) { brief.style.opacity = 0; setTimeout(function () { brief.textContent = text; brief.style.opacity = 1; }, 180); }
    }
    $$('[data-preview]', menu).forEach(function (a) {
      var fn = function () { preview(a.getAttribute('data-preview'), a.getAttribute('data-brief')); };
      a.addEventListener('mouseenter', fn); a.addEventListener('focus', fn);
    });
    $$('a[href]', menu).forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href').charAt(0) === '#') hide(false); }); });
    window.__vpMenu = { open: show, close: hide, isOpen: function () { return open; } };
  }

  /* ---------- pointer specular sheen + tilt (lerped, fine pointers only) */
  function initSheen() {
    if (!fine || reduce) return;
    $$('[data-sheen]').forEach(function (el) {
      var tx = 50, ty = 50, cx = 50, cy = 50, raf = null, active = false;
      var tilt = el.hasAttribute('data-tilt') && hasGsap;
      function loop() {
        cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
        el.style.setProperty('--mx', cx.toFixed(2) + '%'); el.style.setProperty('--my', cy.toFixed(2) + '%');
        if (tilt && active) gsap.set(el, { rotationY: (cx - 50) / 50 * 3.2, rotationX: -(cy - 50) / 50 * 3.2, transformPerspective: 1100 });
        if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) raf = requestAnimationFrame(loop); else raf = null;
      }
      el.addEventListener('pointerenter', function () { active = true; el.style.setProperty('--sh', '1'); });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width * 100; ty = (e.clientY - r.top) / r.height * 100;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener('pointerleave', function () {
        active = false; el.style.setProperty('--sh', '0');
        if (tilt) gsap.to(el, { rotationX: 0, rotationY: 0, duration: 1, ease: 'expo.out' });
      });
    });
  }

  /* ---------- floating service preview */
  function initHoverImg() {
    var box = $('[data-hover-float]'), list = $('[data-svc-list]');
    if (!box || !list || !fine || reduce || window.innerWidth < 1024) return;
    var items = $$('.hover-img__item', box), x = 0, y = 0, cx = 0, cy = 0, raf = null, on = false;
    function loop() {
      cx += (x - cx) * 0.14; cy += (y - cy) * 0.14;
      box.style.transform = 'translate3d(' + (cx + 28).toFixed(1) + 'px,' + (cy - 130).toFixed(1) + 'px,0) rotate(' + ((x - cx) * 0.02).toFixed(2) + 'deg)';
      raf = on || Math.abs(x - cx) > 0.3 ? requestAnimationFrame(loop) : null;
    }
    $$('[data-hover-img]', list).forEach(function (a) {
      a.addEventListener('mouseenter', function (e) {
        var k = a.getAttribute('data-hover-img');
        items.forEach(function (i) { i.classList.toggle('is-on', i.getAttribute('data-key') === k); });
        if (!on) { cx = x = e.clientX; cy = y = e.clientY; }
        on = true; box.classList.add('is-on'); if (!raf) raf = requestAnimationFrame(loop);
      });
    });
    list.addEventListener('mousemove', function (e) { x = e.clientX; y = e.clientY; });
    list.addEventListener('mouseleave', function () { on = false; box.classList.remove('is-on'); });
    window.addEventListener('scroll', function () { if (on) { on = false; box.classList.remove('is-on'); } }, { passive: true });
  }

  /* ---------- posture configurator */
  var SVC = {
    'executive-protection': 'Executive Protection', 'estate-security': 'Estate Security', 'secure-transit': 'Secure Transit',
    'event-protection': 'Event Protection', 'intelligence-advisory': 'Intelligence & Advisory'
  };
  function initConfig() {
    var box = $('[data-config]'); if (!box) return;
    var stack = $('[data-cfg-stack]', box), lead = $('[data-cfg-lead]', box), team = $('[data-cfg-team]', box), go = $('[data-cfg-link]', box);
    var root = go.getAttribute('href').replace(/contact\/$/, '');
    var ENV = { urban: ['executive-protection', 'secure-transit'], residence: ['estate-security', 'intelligence-advisory'], travel: ['secure-transit', 'executive-protection', 'intelligence-advisory'], event: ['event-protection', 'executive-protection'] };
    var PROF = { executive: 'executive-protection', family: 'estate-security', public: 'intelligence-advisory', delegation: 'secure-transit' };
    var LEAD = { urban: '48–72 hours', residence: '2–6 weeks', travel: '72 hours per country', event: '3–8 weeks' };
    var TEAM = { invisible: '1–2 officers · unmarked vehicles', measured: '2–4 officers · protective driver', visible: '4–8 officers · multi-vehicle detail' };
    var ROLE = ['Lead discipline', 'Supporting', 'Supporting'];
    var markSvg = '<svg class="mark" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true"><path d="M1 22.5 21 3l20 19.5h-8.4L21 11.2 9.4 22.5Z"/><path d="M7 25.5 27 45l20-19.5h-8.4L27 36.8 15.4 25.5Z"/></svg>';
    function val(n) { var i = $('input[name="cfg-' + n + '"]:checked', box); return i ? i.value : ''; }
    function render() {
      var p = val('profile'), e = val('env'), d = val('posture');
      var list = ENV[e].slice();
      if (list.indexOf(PROF[p]) === -1) list.push(PROF[p]);
      if (p === 'public' && e !== 'event') list.splice(1, 0, list.splice(list.indexOf('intelligence-advisory'), 1)[0]);
      if (p === 'family' && e === 'urban') list = ['executive-protection', 'estate-security', 'intelligence-advisory'];
      list = list.filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 3);
      stack.innerHTML = list.map(function (k, i) { return '<li><a href="' + root + 'services/' + k + '/">' + markSvg + SVC[k] + '</a><span class="mono">' + ROLE[i] + '</span></li>'; }).join('');
      lead.textContent = d === 'visible' && e === 'urban' ? '24–48 hours' : LEAD[e];
      team.textContent = TEAM[d];
      go.setAttribute('href', root + 'contact/?d=' + list.join(','));
    }
    box.addEventListener('change', render); render();
  }

  /* ---------- filters */
  function initFilters() {
    $$('[data-filter]').forEach(function (bar) {
      var key = bar.getAttribute('data-filter');
      var wrap = $('[data-filter-items="' + key + '"]'), empty = $('[data-filter-empty="' + key + '"]');
      var items = $$('[data-cat]', wrap);
      $$('.pill', bar).forEach(function (p) {
        p.addEventListener('click', function () {
          $$('.pill', bar).forEach(function (x) { x.classList.toggle('is-on', x === p); x.setAttribute('aria-pressed', x === p); });
          var f = p.getAttribute('data-f'), shown = [];
          items.forEach(function (it) { var ok = f === 'all' || it.getAttribute('data-cat') === f; it.classList.toggle('is-out', !ok); if (ok) shown.push(it); });
          if (empty) empty.hidden = shown.length > 0;
          if (motion) { gsap.fromTo(shown, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.05, overwrite: true }); ScrollTrigger.refresh(); }
          else shown.forEach(function (s) { s.style.opacity = 1; });
        });
      });
    });
  }

  /* ---------- FAQ */
  function initFaq() {
    $$('[data-faq] .faq__q button').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.closest('.faq__item'), open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open);
      });
    });
  }

  /* ---------- posture tabs (service pages) */
  function initPosture() {
    var box = $('[data-posture]'); if (!box) return;
    var btns = $$('.seg__btn', box), panels = $$('.posture__panel', box), dial = $('[data-dial]', box), lab = $('[data-dial-label]', box);
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x, j) { x.classList.toggle('is-on', j === i); x.setAttribute('aria-selected', j === i); });
        panels.forEach(function (p, j) { p.hidden = j !== i; p.classList.toggle('is-on', j === i); });
        dial.style.setProperty('--p', [33, 66, 100][i]); lab.textContent = b.textContent;
        var m = $('.dial__core .mark', dial); if (m) m.style.transform = 'rotate(' + (i * 90) + 'deg)';
      });
    });
  }

  /* ---------- doctrine tabs */
  function initTabs() {
    $$('[data-tabs]').forEach(function (box) {
      var tabs = $$('[role="tab"]', box), panels = $$('[role="tabpanel"]', box);
      function act(i, focus) {
        tabs.forEach(function (t, j) { var on = j === i; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
        panels.forEach(function (p, j) { p.hidden = j !== i; p.classList.toggle('is-on', j === i); });
        if (focus) tabs[i].focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { act(i); });
        t.addEventListener('keydown', function (e) {
          var k = e.key, n = tabs.length;
          if (k === 'ArrowDown' || k === 'ArrowRight') { e.preventDefault(); act((i + 1) % n, true); }
          if (k === 'ArrowUp' || k === 'ArrowLeft') { e.preventDefault(); act((i - 1 + n) % n, true); }
        });
      });
    });
  }

  /* ---------- clocks */
  function initClocks() {
    var els = $$('[data-tz], [data-clock]'); if (!els.length) return;
    var ab = { 'America/New_York': 'NY', 'Europe/London': 'LDN', 'Europe/Zurich': 'GVA' };
    function tick() {
      var now = new Date();
      els.forEach(function (el) {
        var tz = el.getAttribute('data-tz') || el.getAttribute('data-clock');
        var t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(now);
        el.textContent = el.hasAttribute('data-tz') ? ab[tz] + ' ' + t : t;
      });
    }
    tick(); setInterval(tick, 15000);
  }

  /* ---------- article progress + toc */
  function initArticle() {
    var bar = $('[data-progress]'), body = $('.post__body'); if (!bar || !body) return;
    var ticking = false;
    function upd() {
      var r = body.getBoundingClientRect(), total = r.height - window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')'; ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
    var links = $$('[data-toc]'); if (!links.length) return;
    var heads = links.map(function (l) { return document.getElementById(l.getAttribute('data-toc')); });
    var t2 = false;
    function act() {
      var cur = -1;
      heads.forEach(function (h, i) { if (h && h.getBoundingClientRect().top < 160) cur = i; });
      links.forEach(function (l, i) { l.classList.toggle('is-on', i === cur); });
      t2 = false;
    }
    window.addEventListener('scroll', function () { if (!t2) { t2 = true; requestAnimationFrame(act); } }, { passive: true });
    act();
  }

  /* ---------- contact intake */
  function initIntake() {
    var form = $('[data-intake]'); if (!form) return;
    var steps = $$('[data-step]', form), labels = $$('[data-step-label]', form), bar = $('[data-form-bar]', form);
    var prev = $('[data-prev]', form), next = $('[data-next]', form), nextLabel = $('[data-next-label]', form);
    var confirm = $('[data-confirm]'), cur = 0;
    var q = new URLSearchParams(location.search).get('d');
    if (q) q.split(',').forEach(function (s) { var i = $('input[name="disciplines"][value="' + s + '"]', form); if (i) i.checked = true; });
    function go(i) {
      cur = i;
      steps.forEach(function (s, j) { s.hidden = j !== i; s.classList.toggle('is-on', j === i); });
      labels.forEach(function (l, j) { l.classList.toggle('is-on', j === i); l.classList.toggle('is-done', j < i); });
      bar.style.transform = 'scaleX(' + ((i + 1) / steps.length) + ')';
      prev.hidden = i === 0;
      var t = i === steps.length - 1 ? 'Prepare request' : 'Continue';
      nextLabel.textContent = t; nextLabel.parentNode.setAttribute('data-t', t);
      if (i === steps.length - 1) review($('[data-review]', form));
      var top = form.getBoundingClientRect().top + window.scrollY - 100;
      if (window.scrollY > top) window.scrollTo(0, top);
    }
    function data() {
      var fd = new FormData(form);
      var d = $$('input[name="disciplines"]:checked', form).map(function (i) { return i.getAttribute('data-label'); });
      return [['Disciplines', d.join(', ') || '—'], ['Profile', fd.get('profile')], ['Timeframe', fd.get('timeframe')], ['Locations', fd.get('locations') || 'Not specified'], ['Risk context', fd.get('risk')], ['Channel', fd.get('channel')], ['Contact', (fd.get('name') || '') + ' · ' + (fd.get('contact') || '')], ['NDA first', fd.get('nda') ? 'Yes' : 'No']];
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function review(dl) { dl.innerHTML = data().map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join(''); }
    function valid() {
      var err = $('[data-err]', steps[cur]);
      if (cur === 0) { var ok = $$('input[name="disciplines"]:checked', form).length > 0; if (err) err.hidden = ok; return ok; }
      if (cur === 2) {
        var n = form.elements.name, c = form.elements.contact, ok2 = true;
        [n, c].forEach(function (f) { var bad = !f.value.trim(); f.classList.toggle('is-bad', bad); if (bad) ok2 = false; });
        if (err) err.hidden = ok2; return ok2;
      }
      return true;
    }
    next.addEventListener('click', function () {
      if (!valid()) return;
      if (cur < steps.length - 1) return go(cur + 1);
      var fd = new FormData(form);
      $('[data-ref]', confirm).textContent = 'VSP-' + Date.now().toString(36).slice(-5).toUpperCase();
      $('[data-confirm-channel]', confirm).textContent = String(fd.get('channel')).toLowerCase();
      review($('[data-confirm-review]', confirm));
      form.hidden = true; confirm.hidden = false; confirm.focus({ preventScroll: true });
      window.scrollTo(0, confirm.getBoundingClientRect().top + window.scrollY - 110);
    });
    prev.addEventListener('click', function () { if (cur > 0) go(cur - 1); });
    $('[data-restart]', confirm).addEventListener('click', function () { form.reset(); confirm.hidden = true; form.hidden = false; go(0); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
    go(0);
  }

  function initPlaceholderLinks() {
    $$('a[href="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
  }

  function boot() {
    initHeader(); initMenu(); initSheen(); initHoverImg(); initConfig(); initFilters(); initFaq(); initPosture(); initTabs(); initClocks(); initArticle(); initIntake(); initPlaceholderLinks();
    initReveals();
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var done = false;
    var run = function () { if (done) return; done = true; initSplits(); if (motion) ScrollTrigger.refresh(); window.__vpReady = true; };
    fontsReady.then(run); setTimeout(run, 1200);
    window.__vpBooted = true;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
