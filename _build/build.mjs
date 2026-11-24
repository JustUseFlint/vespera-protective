import { mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { SITE, NAV, SERVICES, CATS, TIERS, PHASES, SECTORS, HOME_FAQ, BRIEF_CATS } from './data.mjs';
import * as T from './templates.mjs';
const { esc, pic, mark, markLine, lattice, arrow, btn, roll, eyebrow, faq, faqLd, crumbLd, crumbs, cta, articleCard, md, ALT, href } = T;

const ROOT = new URL('..', import.meta.url).pathname;
const pages = [];
function out(path, render) {
  const depth = path === '' || path === '404.html' ? 0 : path.split('/').filter(Boolean).length;
  T.setRoot(depth ? '../'.repeat(depth) : './');
  const html = render();
  const file = path.endsWith('.html') ? join(ROOT, path) : join(ROOT, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (path !== '404.html') pages.push(path);
}

// ---- Articles
const ARTICLES = readdirSync(new URL('./articles/', import.meta.url)).filter((f) => f.endsWith('.md')).map((f) => {
  const src = readFileSync(new URL('./articles/' + f, import.meta.url), 'utf8');
  const [, fm, body] = src.split(/^---$/m);
  const meta = Object.fromEntries(fm.trim().split('\n').map((l) => { const i = l.indexOf(':'); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; }));
  return { slug: f.replace('.md', ''), ...meta, read: Math.max(5, Math.round(body.split(/\s+/).filter(Boolean).length / 225)), takeaways: meta.takeaways.split('|'), body, words: body.split(/\s+/).filter(Boolean).length };
}).sort((a, b) => b.date.localeCompare(a.date));
const art = (slug) => ARTICLES.find((a) => a.slug === slug);
const svc = (slug) => SERVICES.find((s) => s.slug === slug);
const fmtDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

// Phase glyphs built from the mark geometry
const GLYPH = {
  intelligence: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 24c6-9 13-13.5 22-13.5S40 15 46 24c-6 9-13 13.5-22 13.5S8 33 2 24Z"/><path d="M24 15.5 32.5 24 24 32.5 15.5 24Z" fill="currentColor" stroke="none"/></svg>',
  advance: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 8 22 24 6 40"/><path d="M18 8 34 24 18 40"/><path d="M30 8l16 16-16 16" stroke-width="3"/></svg>',
  presence: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M24 2 46 24 24 46 2 24Z"/><path d="M24 11 37 24 24 37 11 24Z"/><path d="M24 19.5 28.5 24 24 28.5 19.5 24Z" fill="currentColor" stroke="none"/></svg>',
  continuity: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 24a16 16 0 0 1 27.3-11.3"/><path d="M40 24a16 16 0 0 1-27.3 11.3"/><path d="M36 5v8h-8M12 43v-8h8"/></svg>',
};

// ================= HOME
out('', () => {
  const body = `
<section class="hero" data-sheen data-hero>
  <div class="hero__media">${pic('hero-fluted-wave', ALT['hero-fluted-wave'], { eager: true, sizes: '100vw' })}<span class="hero__ribs" aria-hidden="true"></span><span class="sheen sheen--hero" aria-hidden="true"></span></div>
  <div class="hero__rail wrap mono" aria-hidden="true">
    <span>Private security &amp; executive protection</span>
    <span class="hero__clocks" data-clocks><span data-tz="America/New_York">NY --:--</span><span data-tz="Europe/London">LDN --:--</span><span data-tz="Europe/Zurich">GVA --:--</span></span>
  </div>
  <div class="hero__content wrap">
    ${eyebrow('Vespera Protective')}
    <h1 class="hero__h" data-split="chars">Protection,<br> <em>held quietly.</em></h1>
    <div class="hero__foot">
      <p class="hero__p" data-reveal>Executive protection, estate security, secure transit and threat intelligence for principals who value discretion as much as safety.</p>
      <div class="hero__ctas" data-reveal>${btn(href('contact/'), 'Request a private briefing')}${btn(href('services/'), 'Explore disciplines', 'ghost')}</div>
    </div>
  </div>
  <div class="hero__base wrap mono" aria-hidden="true"><span><span class="pulse"></span>Operations Desk online</span><span>New York · London · Geneva</span><span class="hero__scroll">Scroll<i></i></span></div>
</section>

<section class="strip" aria-label="Capabilities">
  <div class="strip__track">${[0, 1].map((k) => `<div class="strip__set"${k ? ' aria-hidden="true"' : ''}>${['Close Protection', 'Estate Defense', 'Secure Aviation', 'Counter-Surveillance', 'Private Events', 'Crisis Continuity', 'Maritime Security', 'OSINT Hardening'].map((t) => `<span>${t}</span>${mark('mark strip__mark')}`).join('')}</div>`).join('')}</div>
</section>

<section class="intro wrap" aria-labelledby="intro-h">
  ${eyebrow('Our position')}
  <h2 id="intro-h" class="intro__h" data-split>We design protection the way architects design light: felt in every room, <span class="tone-sand">noticed in none.</span></h2>
  <div class="intro__cols">
    <p data-reveal>Vespera works for families, executives and institutions whose visibility brings risk. We plan every engagement as a single program, so the officer at the door, the analyst watching the open-source picture and the driver choosing a quieter street are all working from the same brief.</p>
    <p data-reveal>Our people come from protective services, specialist policing and intelligence work, and are selected for temperament first. They are trained to de-escalate, to move early and to treat discretion as part of the protection itself.</p>
  </div>
</section>

<section class="bento-sec wrap" aria-labelledby="bento-h">
  <div class="sec-head">
    ${eyebrow('The Vespera system')}
    <h2 id="bento-h" class="sec-h" data-split>One program. Every layer of a principal's life.</h2>
  </div>
  <div class="bento">
    <article class="tile tile--obs" data-reveal data-sheen data-tilt>
      <div class="tile__bg">${pic('bento-fluted-prism', ALT['bento-fluted-prism'], { sizes: '(min-width: 1024px) 58vw, 100vw' })}</div>
      <span class="sheen" aria-hidden="true"></span>
      <div class="tile__top"><p class="mono">Close protection · Signature</p><p class="mono tile__status"><span class="pulse"></span>Detail active</p></div>
      <div class="tile__center">${mark('mark tile__bigmark')}</div>
      <div class="tile__bottom">
        <h3 class="tile__h">Present everywhere.<br>Noticed nowhere.</h3>
        <dl class="readout mono">
          <div><dt>Posture</dt><dd>Low profile</dd><span class="readout__bar"><i style="--w:.32"></i></span></div>
          <div><dt>Advance</dt><dd>T–72h complete</dd><span class="readout__bar"><i style="--w:1"></i></span></div>
          <div><dt>Medical</dt><dd>Trauma center mapped</dd><span class="readout__bar"><i style="--w:.86"></i></span></div>
        </dl>
      </div>
    </article>
    <article class="tile tile--sand" data-reveal data-sheen>
      <span class="sheen" aria-hidden="true"></span>
      <p class="mono">Estate &amp; residence</p>
      <h3 class="tile__h tile__h--ink">Discretion engineered into every perimeter.</h3>
      <a class="tile__link" href="${href('services/estate-security/')}">${roll('Estate security')}${arrow()}</a>
      ${lattice('lattice tile__lattice', 9, 2)}
    </article>
    <article class="tile tile--slate" data-reveal data-sheen>
      <span class="sheen" aria-hidden="true"></span>
      ${markLine('mark-line tile__outline')}
      <p class="mono">Aviation · Maritime · Ground</p>
      <h3 class="tile__h tile__h--peach">Your movement, uncompromised.</h3>
      <a class="tile__link tile__link--peach" href="${href('services/secure-transit/')}">${roll('Secure transit')}${arrow()}</a>
    </article>
    <article class="tile tile--red" data-reveal data-sheen>
      <div class="tile__bg">${pic('bento-crimson-response', ALT['bento-crimson-response'], { sizes: '(min-width: 1024px) 34vw, 100vw' })}</div>
      <span class="sheen" aria-hidden="true"></span>
      <p class="mono tile__live"><span class="pulse pulse--light"></span>Active desk · NY · LDN · GVA</p>
      <div class="tile__redbody">
        <h3 class="tile__h">Global rapid response.</h3>
        <p>One number, answered by a senior duty officer in every time zone. Deployment in most major cities within twelve hours.</p>
        <a class="tile__phone" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
        <p class="mono tile__meta"><span>24/7 Operations Desk</span><span>Encrypted line</span></p>
      </div>
    </article>
    <article class="tile tile--cfg" data-reveal data-config>
      <div class="cfg__head">
        <p class="mono">Protective posture configurator</p>
        <h3 class="tile__h">Shape a program in three choices.</h3>
      </div>
      <div class="cfg__body">
        <div class="cfg__controls">
          ${[['profile', 'Principal profile', [['executive', 'Executive'], ['family', 'Family'], ['public', 'Public figure'], ['delegation', 'Delegation']]], ['env', 'Environment', [['urban', 'City'], ['residence', 'Residence'], ['travel', 'International'], ['event', 'Event']]], ['posture', 'Discretion posture', [['invisible', 'Invisible'], ['measured', 'Measured'], ['visible', 'Visible']]]].map(([k, l, opts]) => `<fieldset class="cfg__group"><legend class="mono">${l}</legend><div class="seg">${opts.map(([v, t], i) => `<label class="seg__opt"><input type="radio" name="cfg-${k}" value="${v}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div></fieldset>`).join('')}
        </div>
        <div class="cfg__out" aria-live="polite">
          <p class="mono cfg__label">Recommended discipline stack</p>
          <ol class="cfg__stack" data-cfg-stack></ol>
          <dl class="cfg__specs">
            <div><dt class="mono">Advance lead time</dt><dd data-cfg-lead>72 hours</dd></div>
            <div><dt class="mono">Team</dt><dd data-cfg-team>1–2 officers</dd></div>
          </dl>
          <a class="cfg__go" href="${href('contact/')}" data-cfg-link>${roll('Configure a briefing')}${arrow()}</a>
        </div>
      </div>
    </article>
  </div>
</section>

<section class="svc-sec" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>${eyebrow('Disciplines')}<h2 id="svc-h" class="sec-h" data-split>Five disciplines, planned as one.</h2></div>
      <p class="sec-lede" data-reveal>Each discipline stands on its own. Together they close the gaps between home, office, road, runway and room.</p>
    </div>
    <ul class="svc-list" data-svc-list>
      ${SERVICES.map((s) => `<li class="svc-row" data-reveal>
        <a href="${href('services/' + s.slug + '/')}" data-hover-img="${s.img}">
          <span class="svc-row__thumb">${pic(s.img, '', { sizes: '120px' })}</span>
          <span class="svc-row__name">${s.short}</span>
          <span class="svc-row__line">${s.line}</span>
          <span class="svc-row__tags mono">${s.tags.join(' · ')}</span>
          <span class="svc-row__arr">${arrow()}</span>
        </a>
      </li>`).join('')}
    </ul>
  </div>
  <div class="hover-img" aria-hidden="true" data-hover-float>${SERVICES.map((s) => `<div class="hover-img__item" data-key="${s.img}">${pic(s.img, '', { sizes: '420px' })}</div>`).join('')}</div>
</section>

<section class="doctrine wrap" aria-labelledby="doc-h">
  <div class="sec-head sec-head--split">
    <div>${eyebrow('Methodology')}<h2 id="doc-h" class="sec-h" data-split>A doctrine, not a roster.</h2></div>
    <p class="sec-lede" data-reveal>Every Vespera program runs through the same four disciplines of thought, whether it protects a dinner for twelve or a family for a decade.</p>
  </div>
  <div class="doctrine__grid">
    ${PHASES.map((p) => `<article class="phase-card" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span><span class="phase-card__glyph">${GLYPH[p.k]}</span><h3>${p.name}</h3><p>${p.short}</p></article>`).join('')}
  </div>
  <div class="doctrine__more" data-reveal>${btn(href('methodology/'), 'Read our methodology', 'ghost')}</div>
</section>

<section class="brief-sec wrap" aria-labelledby="br-h">
  <div class="sec-head sec-head--split">
    <div>${eyebrow('Briefings')}<h2 id="br-h" class="sec-h" data-split>Research from the advisory desk.</h2></div>
    <a class="link-arrow" href="${href('briefings/')}">${roll('All briefings')}${arrow()}</a>
  </div>
  <div class="brief-grid">${ARTICLES.slice(0, 3).map((a) => articleCard(a)).join('')}</div>
</section>

<section class="faq-sec wrap" aria-labelledby="faq-h">
  <div class="faq-sec__head">${eyebrow('Questions')}<h2 id="faq-h" class="sec-h" data-split>Asked in confidence.</h2><p class="sec-lede" data-reveal>If your question is not here, the Operations Desk is answered day and night.</p></div>
  ${faq(HOME_FAQ, 'hf')}
</section>
${cta()}`;
  return T.layout({ path: '', title: 'Vespera Protective | Discreet Private Security & Executive Protection', desc: 'Vespera Protective is a discreet private security firm offering executive protection, estate security, secure transit, private event protection and threat intelligence from New York, London and Geneva.', body, jsonld: [faqLd(HOME_FAQ), { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url }], bodyClass: 'pg-home' });
});

// ================= SERVICES OVERVIEW
out('services/', () => {
  const rows = [['Typical lead time', 'leadTime'], ['Team', 'team'], ['Coverage', 'coverage'], ['Best for', 'bestFor']];
  const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Services', 'services/']])}
  <div class="phero__grid">
    <div>
      ${eyebrow('Disciplines')}
      <h1 class="phero__h" data-split="chars">Protective services</h1>
    </div>
    <p class="phero__lede" data-reveal>Five disciplines covering the people, places, movements and information that matter most. Engage one for a single assignment, or combine them into a protective program under one lead.</p>
  </div>
</section>
<section class="wrap svc-index" aria-labelledby="idx-h">
  <h2 id="idx-h" class="sr">Discipline index</h2>
  <div class="pills" role="group" aria-label="Filter disciplines" data-filter="svc">
    ${CATS.map((c, i) => `<button type="button" class="pill${i === 0 ? ' is-on' : ''}" data-f="${c.k}" aria-pressed="${i === 0}">${c.label}</button>`).join('')}
  </div>
  <div class="svc-cards" data-filter-items="svc">
    ${SERVICES.map((s) => `<article class="scard" data-cat="${s.cat}" data-reveal data-sheen data-tilt>
      <a href="${href('services/' + s.slug + '/')}">
        <div class="scard__img">${pic(s.img, ALT[s.img], { sizes: '(min-width: 1024px) 31vw, (min-width: 700px) 48vw, 100vw' })}<span class="sheen" aria-hidden="true"></span></div>
        <div class="scard__body">
          <p class="mono scard__cat">${s.catLabel}</p>
          <h3 class="scard__h">${s.name}</h3>
          <p>${s.line}</p>
          <p class="mono scard__tags">${s.tags.join(' · ')}</p>
          <span class="scard__more">${roll('Explore discipline')}${arrow()}</span>
        </div>
      </a>
    </article>`).join('')}
  </div>
  <p class="svc-empty mono" data-filter-empty="svc" hidden>No disciplines in this category.</p>
</section>
<section class="wrap matrix-sec" aria-labelledby="mx-h">
  <div class="sec-head">${eyebrow('Compare')}<h2 id="mx-h" class="sec-h" data-split>The disciplines side by side.</h2></div>
  <div class="matrix" data-reveal tabindex="0" role="region" aria-label="Comparison of protective disciplines">
    <table>
      <thead><tr><th scope="col"><span class="sr">Attribute</span></th>${SERVICES.map((s) => `<th scope="col"><a href="${href('services/' + s.slug + '/')}">${s.short}</a></th>`).join('')}</tr></thead>
      <tbody>${rows.map(([l, k]) => `<tr><th scope="row" class="mono">${l}</th>${SERVICES.map((s) => `<td>${esc(s[k])}</td>`).join('')}</tr>`).join('')}
      <tr><th scope="row" class="mono">Core capabilities</th>${SERVICES.map((s) => `<td><ul>${s.capabilities.slice(0, 3).map((c) => `<li>${c.h}</li>`).join('')}</ul></td>`).join('')}</tr></tbody>
    </table>
  </div>
</section>
<section class="wrap tiers-sec" aria-labelledby="tr-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Engagement')}<h2 id="tr-h" class="sec-h" data-split>Response tiers.</h2></div><p class="sec-lede" data-reveal>Every client relationship begins as an assignment. Many become programs. Some become retained partnerships spanning a whole household.</p></div>
  <div class="tiers">${TIERS.map((t) => `<article class="tier tier--${t.tone}" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span>${t.tone === 'sand' ? lattice('lattice tier__lattice', 6, 1) : ''}${t.tone === 'slate' ? markLine('mark-line tier__outline') : ''}${t.tone === 'obsidian' ? mark('mark tier__mark') : ''}<h3>${t.name}</h3><p>${t.p}</p><ul>${t.pts.map((p) => `<li>${p}</li>`).join('')}</ul></article>`).join('')}</div>
</section>
${cta({ h: 'Not sure which discipline you need?' , p: 'Most clients are not. Describe the situation and a senior lead will recommend the smallest effective program.' })}`;
  return T.layout({ path: 'services/', title: 'Private Security Services: Protection, Estates, Transit & Intelligence | Vespera', desc: 'Compare Vespera\'s five protective disciplines: executive protection, estate security, secure transit, private event protection, and threat intelligence and advisory.', body, active: 'services/', jsonld: [crumbLd([['Home', ''], ['Services', 'services/']]), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: SERVICES.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: SITE.url + 'services/' + s.slug + '/' })) }] });
});

