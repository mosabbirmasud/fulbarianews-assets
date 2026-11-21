// bajus.org theke sorno o rupar dam pore gold.json update kore.
// gold.json format:
// { "date":"YYYY-MM-DD", "g22":..,"g21":..,"g18":..,"gtr":..,"s22":..,"s21":..,"s18":..,"str":..,
//   "hist":[["YYYY-MM-DD", 22k-bhori-dam], ...] (notun theke purono), "checked":"ISO time", "source":"bajus.org" }
import fs from 'node:fs';

const URL_ = 'https://www.bajus.org/gold-price';
const FILE = process.env.GOLD_FILE || 'gold.json';
const BHORI = 11.664;
const MON = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

export function parse(html) {
  const pdf = html.match(/Gold%20Price\/(\d{1,2})-([A-Za-z]{3})[a-z]*-(\d{4})\.pdf/i) ||
              html.match(/Gold Price\/(\d{1,2})-([A-Za-z]{3})[a-z]*-(\d{4})\.pdf/i);
  let date = null;
  if (pdf && MON[pdf[2].toLowerCase()]) {
    date = `${pdf[3]}-${String(MON[pdf[2].toLowerCase()]).padStart(2, '0')}-${String(+pdf[1]).padStart(2, '0')}`;
  }
  const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ');
  const text = body.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
  const num = (re) => { const m = text.match(re); return m ? +m[m.length - 1].replace(/,/g, '') : null; };
  const d = {
    g22: num(/22\s*KARAT\s*Gold[^0-9]*?([\d,]+)\s*BDT/i),
    g21: num(/21\s*KARAT\s*Gold[^0-9]*?([\d,]+)\s*BDT/i),
    g18: num(/18\s*KARAT\s*Gold[^0-9]*?([\d,]+)\s*BDT/i),
    gtr: num(/TRADITIONAL\s*Gold[^0-9]*?([\d,]+)\s*BDT/i),
    s22: num(/22\s*KARAT\s*Silver[^0-9]*?([\d,]+)\s*BDT/i),
    s21: num(/21\s*KARAT\s*Silver[^0-9]*?([\d,]+)\s*BDT/i),
    s18: num(/18\s*KARAT\s*Silver[^0-9]*?([\d,]+)\s*BDT/i),
    str: num(/TRADITIONAL\s*Silver[^0-9]*?([\d,]+)\s*BDT/i),
  };
  return { date, ...d };
}

function sane(d) {
  const ok = (v, lo, hi) => typeof v === 'number' && v >= lo && v <= hi;
  return ok(d.g22, 3000, 100000) && ok(d.g21, 3000, 100000) && ok(d.g18, 2000, 100000) && ok(d.gtr, 1000, 100000) &&
    d.g22 > d.g21 && d.g21 > d.g18 && ok(d.s22, 20, 5000);
}

async function main() {
  const res = await fetch(URL_, { headers: { 'user-agent': 'Mozilla/5.0 (fulbarianews gold bot)', 'accept-language': 'en' } });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const p = parse(await res.text());
  if (!sane(p)) throw new Error('Parse failed: ' + JSON.stringify(p));

  let old = {};
  try { old = JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) {}
  const today = new Date(Date.now() + 6 * 3600e3).toISOString().slice(0, 10); // Dhaka date
  const keys = ['g22', 'g21', 'g18', 'gtr', 's22', 's21', 's18', 'str'];
  const changed = keys.some((k) => old[k] !== p[k]);
  let date = p.date || old.date || today;
  if (changed && old.date && date <= old.date) date = today; // dam bodleche kintu PDF tarikh purono
  if (!changed && old.date) date = old.date;

  const hist = Array.isArray(old.hist) ? old.hist.slice() : [];
  const bh = Math.round(p.g22 * BHORI);
  const i = hist.findIndex((h) => h[0] === date);
  if (i > -1) hist[i] = [date, bh]; else if (!hist.length || hist[0][1] !== bh) hist.unshift([date, bh]);
  hist.sort((a, b) => (a[0] < b[0] ? 1 : -1));

  const out = { date, ...Object.fromEntries(keys.map((k) => [k, p[k]])), hist: hist.slice(0, 30), source: 'bajus.org' };
  const prev = JSON.stringify({ ...old, checked: undefined });
  if (prev === JSON.stringify({ ...out, checked: undefined })) { console.log('Same data', date, p.g22); return; }
  fs.writeFileSync(FILE, JSON.stringify(out, null, 1) + '\n');
  console.log('Updated', date, p.g22, bh);
}

if (process.argv[1] && process.argv[1].endsWith('gold.mjs')) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
