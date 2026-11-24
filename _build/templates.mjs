import { SITE, NAV, SERVICES } from './data.mjs';
import { readFileSync } from 'node:fs';
const DIMS = JSON.parse(readFileSync(new URL('./img-dims.json', import.meta.url)));
export const V = '2';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const MARK_PATHS = '<path d="M1 22.5 21 3l20 19.5h-8.4L21 11.2 9.4 22.5Z"/><path d="M7 25.5 27 45l20-19.5h-8.4L27 36.8 15.4 25.5Z"/>';
export const mark = (cls = 'mark', title = '') => `<svg class="${cls}" viewBox="0 0 48 48" fill="currentColor" ${title ? `role="img" aria-label="${esc(title)}"` : 'aria-hidden="true" focusable="false"'}>${MARK_PATHS}</svg>`;
export const markLine = (cls = 'mark-line') => `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" vector-effect="non-scaling-stroke" aria-hidden="true" focusable="false"><path vector-effect="non-scaling-stroke" d="M1 22.5 21 3l20 19.5h-8.4L21 11.2 9.4 22.5Z"/><path vector-effect="non-scaling-stroke" d="M7 25.5 27 45l20-19.5h-8.4L27 36.8 15.4 25.5Z"/></svg>`;
export const lattice = (cls = 'lattice', cols = 8, rows = 2) => {
  const s = 48, g = 10, W = cols * (s + g), H = rows * (s + g);
  let cells = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells += `<g transform="translate(${c * (s + g)} ${r * (s + g)})">${MARK_PATHS}</g>`;
  return `<svg class="${cls}" viewBox="0 0 ${W - g} ${H - g}" fill="currentColor" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax meet">${cells}</svg>`;
};
export const arrow = (cls = 'arr') => `<svg class="${cls}" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>`;