// ================= SERVICE DETAIL
for (const s of SERVICES) {
  out('services/' + s.slug + '/', () => {
    const a = art(s.article);
    const others = SERVICES.filter((x) => x.slug !== s.slug);
    const tones = ['obs', 'obs', 'sand', 'obs', 'slate', 'obs'];
    const body = `
<section class="shero wrap">
  ${crumbs([['Home', ''], ['Services', 'services/'], [s.short, 'services/' + s.slug + '/']])}
  <div class="shero__grid">
    <div class="shero__copy">
      ${eyebrow(s.catLabel + ' discipline')}
      <h1 class="shero__h" data-split>${s.name}</h1>
      <p class="shero__lede" data-reveal>${s.hero}</p>
      <div class="shero__ctas" data-reveal>${btn(href('contact/?d=' + s.slug), 'Request a briefing')}${btn('#capabilities', 'Capabilities', 'ghost')}</div>
    </div>
    <div class="shero__media" data-reveal data-sheen data-tilt>${pic(s.img, ALT[s.img], { eager: true, sizes: '(min-width: 1024px) 50vw, 100vw' })}<span class="sheen" aria-hidden="true"></span><span class="shero__tag mono">${s.tags.join(' · ')}</span></div>
  </div>
  <dl class="specs" data-reveal>
    ${[['Lead time', s.leadTime], ['Team', s.team], ['Coverage', s.coverage], ['Best for', s.bestFor]].map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${v}</dd></div>`).join('')}
  </dl>
</section>
<section class="wrap sintro" aria-labelledby="ov-h">
  <h2 id="ov-h" class="mono eyebrow"><span class="eyebrow__dash" aria-hidden="true"></span>Overview</h2>
  <p class="sintro__p" data-split>${s.intro}</p>
</section>
<section class="wrap" id="capabilities" aria-labelledby="cap-h">
  <div class="sec-head">${eyebrow('Capabilities')}<h2 id="cap-h" class="sec-h" data-split>What the discipline includes.</h2></div>
  <div class="caps">${s.capabilities.map((c, i) => `<article class="cap cap--${tones[i]}" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span>${tones[i] === 'sand' ? lattice('lattice cap__lattice', 6, 1) : tones[i] === 'slate' ? markLine('mark-line cap__outline') : mark('mark cap__mark')}<h3>${c.h}</h3><p>${c.p}</p></article>`).join('')}</div>
</section>
<section class="wrap proto" aria-labelledby="pr-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Protocol')}<h2 id="pr-h" class="sec-h" data-split>How an engagement unfolds.</h2></div><p class="sec-lede" data-reveal>Every step is documented, every handover named, and every operation closes with a written debrief.</p></div>
  <ol class="timeline">${s.timeline.map((t) => `<li class="tl" data-reveal><p class="tl__t mono">${t.t}</p><span class="tl__dot" aria-hidden="true"></span><h3>${t.h}</h3><p>${t.p}</p></li>`).join('')}</ol>
</section>
<section class="wrap posture" aria-labelledby="po-h" data-posture>
  <div class="posture__card" data-reveal data-sheen>
    <span class="sheen" aria-hidden="true"></span>
    <div class="posture__copy">
      ${eyebrow('Posture')}
      <h2 id="po-h" class="sec-h">Set to the threat, and to the way you live.</h2>
      <div class="seg seg--lg" role="tablist" aria-label="Posture options">${s.postures.map((p, i) => `<button type="button" role="tab" class="seg__btn${i === 0 ? ' is-on' : ''}" aria-selected="${i === 0}" aria-controls="po-${i}" id="po-t${i}" data-i="${i}">${p.k}</button>`).join('')}</div>
      <div class="posture__panels">${s.postures.map((p, i) => `<div class="posture__panel${i === 0 ? ' is-on' : ''}" role="tabpanel" id="po-${i}" aria-labelledby="po-t${i}"${i ? ' hidden' : ''}><p>${p.p}</p></div>`).join('')}</div>
    </div>
    <div class="dial" aria-hidden="true" data-dial>
      <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="88" class="dial__ring"/><circle cx="100" cy="100" r="88" class="dial__arc" pathLength="100"/>${Array.from({ length: 36 }, (_, i) => `<line x1="100" y1="6" x2="100" y2="${i % 3 ? 12 : 18}" transform="rotate(${i * 10} 100 100)"/>`).join('')}</svg>
      <div class="dial__core">${mark('mark')}</div>
      <p class="dial__label mono" data-dial-label>${s.postures[0].k}</p>
    </div>
  </div>
</section>
<section class="wrap faq-sec" aria-labelledby="sfaq-h">
  <div class="faq-sec__head">${eyebrow('Questions')}<h2 id="sfaq-h" class="sec-h" data-split>${s.short}, answered.</h2></div>
  ${faq(s.faq, 'sf')}
</section>
<section class="wrap related" aria-labelledby="rel-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Further reading')}<h2 id="rel-h" class="sec-h">From the briefing desk.</h2></div></div>
  <div class="related__grid">
    ${articleCard(a, { big: true })}
    <div class="related__others" data-reveal>
      <p class="mono">Other disciplines</p>
      <ul>${others.map((o) => `<li><a href="${href('services/' + o.slug + '/')}"><span>${o.short}</span>${arrow()}</a></li>`).join('')}</ul>
    </div>
  </div>
</section>
${cta({ h: `Discuss ${s.short.toLowerCase()} in confidence.` })}`;
    const ld = { '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.short, description: s.desc, provider: { '@type': 'Organization', name: SITE.name, url: SITE.url }, areaServed: 'Worldwide', url: SITE.url + 'services/' + s.slug + '/' };
    return T.layout({ path: 'services/' + s.slug + '/', title: s.title, desc: s.desc, body, active: 'services/', jsonld: [ld, faqLd(s.faq), crumbLd([['Home', ''], ['Services', 'services/'], [s.name, 'services/' + s.slug + '/']])] });
  });
}

// ================= METHODOLOGY
out('methodology/', () => {
  const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Methodology', 'methodology/']])}
  <div class="phero__grid">
    <div>${eyebrow('Methodology & standards')}<h1 class="phero__h" data-split="chars">The Vespera doctrine</h1></div>
    <p class="phero__lede" data-reveal>Four disciplines of thought run through every engagement. They are how a calm day is engineered, and how a difficult one is contained.</p>
  </div>
</section>
<section class="wrap band" data-reveal>${pic('about-monolith', ALT['about-monolith'], { sizes: '100vw' })}<span class="band__cap mono">Intelligence · Advance · Presence · Continuity</span></section>
<section class="wrap phases" aria-labelledby="ph-h" data-tabs>
  <div class="sec-head">${eyebrow('Operational doctrine')}<h2 id="ph-h" class="sec-h" data-split>Four phases, one continuous loop.</h2></div>
  <div class="phases__wrap">
    <div class="phases__tabs" role="tablist" aria-label="Doctrine phases">${PHASES.map((p, i) => `<button type="button" role="tab" class="phase-tab${i === 0 ? ' is-on' : ''}" id="pt-${p.k}" aria-selected="${i === 0}" aria-controls="pp-${p.k}" tabindex="${i ? -1 : 0}"><span class="phase-tab__g">${GLYPH[p.k]}</span><span><strong>${p.name}</strong><em>${p.short}</em></span></button>`).join('')}</div>
    <div class="phases__panels">${PHASES.map((p, i) => `<div class="phase-panel${i === 0 ? ' is-on' : ''}" role="tabpanel" id="pp-${p.k}" aria-labelledby="pt-${p.k}"${i ? ' hidden' : ''} data-sheen><span class="sheen" aria-hidden="true"></span><span class="phase-panel__glyph">${GLYPH[p.k]}</span><h3>${p.name}</h3><p class="phase-panel__lede">${p.short}</p><p>${p.body}</p><ul>${p.pts.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
  </div>
</section>
<section class="wrap bench" aria-labelledby="be-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('People')}<h2 id="be-h" class="sec-h" data-split>Vetting and training benchmarks.</h2></div><p class="sec-lede" data-reveal>The standards every Vespera officer meets before their first assignment, and keeps meeting after it.</p></div>
  <div class="bench__grid">
    ${[['Selection', 'Backgrounds in government protective details, specialist policing, military and intelligence work, assessed for judgment, temperament and discretion through structured interviews and scenario exercises.'], ['Vetting', 'Identity, right-to-work, criminal record and service history verification within local law, independent references and periodic re-vetting throughout employment.'], ['Medical', 'Advanced pre-hospital trauma and cardiac care certification for at least one officer on every detail, refreshed on a fixed cycle.'], ['Driving', 'Defensive and evasive driving qualification for protective drivers, with annual requalification and vehicle-specific training for armored platforms.'], ['De-escalation', 'Conflict de-escalation, fixated-person awareness and legal powers training, because most incidents are best resolved without force.'], ['Supervision', 'Field supervision by senior leads, written debriefs after every operation and confidential channels for clients to raise concerns.']].map(([h, p]) => `<article class="bench__item" data-reveal><h3>${h}</h3><p>${p}</p></article>`).join('')}
  </div>
</section>
<section class="wrap goc" aria-labelledby="goc-h">
  <div class="sec-head">${eyebrow('Global Operations Center')}<h2 id="goc-h" class="sec-h" data-split>The room that never sleeps.</h2></div>
  <div class="goc__grid">
    <article class="tile tile--obs goc__main" data-reveal data-sheen><div class="tile__bg">${pic('hero-fluted-wave', '', { sizes: '(min-width: 1024px) 58vw, 100vw' })}</div><span class="sheen" aria-hidden="true"></span><p class="mono tile__status"><span class="pulse"></span>Watch floor · 24/7</p><div class="tile__bottom"><h3 class="tile__h">Every movement, tracked against the plan.</h3><p class="goc__p">Duty officers follow live operations, monitor news and weather along routes and coordinate the response when anything changes.</p></div></article>
    <article class="tile tile--sand goc__a" data-reveal><p class="mono">Intelligence cell</p><h3 class="tile__h tile__h--ink">Analysts who brief the field, not just the file.</h3>${lattice('lattice tile__lattice', 9, 1)}</article>
    <article class="tile tile--slate goc__b" data-reveal>${markLine('mark-line tile__outline')}<p class="mono">Partner network</p><h3 class="tile__h tile__h--peach">Vetted in-country partners, held to our standard.</h3></article>
    <article class="tile tile--red goc__c" data-reveal><div class="tile__bg">${pic('bento-crimson-response', '', { sizes: '(min-width: 1024px) 34vw, 100vw' })}</div><p class="mono tile__live"><span class="pulse pulse--light"></span>Medical line</p><div class="tile__redbody"><h3 class="tile__h">Clinical advice on call.</h3><p>Remote medical support for detail medics and access to evacuation partners worldwide.</p></div></article>
  </div>
</section>
<section class="wrap standards" aria-labelledby="st-h">
  <div class="standards__card" data-reveal>
    ${eyebrow('Standards')}
    <h2 id="st-h" class="sec-h">Frameworks we operate to.</h2>
    <ul class="standards__list">
      <li><strong>Licensing</strong><span>Company and officer licensing in every jurisdiction we operate, through licensed partners where local law requires.</span></li>
      <li><strong>Private security management</strong><span>Management systems aligned with ISO 18788 and recognized industry guidance for private security operations.</span></li>
      <li><strong>Human rights</strong><span>Conduct aligned with the International Code of Conduct for Private Security Service Providers.</span></li>
      <li><strong>Information security</strong><span>Need-to-know access, codenames for principals and encrypted channels for all client information.</span></li>
      <li><strong>Insurance</strong><span>Liability, professional indemnity and employer cover, with certificates available to clients on request.</span></li>
    </ul>
  </div>
</section>
${cta()}`;
  return T.layout({ path: 'methodology/', title: 'Methodology & Standards: The Vespera Protective Doctrine', desc: 'How Vespera plans protection: a four-phase doctrine of intelligence, advance, presence and continuity, officer vetting and training benchmarks, and a 24/7 Global Operations Center.', body, active: 'methodology/', jsonld: [crumbLd([['Home', ''], ['Methodology', 'methodology/']])] });
});

// ================= SECTORS
out('sectors/', () => {
  const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Sectors', 'sectors/']])}
  <div class="phero__grid">
    <div>${eyebrow('Sectors & principals')}<h1 class="phero__h" data-split="chars">Who we protect</h1></div>
    <p class="phero__lede" data-reveal>Every principal carries a different kind of visibility. Programs are shaped around the person, the family or the institution, never around a standard package.</p>
  </div>
</section>
<section class="wrap" aria-label="Sectors">
  <div class="sectors">
    ${SECTORS.map((x, i) => `<article class="sector sector--${x.tone} sector--${x.k}" data-reveal data-sheen data-tilt>
      <span class="sheen" aria-hidden="true"></span>
      ${x.tone === 'crimson' ? `<div class="tile__bg">${pic('bento-crimson-response', '', { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div>` : ''}
      ${x.tone === 'obsidian' ? `<div class="tile__bg">${pic('bento-fluted-prism', '', { sizes: '(min-width: 1024px) 60vw, 100vw' })}</div>` : ''}
      ${x.tone === 'sand' ? lattice('lattice sector__lattice', 9, 2) : ''}
      ${x.tone === 'slate' ? markLine('mark-line sector__outline') : ''}
      ${x.tone === 'cobalt' ? `<div class="tile__bg sector__cobalt">${pic('footer-horizon', '', { sizes: '(min-width: 1024px) 60vw, 100vw' })}</div>` : ''}
      <div class="sector__body">
        <h2 class="sector__h">${x.name}</h2>
        <p>${x.p}</p>
        <ul class="mono">${x.pts.map((p) => `<li>${p}</li>`).join('')}</ul>
      </div>
    </article>`).join('')}
  </div>
</section>
<section class="wrap adapt" aria-labelledby="ad-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Adaptation')}<h2 id="ad-h" class="sec-h" data-split>How programs bend to the principal.</h2></div><p class="sec-lede" data-reveal>The same doctrine, expressed differently for every life it protects.</p></div>
  <div class="adapt__grid">
    ${[['Visibility', 'We calibrate how seen the detail should be: invisible for a family weekend, measured for a board meeting, overt during a period of elevated threat.'], ['Rhythm', 'Officers learn routines, preferences and the people who matter, so protection fits the day instead of interrupting it.'], ['Governance', 'For corporate clients, reporting is built for audit and risk committees. For families, it is built for the family office and its advisors.'], ['Continuity', 'Consistent officers across years, documented knowledge and planned handovers when people change.']].map(([h, p]) => `<article class="bench__item" data-reveal><h3>${h}</h3><p>${p}</p></article>`).join('')}
  </div>
</section>
${cta()}`;
  return T.layout({ path: 'sectors/', title: 'Sectors We Protect: Families, Executives, Dignitaries & Collections | Vespera', desc: 'Private security programs for family offices and UHNW families, corporate executives and boards, visiting dignitaries, art and luxury collections, and public figures.', body, active: 'sectors/', jsonld: [crumbLd([['Home', ''], ['Sectors', 'sectors/']])] });
});

