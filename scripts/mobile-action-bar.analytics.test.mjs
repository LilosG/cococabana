import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const venue = JSON.parse(readFileSync(new URL('../src/content/data/venue.json', import.meta.url), 'utf8'));
const analytics = readFileSync(new URL('../src/components/Analytics.astro', import.meta.url), 'utf8');
const inlineScript = analytics.match(/<script is:inline define:vars=\{\{ GA_ID \}\}>([\s\S]*?)<\/script>/)?.[1];
assert.ok(inlineScript, 'shared analytics script exists');

const GA_ID = 'G-LOCALTEST00';

class Link {
  constructor(href, dataset) {
    this.href = href;
    this.dataset = dataset;
  }

  closest(selector) {
    if (selector === 'a[href^="tel:"]') return this.href.startsWith('tel:') ? this : null;
    if (selector === 'a[href*="toasttab.com"]') return this.href.includes('toasttab.com') ? this : null;
    return null;
  }
}

function harness({ initialOptOut = false, gpc = false } = {}) {
  const values = new Map();
  if (initialOptOut) values.set('lilos-privacy-v1', JSON.stringify({ optOut: true, ts: 1 }));
  const localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const navigator = { globalPrivacyControl: gpc };
  const window = { location: { pathname: '/menu/' } };
  let clickListener;
  const document = {
    addEventListener: (name, listener) => { if (name === 'click') clickListener = listener; },
    createElement: () => ({}),
    head: { appendChild: () => {} },
  };

  runInNewContext(`const GA_ID = '${GA_ID}';\n${inlineScript}`, {
    window, document, localStorage, navigator, Element: Link, URL, Date, encodeURIComponent,
  });

  function click(href, dataset = { ctaLocation: 'mobile_bottom_bar' }) {
    let prevented = false;
    clickListener?.({ target: new Link(href, dataset), preventDefault: () => { prevented = true; } });
    return prevented;
  }

  const events = () => Array.from(window.dataLayer ?? [])
    .filter((entry) => entry[0] === 'event')
    .map((entry) => ({ name: entry[1], parameters: JSON.parse(JSON.stringify(entry[2])) }));

  return { window, navigator, click, events };
}

test('permitted reserve and phone activations each queue one business event with placement', () => {
  const site = harness();
  assert.equal(site.click(venue.reservationsUrl), false);
  assert.equal(site.click(venue.phoneHref, { ctaLocation: 'mobile_bottom_bar', analyticsLocation: 'mobile_bottom_bar' }), false);
  assert.deepEqual(site.events(), [
    { name: 'reservation_click', parameters: {
      link_url: venue.reservationsUrl,
      page_path: '/menu/',
      cta_location: 'mobile_bottom_bar',
    } },
    { name: 'phone_click', parameters: {
      link_url: venue.phoneHref,
      page_path: '/menu/',
      link_location: 'mobile_bottom_bar',
      cta_location: 'mobile_bottom_bar',
    } },
  ]);
});

test('initial stored opt-out and opt-out after initialization suppress business events', () => {
  const initiallyOptedOut = harness({ initialOptOut: true });
  assert.equal(initiallyOptedOut.click(venue.reservationsUrl), false);
  assert.equal(initiallyOptedOut.click(venue.phoneHref), false);
  assert.deepEqual(initiallyOptedOut.events(), []);

  const optedOutLater = harness();
  optedOutLater.window.lilosPrivacy.optOut();
  assert.equal(optedOutLater.click(venue.reservationsUrl), false);
  assert.equal(optedOutLater.click(venue.phoneHref), false);
  assert.deepEqual(optedOutLater.events(), []);
});

test('GPC and GA disable flag are checked again for each activation', () => {
  const initialGPC = harness({ gpc: true });
  initialGPC.click(venue.reservationsUrl);
  assert.deepEqual(initialGPC.events(), []);

  const site = harness();
  site.navigator.globalPrivacyControl = true;
  site.click(venue.reservationsUrl);
  assert.deepEqual(site.events(), []);
  site.navigator.globalPrivacyControl = false;
  site.window.lilosPrivacy.isOptedOut = () => true;
  site.click(venue.reservationsUrl);
  assert.deepEqual(site.events(), []);
  site.window.lilosPrivacy.isOptedOut = () => false;
  site.window[`ga-disable-${GA_ID}`] = true;
  site.click(venue.phoneHref);
  assert.deepEqual(site.events(), []);
});

test('throwing analytics leaves native link activation uncancelled', () => {
  const site = harness();
  site.window.gtag = () => { throw new Error('blocked analytics'); };
  assert.equal(site.click(venue.reservationsUrl), false);
  assert.equal(site.click(venue.phoneHref), false);
  assert.deepEqual(site.events(), []);
});
