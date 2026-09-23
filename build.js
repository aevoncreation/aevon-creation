// Build script: reads all CMS content and compiles it into content/data.json
// Runs automatically on every Netlify deploy.
const fs = require('fs');
const path = require('path');

const root = __dirname;
const productsDir = path.join(root, 'content', 'products');

// --- tiny YAML front-matter parser (no dependencies) ---
function parseFrontMatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const lines = m[1].split('\n');
  const obj = {};
  let curKey = null, curList = null, listType = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();

    // list item
    if (trimmed.startsWith('- ')) {
      const item = trimmed.slice(2).trim();
      if (curList) {
        // inline object  - { key: "x", value: "y" }
        if (item.startsWith('{')) {
          const o = {};
          item.replace(/^\{|\}$/g, '').split(',').forEach(pair => {
            const idx = pair.indexOf(':');
            if (idx > -1) {
              const k = pair.slice(0, idx).trim();
              let v = pair.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
              o[k] = v;
            }
          });
          curList.push(o);
        } else {
          curList.push(item.replace(/^["']|["']$/g, ''));
        }
      }
      continue;
    }

    // key: value
    const idx = trimmed.indexOf(':');
    if (idx > -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if (val === '') {
        // could be a list or nested — start a list
        curKey = key;
        curList = [];
        obj[key] = curList;
      } else {
        curList = null;
        val = val.replace(/^["']|["']$/g, '');
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (/^\d+$/.test(val)) val = parseInt(val, 10);
        obj[key] = val;
      }
    }
  }
  return obj;
}

function readJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { return fallback; }
}

// --- products ---
let products = [];
if (fs.existsSync(productsDir)) {
  fs.readdirSync(productsDir).filter(f => f.endsWith('.md')).forEach(f => {
    const raw = fs.readFileSync(path.join(productsDir, f), 'utf8');
    const p = parseFrontMatter(raw);
    if (p.name) products.push(p);
  });
}
products.sort((a, b) => (a.order || 100) - (b.order || 100));

// --- other content ---
const hero = readJSON(path.join(root, 'content', 'hero.json'), { slides: [] });
const categories = readJSON(path.join(root, 'content', 'categories.json'), { items: [] });
const settings = readJSON(path.join(root, 'content', 'settings.json'), {});

const data = {
  products,
  hero: hero.slides || [],
  categories: categories.items || [],
  whatsapp: settings.whatsapp || '919099774500',
  announcements: (settings.announcements || []).map(a => a.text || a),
  reviews: settings.reviews || []
};

fs.writeFileSync(path.join(root, 'content', 'data.json'), JSON.stringify(data, null, 2));
console.log('Built content/data.json —', products.length, 'products,', data.hero.length, 'hero slides');