// ================= BRIEFINGS HUB
out('briefings/', () => {
  const [first, ...rest] = ARTICLES;
  const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Briefings', 'briefings/']])}
  <div class="phero__grid">
    <div>${eyebrow('Briefings & research')}<h1 class="phero__h" data-split="chars">The briefing desk</h1></div>
    <p class="phero__lede" data-reveal>Long-form guidance on protection, security architecture, intelligence, transit and advisory, written by practitioners for principals, family offices and security leaders.</p>
  </div>
</section>
<section class="wrap" aria-label="Briefings">
  <div class="pills" role="group" aria-label="Filter briefings by category" data-filter="br">
    <button type="button" class="pill is-on" data-f="all" aria-pressed="true">All</button>
    ${BRIEF_CATS.map((c) => `<button type="button" class="pill" data-f="${c}" aria-pressed="false">${c}</button>`).join('')}
  </div>
  <div class="brief-hub" data-filter-items="br">
    ${articleCard(first, { big: true })}
    ${rest.map((a) => articleCard(a)).join('')}
  </div>
  <p class="svc-empty mono" data-filter-empty="br" hidden>New briefings in this category are in preparation. In the meantime, the Operations Desk can share relevant guidance privately.</p>
</section>
${cta({ h: 'Have a question the briefings do not answer?' })}`;
  return T.layout({ path: 'briefings/', title: 'Security Briefings & Research Journal | Vespera Protective', desc: 'In-depth briefings on executive protection, estate security architecture, OSINT exposure, secure international travel, event security and choosing a private security firm.', body, active: 'briefings/', jsonld: [crumbLd([['Home', ''], ['Briefings', 'briefings/']]), { '@context': 'https://schema.org', '@type': 'Blog', name: 'Vespera Briefings', url: SITE.url + 'briefings/', blogPost: ARTICLES.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: SITE.url + 'briefings/' + a.slug + '/', datePublished: a.date })) }] });
});

// ================= ARTICLES
for (const a of ARTICLES) {
  out('briefings/' + a.slug + '/', () => {
    const { html, toc } = md(a.body);
    const s = svc(a.service);
    const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 2);
    const body = `
<div class="progress" aria-hidden="true"><i data-progress></i></div>
<article class="post">
  <header class="post__head wrap">
    ${crumbs([['Home', ''], ['Briefings', 'briefings/'], [a.cat, 'briefings/']])}
    <p class="mono post__meta"><span>${a.cat}</span><span>${fmtDate(a.date)}</span><span>${a.read} min read</span></p>
    <h1 class="post__h" data-split>${esc(a.title)}</h1>
    <p class="post__lede" data-reveal>${esc(a.desc)}</p>
    <p class="mono post__by" data-reveal>${T.mark('mark')}<span>Vespera Advisory Desk</span></p>
  </header>
  <div class="post__hero wrap" data-reveal>${pic(a.img, ALT[a.img], { eager: true, sizes: '(min-width: 1280px) 1200px, 100vw' })}</div>
  <div class="post__grid wrap">
    <aside class="post__aside">
      <nav class="toc" aria-label="Table of contents"><p class="mono">Contents</p><ol>${toc.map(([t, id]) => `<li><a href="#${id}" data-toc="${id}">${esc(t)}</a></li>`).join('')}</ol></nav>
    </aside>
    <div class="post__body">
      <div class="takeaways" data-reveal><p class="mono">${T.mark('mark')}Key takeaways</p><ul>${a.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <div class="prose">${html}</div>
      <div class="post__svc" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span>${lattice('lattice post__lattice', 6, 1)}<p class="mono">Related discipline</p><h2>${s.name}</h2><p>${s.line}</p><div class="post__svc-actions">${btn(href('services/' + s.slug + '/'), 'Explore the discipline', 'ink')}<a class="link-arrow link-arrow--ink" href="${href('contact/?d=' + s.slug)}">${roll('Request a briefing')}${arrow()}</a></div></div>
    </div>
  </div>
</article>
<section class="wrap brief-sec" aria-labelledby="more-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Continue reading')}<h2 id="more-h" class="sec-h">More briefings.</h2></div><a class="link-arrow" href="${href('briefings/')}">${roll('All briefings')}${arrow()}</a></div>
  <div class="brief-grid brief-grid--2">${more.map((m) => articleCard(m)).join('')}</div>
</section>`;
    const ld = { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.desc, image: SITE.url + 'assets/img/' + a.img + '.jpg', datePublished: a.date, dateModified: a.date, wordCount: a.words, articleSection: a.cat, author: { '@type': 'Organization', name: 'Vespera Advisory Desk', url: SITE.url }, publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: SITE.url + 'assets/img/vespera-mark.png' } }, mainEntityOfPage: SITE.url + 'briefings/' + a.slug + '/' };
    return T.layout({ path: 'briefings/' + a.slug + '/', title: a.seo, desc: a.desc, body, ogType: 'article', active: 'briefings/', bodyClass: 'pg-post', jsonld: [ld, crumbLd([['Home', ''], ['Briefings', 'briefings/'], [a.title, 'briefings/' + a.slug + '/']])] });
  });
}

// ================= ABOUT
out('about/', () => {
  const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['About', 'about/']])}
  <div class="phero__grid">
    <div>${eyebrow('About Vespera')}<h1 class="phero__h" data-split="chars">An ethos of restraint</h1></div>
    <p class="phero__lede" data-reveal>Vespera takes its name from the evening hour, when light softens and the city changes shape. It is the hour our work is built for: unhurried, watchful and quietly in control.</p>
  </div>
</section>
<section class="wrap band" data-reveal>${pic('about-monolith', ALT['about-monolith'], { sizes: '100vw' })}<span class="band__cap mono">Permanence · Precision · Discretion</span></section>
<section class="wrap ethos" aria-labelledby="et-h">
  <h2 id="et-h" class="sintro__p" data-split>We believe the best protection is designed, not displayed. It should leave a principal\'s life larger, never smaller.</h2>
  <div class="ethos__grid">
    ${[['Restraint', 'We recommend the smallest effective program, and we say so when a client needs less than they asked for.'], ['Precision', 'Every route driven, every venue walked, every handover named. Calm is engineered in advance.'], ['Discretion', 'Codenames, need-to-know and silence about who we serve. Our clients are never our marketing.']].map(([h, p]) => `<article class="phase-card" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span>${mark('mark phase-card__mark')}<h3>${h}</h3><p>${p}</p></article>`).join('')}
  </div>
</section>
<section class="wrap hubs" aria-labelledby="hb-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Regional hubs')}<h2 id="hb-h" class="sec-h" data-split>Three cities. One desk.</h2></div><p class="sec-lede" data-reveal>Our hubs hold senior leads, analysts and duty officers, and coordinate vetted partners across every region we operate in.</p></div>
  <div class="hubs__grid">${SITE.hubs.map((h, i) => `<article class="hub hub--${['obs', 'slate', 'sand'][i]}" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span>${i === 2 ? lattice('lattice hub__lattice', 7, 1) : ''}${i === 1 ? markLine('mark-line hub__outline') : ''}<p class="mono hub__coord">${h.coord}</p><h3>${h.city}</h3><p class="hub__time" data-clock="${h.tz}">--:--</p><p>${h.role}</p><p class="mono hub__addr">${h.addr}</p></article>`).join('')}</div>
</section>
<section class="wrap bench" aria-labelledby="ld-h">
  <div class="sec-head sec-head--split"><div>${eyebrow('Leadership discipline')}<h2 id="ld-h" class="sec-h" data-split>How our leads lead.</h2></div><p class="sec-lede" data-reveal>Principles every program lead is held to, from first briefing to final debrief.</p></div>
  <div class="bench__grid">${[['Listen first', 'No recommendation before we understand the person, the family and the life being protected.'], ['Own the outcome', 'One named lead for every program, accountable for every officer and partner within it.'], ['Tell the truth', 'Plain language about risk, cost and limitations, including when the honest answer is to do less.'], ['Rehearse the worst', 'Plans are practiced, not filed. Every crisis plan is walked through with the people who will use it.'], ['Debrief everything', 'Written debriefs after every operation, so programs get quieter and better over time.'], ['Protect the relationship', 'Discretion is part of the service: about our clients, their homes, their families and their plans.']].map(([h, p]) => `<article class="bench__item" data-reveal><h3>${h}</h3><p>${p}</p></article>`).join('')}</div>
</section>
<section class="wrap standards" aria-labelledby="cm-h">
  <div class="standards__card" data-reveal>
    ${eyebrow('Compliance')}
    <h2 id="cm-h" class="sec-h">Standards and accountability.</h2>
    <ul class="standards__list">
      <li><strong>Licensed operations</strong><span>Company and officer licensing in each jurisdiction, with licensed local partners where law requires.</span></li>
      <li><strong>Lawful conduct</strong><span>Armed protection only where lawful and appropriate, by authorized officers, under written rules.</span></li>
      <li><strong>Confidentiality</strong><span>NDAs for every engagement and every employee, and encrypted handling of client information.</span></li>
      <li><strong>Independent review</strong><span>Periodic external review of policies, training records and incident handling.</span></li>
    </ul>
  </div>
</section>
${cta()}`;
  return T.layout({ path: 'about/', title: 'About Vespera Protective: Discreet Private Security Firm', desc: 'Vespera Protective is a discreet private security firm with hubs in New York, London and Geneva, built on restraint, precision and discretion.', body, active: 'about/', jsonld: [crumbLd([['Home', ''], ['About', 'about/']])] });
});

// ================= CONTACT
out('contact/', () => {
  const body = `
<section class="phero wrap phero--contact">
  ${crumbs([['Home', ''], ['Contact', 'contact/']])}
  <div class="phero__grid">
    <div>${eyebrow('Private briefing')}<h1 class="phero__h" data-split="chars">Request a private briefing</h1></div>
    <p class="phero__lede" data-reveal>Tell us as much or as little as you are comfortable with. A senior lead will respond through the channel you choose, under NDA and without obligation.</p>
  </div>
</section>
<section class="wrap intake" aria-label="Briefing request">
  <div class="intake__grid">
    <form class="form" data-intake novalidate>
      <div class="form__progress" aria-hidden="true"><i data-form-bar></i></div>
      <ol class="form__steps mono" aria-label="Form steps">${['Disciplines', 'Context', 'Channel', 'Review'].map((t, i) => `<li class="${i === 0 ? 'is-on' : ''}" data-step-label>${t}</li>`).join('')}</ol>

      <fieldset class="step is-on" data-step>
        <legend class="step__h">Which disciplines are you considering?</legend>
        <p class="step__p">Select any that apply. If you are unsure, choose advisory and we will help shape it.</p>
        <div class="chips">${SERVICES.map((s) => `<label class="chip"><input type="checkbox" name="disciplines" value="${s.slug}" data-label="${esc(s.short)}"><span>${mark('mark chip__mark')}${s.short}</span></label>`).join('')}</div>
        <p class="form__err" data-err hidden>Choose at least one discipline to continue.</p>
      </fieldset>

      <fieldset class="step" data-step hidden>
        <legend class="step__h">Tell us about the context.</legend>
        <div class="fields">
          <label class="field"><span class="mono">Principal profile</span><select name="profile"><option>Executive or founder</option><option>Family or family office</option><option>Public figure</option><option>Delegation or dignitary</option><option>Institution or venue</option></select></label>
          <label class="field"><span class="mono">Timeframe</span><select name="timeframe"><option>Within 24 hours</option><option>This week</option><option>This month</option><option>Ongoing program</option></select></label>
          <label class="field field--full"><span class="mono">Locations involved</span><input name="locations" type="text" placeholder="e.g. New York, Geneva, Mykonos" autocomplete="off"></label>
          <fieldset class="field field--full"><legend class="mono">Current risk context</legend><div class="seg seg--wrap">${['Routine and preventive', 'Elevated attention', 'Specific concern', 'Active incident'].map((t, i) => `<label class="seg__opt"><input type="radio" name="risk" value="${t}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div></fieldset>
          <label class="field field--full"><span class="mono">Anything else (optional)</span><textarea name="notes" rows="4" placeholder="Share only what you are comfortable sharing."></textarea></label>
        </div>
      </fieldset>

      <fieldset class="step" data-step hidden>
        <legend class="step__h">How should we reach you?</legend>
        <div class="fields">
          <fieldset class="field field--full"><legend class="mono">Preferred channel</legend><div class="seg seg--wrap">${['Encrypted call', 'Signal', 'Email', 'In person'].map((t, i) => `<label class="seg__opt"><input type="radio" name="channel" value="${t}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div></fieldset>
          <label class="field"><span class="mono">Name or initials</span><input name="name" type="text" autocomplete="name" required></label>
          <label class="field"><span class="mono">Phone or email</span><input name="contact" type="text" autocomplete="email" required></label>
          <label class="field field--full field--check"><input type="checkbox" name="nda" checked><span>Please send an NDA before our first conversation.</span></label>
        </div>
        <p class="form__err" data-err hidden>Add a name or initials and a way to reach you.</p>
      </fieldset>

      <fieldset class="step" data-step hidden>
        <legend class="step__h">Review your request.</legend>
        <dl class="review" data-review></dl>
      </fieldset>

      <div class="form__nav">
        <button type="button" class="btn btn--ghost" data-prev hidden><span class="btn__fill" aria-hidden="true"></span>${roll('Back')}</button>
        <button type="button" class="btn btn--sand" data-next><span class="btn__fill" aria-hidden="true"></span><span class="roll" data-t="Continue"><span data-next-label>Continue</span></span><span class="btn__arr" aria-hidden="true">${arrow()}${arrow()}</span></button>
      </div>
      <p class="form__note mono">Demonstration form · nothing is transmitted from this page</p>
    </form>

    <div class="confirm" data-confirm hidden tabindex="-1">
      <div class="confirm__card" data-sheen><span class="sheen" aria-hidden="true"></span>
        ${mark('mark confirm__mark')}
        <p class="mono">Request prepared · Ref <span data-ref></span></p>
        <h2 class="confirm__h">Thank you. Your briefing request is ready.</h2>
        <p>A senior lead would respond by <strong data-confirm-channel></strong> within the hour during an active incident, and the same business day otherwise.</p>
        <dl class="review review--light" data-confirm-review></dl>
        <div class="confirm__actions">${btn(href(''), 'Return home', 'ink')}<button type="button" class="link-arrow link-arrow--ink" data-restart>${roll('Start over')}${arrow()}</button></div>
      </div>
    </div>

    <aside class="intake__aside">
      <div class="desk-card" data-reveal data-sheen><span class="sheen" aria-hidden="true"></span>
        <p class="mono"><span class="pulse"></span>Operations Desk · 24/7</p>
        <a class="desk-card__phone" href="tel:${SITE.phoneHref}">${SITE.phone}</a>
        <a class="desk-card__mail" href="mailto:${SITE.email}">${SITE.email}</a>
        <p>For an active incident, call. A senior duty officer answers in every time zone.</p>
      </div>
      <ul class="hub-mini" data-reveal>${SITE.hubs.map((h) => `<li><span>${h.city}</span><span class="mono" data-clock="${h.tz}">--:--</span></li>`).join('')}</ul>
      <div class="assure" data-reveal><p class="mono">Our commitments</p><ul><li>Every conversation under NDA</li><li>Codenames from the first call</li><li>No obligation, no pressure</li></ul></div>
    </aside>
  </div>
</section>`;
  return T.layout({ path: 'contact/', title: 'Request a Private Security Briefing | Vespera Protective', desc: 'Request a confidential private security briefing with Vespera. Choose disciplines, share context and select a discreet contact channel. Operations Desk available 24/7.', body, active: 'contact/', bodyClass: 'pg-contact', jsonld: [crumbLd([['Home', ''], ['Contact', 'contact/']])] });
});

// ================= PRIVACY
out('privacy/', () => {
  const secs = [
    ['Our approach', 'Discretion is central to our work. This policy explains what information Vespera Protective collects, why we collect it, how it is protected and the choices available to you. It applies to this website and to enquiries made through it.'],
    ['Information we collect', 'When you request a briefing, we collect only what you choose to share: typically a name or initials, a contact method, the disciplines you are interested in and the context you describe. This website does not use advertising trackers, and this demonstration form does not transmit data.'],
    ['How we use information', 'We use enquiry information solely to respond to you, to prepare for a conversation and, if you engage us, to plan and deliver protective services. We never sell information and never use client identities in marketing.'],
    ['Confidentiality and codenames', 'From the first conversation, principals are referred to internally by codename. Access to client information is restricted to the people who need it to protect you, all of whom are bound by confidentiality agreements.'],
    ['Security of information', 'Client information is stored in encrypted systems with role-based access, multi-factor authentication and audit logging. Itineraries and access details are shared only through secure channels.'],
    ['Retention', 'We keep enquiry information only as long as needed to respond and, for clients, for the duration of the engagement and any period required by law. You may ask us to delete your information at any time, subject to legal obligations.'],
    ['Your rights', 'Depending on where you live, you may have rights to access, correct, delete or restrict the use of your personal information, and to object to certain processing. Contact us to exercise any of these rights.'],
    ['Contact', `Questions about this policy can be sent to ${SITE.email}. We will respond discreetly and promptly.`],
  ];
  const body = `
<section class="phero wrap">
  ${crumbs([['Home', ''], ['Privacy', 'privacy/']])}
  <div class="phero__grid"><div>${eyebrow('Policy')}<h1 class="phero__h" data-split="chars">Privacy &amp; discretion</h1></div><p class="phero__lede" data-reveal>Last updated November 2026. How we handle the information you trust us with.</p></div>
</section>
<section class="wrap legal">
  <nav class="legal__toc mono" aria-label="Policy sections"><ol>${secs.map(([h]) => `<li><a href="#${T.slugify(h)}">${h}</a></li>`).join('')}</ol></nav>
  <div class="prose legal__body">${secs.map(([h, p]) => `<h2 id="${T.slugify(h)}">${h}</h2><p>${p}</p>`).join('')}</div>
</section>`;
  return T.layout({ path: 'privacy/', title: 'Privacy & Discretion Policy | Vespera Protective', desc: 'How Vespera Protective collects, protects and uses information, including confidentiality practices, codenames, retention and your privacy rights.', body, jsonld: [crumbLd([['Home', ''], ['Privacy', 'privacy/']])] });
});

// ================= 404
out('404.html', () => {
  T.setRoot('/vespera-protective/');
  const body = `
<section class="nf" data-sheen data-hero>
  <div class="hero__media">${pic('hero-fluted-wave', '', { eager: true })}<span class="hero__ribs" aria-hidden="true"></span><span class="sheen sheen--hero" aria-hidden="true"></span></div>
  <div class="nf__content wrap">
    ${eyebrow('Off route')}
    <h1 class="nf__h" data-split="chars">This path was never on the plan.</h1>
    <p data-reveal>The page you were looking for has moved or does not exist. Every good advance has an alternate route; here are yours.</p>
    <div class="hero__ctas" data-reveal>${btn(href(''), 'Return home')}${btn(href('services/'), 'Our disciplines', 'ghost')}${btn(href('contact/'), 'Contact the desk', 'ghost')}</div>
  </div>
</section>`;
  return T.layout({ path: '404.html', title: 'Page not found | Vespera Protective', desc: 'This page could not be found. Return to Vespera Protective.', body, bodyClass: 'pg-404' });
});

// ---- sitemap & robots
const today = '2026-11-24';
writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE.url}${p}</loc><lastmod>${today}</lastmod><priority>${p === '' ? '1.0' : p.split('/').length > 2 ? '0.7' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}sitemap.xml\n`);
writeFileSync(join(ROOT, '.nojekyll'), '');
console.log('built', pages.length + 1, 'pages;', ARTICLES.map((a) => a.slug + ':' + a.words).join(', '));
