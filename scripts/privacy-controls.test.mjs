import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../src/pages/privacy.astro', import.meta.url), 'utf8');
const script = source.match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function control({ gpc = false, optedOut = false, api = true } = {}) {
  const records = new Map([['lilos-privacy-v1', JSON.stringify({ optOut: optedOut, ts: 1 })]]);
  const nodes = Object.fromEntries(['privacy-status', 'privacy-toggle'].map(id => [id, {
    className: '', style: {}, disabled: false, handlers: {},
    addEventListener(name, fn) { this.handlers[name] = fn; },
  }]));
  let calls = 0;
  const context = {
    navigator: { globalPrivacyControl: gpc },
    document: { readyState: 'complete', getElementById: id => nodes[id] },
    localStorage: { getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) },
    window: api ? { lilosPrivacy: {
      isOptedOut: () => optedOut,
      optIn() { calls++; optedOut = false; },
      optOut() { calls++; optedOut = true; },
    } } : {},
  };
  vm.runInNewContext(script, context);
  return { nodes, records, calls: () => calls };
}

test('GPC disables opt-in and prevents callbacks even if the stored preference is opted out', () => {
  for (const optedOut of [false, true]) {
    const ui = control({ gpc: true, optedOut });
    assert.equal(ui.nodes['privacy-toggle'].disabled, true);
    assert.match(ui.nodes['privacy-status'].textContent, /Global Privacy Control/);
    ui.nodes['privacy-toggle'].handlers.click();
    assert.equal(ui.calls(), 0);
  }
});

test('without GPC the existing privacy API toggles analytics both ways', () => {
  const ui = control();
  assert.equal(ui.nodes['privacy-toggle'].textContent, 'Opt out');
  ui.nodes['privacy-toggle'].handlers.click();
  assert.equal(ui.nodes['privacy-toggle'].textContent, 'Opt back in');
  ui.nodes['privacy-toggle'].handlers.click();
  assert.equal(ui.nodes['privacy-toggle'].textContent, 'Opt out');
  assert.equal(ui.calls(), 2);
});

test('without an analytics API the saved browser preference still toggles', () => {
  const ui = control({ api: false });
  ui.nodes['privacy-toggle'].handlers.click();
  assert.equal(JSON.parse(ui.records.get('lilos-privacy-v1')).optOut, true);
  ui.nodes['privacy-toggle'].handlers.click();
  assert.equal(JSON.parse(ui.records.get('lilos-privacy-v1')).optOut, false);
});
