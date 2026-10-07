import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const venue = JSON.parse(readFileSync(new URL('../src/content/data/venue.json', import.meta.url), 'utf8'));
const output = new URL('../dist/client/', import.meta.url).pathname;

function pages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? pages(path) : entry.name === 'index.html' ? [path] : [];
  });
}

test('every built public route has one native bar with the venue destinations', () => {
  const htmlFiles = pages(output);
  assert.ok(htmlFiles.length > 1, 'build public routes first');

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const bars = [...html.matchAll(/<nav\b[^>]*id="mobile-action-bar"[^>]*>([\s\S]*?)<\/nav>/g)];
    assert.equal(bars.length, 1, file);
    assert.doesNotMatch(bars[0][0], /\binert(?:\s|=|>)/, file);
    const links = [...bars[0][1].matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
    assert.equal(links.length, 2, file);
    assert.equal(links[0][1].replaceAll('&amp;', '&'), venue.reservationsUrl, file);
    assert.equal(links[1][1], venue.phoneHref, file);
    assert.match(html, /viewport-fit=cover/, file);
  }
});