export function pic(name, alt, { sizes = '100vw', cls = '', eager = false, imgCls = '' } = {}) {
  const [w, h] = DIMS[name];
  const r = (ext) => `${R}assets/img/${name}-800.${ext} 800w, ${R}assets/img/${name}.${ext} ${w}w`;
  return `<picture class="${cls}"><source type="image/webp" srcset="${r('webp')}" sizes="${sizes}"><img class="${imgCls}" src="${R}assets/img/${name}.jpg" srcset="${r('jpg')}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

// R = relative root for current page (set per render)
export let R = './';
export const setRoot = (r) => { R = r; };
export const href = (p) => (p === '' ? R : R + p);

export const roll = (text) => `<span class="roll" data-t="${esc(text)}"><span>${esc(text)}</span></span>`;
export const btn = (h, text, v = 'sand', extra = '') => `<a class="btn btn--${v}" href="${h}" ${extra}><span class="btn__fill" aria-hidden="true"></span>${roll(text)}<span class="btn__arr" aria-hidden="true">${arrow()}${arrow()}</span></a>`;

export const ALT = {
  'hero-fluted-wave': 'Abstract wave of fluted smoked glass lit with warm copper light on a midnight background',
  'footer-horizon': 'A lone figure in a long coat stands on curved stone steps before a monumental sculpted head in cobalt mist',
  'bento-crimson-response': 'Layered curved dark glass panels with glowing red edges on a crimson gradient',
  'bento-fluted-prism': 'Vertical fluted crystal glass rising in a curve, lit in peach and slate blue',
  'service-executive': 'A protection specialist in a charcoal overcoat beside a black sedan under a lit limestone colonnade at dusk',
  'service-estate': 'A limestone and glass hillside residence glowing amber at twilight above a dark sea',
  'service-transit': 'A private jet on a rain-slicked tarmac at night seen past a pane of fluted glass',
  'service-events': 'A travertine gallery at night set with round tables for a private gala under warm spotlights',
  'about-monolith': 'A stone atrium with fluted glass columns and diagonal shafts of warm light across a dark floor',
  'service-intelligence': 'A dark stone desk with a closed laptop and a folded map before a fluted glass window at night',
};

const ICONS = {
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"/>',
  instagram: '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1ZM17.95 7.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z"/><path d="M12 3.2c-2.4 0-2.7 0-3.64.05-3.2.15-5 1.93-5.1 5.1C3.2 9.3 3.2 9.6 3.2 12s0 2.7.05 3.64c.15 3.18 1.92 4.96 5.1 5.1.95.05 1.25.06 3.65.06s2.7 0 3.64-.05c3.18-.15 4.96-1.93 5.1-5.1.05-.95.06-1.25.06-3.65s0-2.7-.05-3.64c-.15-3.18-1.93-4.96-5.1-5.1C14.7 3.2 14.4 3.2 12 3.2Zm0 1.6c2.35 0 2.63 0 3.56.05 2.38.1 3.5 1.24 3.6 3.6.04.93.05 1.2.05 3.55s0 2.63-.05 3.56c-.1 2.36-1.21 3.5-3.6 3.6-.93.04-1.2.05-3.56.05s-2.63 0-3.56-.05c-2.39-.1-3.5-1.24-3.6-3.6C4.8 14.63 4.8 14.35 4.8 12s0-2.63.05-3.56c.1-2.36 1.22-3.5 3.6-3.6.93-.04 1.2-.05 3.55-.05Z"/>',
  x: '<path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z"/>',
  youtube: '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77c.4-1.56.4-4.8.4-4.8s0-3.24-.4-4.8ZM10 15V9l5.2 3L10 15Z"/>',
};
const icon = (k) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">${ICONS[k]}</svg>`;

function header(active) {
  const links = NAV.filter((n) => n.label !== 'Contact').map((n) => `<a class="hdr__link${active === n.href ? ' is-active' : ''}" href="${href(n.href)}"${active === n.href ? ' aria-current="page"' : ''}>${roll(n.label)}</a>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="hdr__bar">
    <a class="hdr__brand" href="${href('')}" aria-label="Vespera Protective home">${mark('mark hdr__mark')}<span class="hdr__word">Vespera</span></a>
    <nav class="hdr__nav" aria-label="Primary">${links}</nav>
    <div class="hdr__actions">
      <a class="btn btn--sand btn--sm hdr__cta" href="${href('contact/')}"><span class="btn__fill" aria-hidden="true"></span>${roll('Private Briefing')}<span class="btn__arr" aria-hidden="true">${arrow()}${arrow()}</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn>
        <span class="menu-btn__label"><span class="roll" data-t="Menu"><span data-menu-label>Menu</span></span></span>
        <span class="menu-btn__icon" aria-hidden="true"><i></i><i></i></span>
      </button>
    </div>
  </div>
</header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Site menu" hidden data-menu>
  <div class="menu__curtain menu__curtain--l" aria-hidden="true"></div>
  <div class="menu__curtain menu__curtain--r" aria-hidden="true"></div>
  <div class="menu__inner">
    <div class="menu__main">
      <p class="mono menu__eyebrow">Navigate</p>
      <ul class="menu__links">
        <li><a class="menu__link" href="${href('')}" data-preview="hero-fluted-wave" data-brief="Discreet protection for principals, families and the places they call home."><span class="menu__txt">Home</span>${arrow('arr menu__arr')}</a></li>
        ${NAV.map((n) => `<li><a class="menu__link${active === n.href ? ' is-current' : ''}" href="${href(n.href)}" data-preview="${n.img}" data-brief="${esc(n.brief)}"><span class="menu__txt">${n.label}</span>${arrow('arr menu__arr')}</a></li>`).join('')}
      </ul>
      <div class="menu__desk-m">
        <p class="mono">Operations Desk · 24/7</p>
        <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
      </div>
    </div>
    <aside class="menu__aside">
      <div class="menu__preview" aria-hidden="true">
        ${['hero-fluted-wave', ...new Set(NAV.map((n) => n.img))].map((k, i) => `<div class="menu__shot${i === 0 ? ' is-on' : ''}" data-shot="${k}">${pic(k, '', { sizes: '(min-width: 1024px) 34vw, 1px' })}</div>`).join('')}
        <div class="menu__sheen"></div>
        <p class="menu__brief" data-menu-brief>Discreet protection for principals, families and the places they call home.</p>
      </div>
      <div class="menu__grid">
        <div>
          <p class="mono menu__eyebrow">Disciplines</p>
          <ul class="menu__svc">${SERVICES.map((s) => `<li><a href="${href('services/' + s.slug + '/')}" data-preview="${s.img}" data-brief="${esc(s.line)}">${s.short}</a></li>`).join('')}</ul>
        </div>
        <div class="menu__desk">
          <p class="mono menu__eyebrow"><span class="pulse" aria-hidden="true"></span>Operations Desk · 24/7</p>
          <a class="menu__phone" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
          <a class="menu__mail" href="mailto:${SITE.email}">${SITE.email}</a>
          <p class="mono menu__hubs">New York · London · Geneva</p>
        </div>
      </div>
    </aside>
  </div>
</div>`;
}

function footer() {
  const col = (h, items) => `<div class="ftr__col"><h2 class="ftr__h">${h}</h2><ul>${items.map(([l, u]) => `<li><a href="${u}">${roll(l)}</a></li>`).join('')}</ul></div>`;
  return `<footer class="ftr" aria-labelledby="ftr-title">
  <h2 id="ftr-title" class="sr">Vespera Protective</h2>
  <div class="ftr__top wrap">
    <div class="ftr__brand">
      <a class="ftr__logo" href="${href('')}" aria-label="Vespera Protective home">${mark('mark')}<span>Vespera</span></a>
      <p>Vespera is a discreet private security firm for principals, families and institutions. Protection, intelligence and transit, planned as one quiet program.</p>
      <div class="ftr__social">
        ${['instagram', 'linkedin', 'x', 'youtube'].map((k) => `<a href="${href('contact/')}" aria-label="${{ instagram: 'Instagram', linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube' }[k]}: request our private channels">${icon(k)}</a>`).join('')}
      </div>
    </div>
    <nav class="ftr__cols" aria-label="Footer">
      ${col('Services', SERVICES.map((s) => [s.short, href('services/' + s.slug + '/')]))}
      ${col('Company', [['About', href('about/')], ['Methodology', href('methodology/')], ['Sectors', href('sectors/')], ['Contact', href('contact/')]])}
      ${col('Resources', [['Briefings', href('briefings/')], ['Choosing a firm', href('briefings/choosing-a-private-security-firm/')], ['Privacy Policy', href('privacy/')], ['Sitemap', href('sitemap.xml')]])}
    </nav>
  </div>
  <div class="wrap ftr__bar">
    <p>Operations Desk · 24/7 · <a href="tel:${SITE.phoneHref}">${SITE.phone}</a></p>
    <p>Vespera Protective ©2026. All Rights Reserved</p>
  </div>
  <div class="ftr__art">${pic('footer-horizon', ALT['footer-horizon'], { sizes: '100vw' })}</div>
</footer>`;
}

export function layout({ path, title, desc, body, jsonld = [], ogType = 'website', bodyClass = '', active = '', img = 'og-vespera.jpg' }) {
  const canonical = SITE.url + path;
  const org = { '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: SITE.url, logo: SITE.url + 'assets/img/vespera-mark.png', email: SITE.email, telephone: SITE.phone, description: 'Discreet private security: executive protection, estate security, secure transit, event protection and threat intelligence.', areaServed: ['New York', 'London', 'Geneva', 'Worldwide'] };
  const ld = [org, ...jsonld].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0A111A">
<meta property="og:site_name" content="Vespera Protective">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}assets/img/${img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE.url}assets/img/${img}">
<link rel="icon" href="${R}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${R}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${R}assets/css/site.css?v=${V}">
<script>document.documentElement.classList.add('js');setTimeout(function(){if(!window.__vpBooted)document.documentElement.classList.remove('js')},3500)</script>
${ld}
</head>
<body class="${bodyClass}">
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="${R}assets/js/vendor/gsap.min.js?v=${V}" defer></script>
<script src="${R}assets/js/vendor/ScrollTrigger.min.js?v=${V}" defer></script>
<script src="${R}assets/js/site.js?v=${V}" defer></script>
</body>
</html>`;
}

// ---- Components
export const eyebrow = (t, cls = '') => `<p class="mono eyebrow ${cls}"><span class="eyebrow__dash" aria-hidden="true"></span>${t}</p>`;

export function faq(items, id = 'faq') {
  return `<div class="faq" data-faq>${items.map((f, i) => `<div class="faq__item" data-reveal>
    <h3 class="faq__q"><button type="button" aria-expanded="false" aria-controls="${id}-${i}" id="${id}-b${i}"><span>${esc(f.q)}</span><span class="faq__ic" aria-hidden="true"><i></i><i></i></span></button></h3>
    <div class="faq__a" id="${id}-${i}" role="region" aria-labelledby="${id}-b${i}"><div><p>${esc(f.a)}</p></div></div>
  </div>`).join('')}</div>`;
}
export const faqLd = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
export const crumbLd = (list) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: list.map(([n, p], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.url + p })) });
export const crumbs = (list) => `<nav class="crumbs mono" aria-label="Breadcrumb"><ol>${list.map(([n, p], i) => i === list.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${href(p)}">${esc(n)}</a></li>`).join('')}</ol></nav>`;

export function cta({ h = 'Begin with a private briefing.', p = 'A senior lead will listen first, then outline options. Under NDA, without obligation, through the channel you choose.' } = {}) {
  return `<section class="cta" aria-labelledby="cta-h">
  <div class="wrap">
    <div class="cta__card" data-reveal data-sheen>
      <div class="cta__copy">
        ${eyebrow('Private Briefing')}
        <h2 id="cta-h" class="cta__h" data-split>${h}</h2>
        <p>${p}</p>
        <div class="cta__actions">${btn(href('contact/'), 'Request a private briefing', 'ink')}<a class="cta__phone" href="tel:${SITE.phoneHref}"><span class="mono">Operations Desk · 24/7</span>${SITE.phone}</a></div>
      </div>
      ${lattice('lattice cta__lattice', 7, 3)}
      <span class="sheen" aria-hidden="true"></span>
    </div>
  </div>
</section>`;
}

export function articleCard(a, { big = false } = {}) {
  return `<article class="bcard${big ? ' bcard--big' : ''}" data-cat="${a.cat}" data-reveal>
  <a href="${href('briefings/' + a.slug + '/')}" class="bcard__link">
    <div class="bcard__img">${pic(a.img, ALT[a.img], { sizes: big ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 700px) 50vw, 100vw' })}</div>
    <div class="bcard__body">
      <p class="mono bcard__meta"><span>${a.cat}</span><span>${a.read} min read</span></p>
      <h3 class="bcard__h">${esc(a.title)}</h3>
      ${big ? `<p class="bcard__p">${esc(a.desc)}</p>` : ''}
      <span class="bcard__more">${roll('Read the briefing')}${arrow()}</span>
    </div>
  </a>
</article>`;
}

// Tiny markdown renderer for briefings
export function md(src) {
  const lines = src.trim().split('\n');
  let out = '', list = null, toc = [];
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const closeList = () => { if (list) { out += `<ul>${list.join('')}</ul>`; list = null; } };
  for (const raw of lines) {
    const l = raw.trimEnd();
    if (!l.trim()) { closeList(); continue; }
    if (l.startsWith('## ')) { closeList(); const t = l.slice(3); const id = slugify(t); toc.push([t, id]); out += `<h2 id="${id}" data-reveal>${inline(t)}</h2>`; }
    else if (l.startsWith('### ')) { closeList(); out += `<h3 data-reveal>${inline(l.slice(4))}</h3>`; }
    else if (l.startsWith('- ')) { (list ||= []).push(`<li>${inline(l.slice(2))}</li>`); }
    else if (l.startsWith('> ')) { closeList(); out += `<blockquote class="pull" data-reveal>${mark('mark pull__mark')}<p>${inline(l.slice(2))}</p></blockquote>`; }
    else { closeList(); out += `<p>${inline(l)}</p>`; }
  }
  closeList();
  return { html: out, toc };
}
