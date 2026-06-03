// Generates cute, clean flat-illustration SVG icons for each drink.
import { writeFileSync, mkdirSync } from 'node:fs'

const OUT = new URL('../public/images/', import.meta.url)
mkdirSync(OUT, { recursive: true })

// --- building blocks -----------------------------------------------------
const cupPath = 'M58,60 L142,60 L132,162 Q131,172 121,172 L79,172 Q69,172 68,162 Z'

function face(cx = 100, cy = 118) {
  return `
    <g fill="#5a4632">
      <circle cx="${cx - 14}" cy="${cy}" r="4.2"/>
      <circle cx="${cx + 14}" cy="${cy}" r="4.2"/>
    </g>
    <path d="M${cx - 9},${cy + 10} Q${cx},${cy + 18} ${cx + 9},${cy + 10}"
          stroke="#5a4632" stroke-width="3.2" stroke-linecap="round" fill="none"/>
    <circle cx="${cx - 24}" cy="${cy + 6}" r="5" fill="#ff9aa8" opacity="0.55"/>
    <circle cx="${cx + 24}" cy="${cy + 6}" r="5" fill="#ff9aa8" opacity="0.55"/>`
}

function straw(color) {
  return `<rect x="112" y="26" width="11" height="100" rx="5.5" fill="${color}"
            transform="rotate(13 117 76)"/>`
}

// topping renderers
const toppings = {
  none: () => '',
  boba: () => {
    const xs = [82, 96, 110, 124, 89, 103, 117]
    const ys = [158, 161, 158, 160, 150, 152, 150]
    return `<g fill="#3a2a20">` +
      xs.map((x, i) => `<circle cx="${x}" cy="${ys[i]}" r="5.5"/>`).join('') + `</g>`
  },
  whip: () => `
    <path d="M66,62 q-6,-22 18,-20 q4,-20 22,-14 q18,-10 26,12 q20,-2 14,22 Z"
          fill="#fff7f2" stroke="#f2dccd" stroke-width="2"/>
    <circle cx="100" cy="40" r="6" fill="#ff5d73"/>`,
  ice: () => `<g fill="#ffffff" opacity="0.5">
      <rect x="80" y="78" width="20" height="20" rx="4" transform="rotate(12 90 88)"/>
      <rect x="104" y="92" width="18" height="18" rx="4" transform="rotate(-14 113 101)"/>
      <rect x="86" y="104" width="17" height="17" rx="4" transform="rotate(20 94 112)"/>
    </g>`,
  fizz: () => `<g fill="#ffffff" opacity="0.65">
      <circle cx="84" cy="96" r="3"/><circle cx="95" cy="84" r="2.3"/>
      <circle cx="110" cy="100" r="3.4"/><circle cx="120" cy="88" r="2.2"/>
      <circle cx="100" cy="110" r="2.6"/><circle cx="90" cy="120" r="3"/>
    </g>`,
  lemon: () => `<g>
      <circle cx="124" cy="74" r="13" fill="#ffe14d" stroke="#f2c200" stroke-width="2"/>
      <circle cx="124" cy="74" r="7" fill="#fff3a0"/>
    </g>`,
  fruit: (c) => `<circle cx="124" cy="72" r="10" fill="${c}" stroke="#ffffff" stroke-width="2.5"/>`,
}

// builds one svg. liquid can be one color or [bottom, top]
function drink({ bg, liquid, straw: strawColor = '#ff8fa3', topping = 'none', toppingArg }) {
  const [bottom, top] = Array.isArray(liquid) ? liquid : [liquid, liquid]
  const top2 = top || bottom
  const extra = toppings[topping] ? toppings[topping](toppingArg) : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <rect width="200" height="200" rx="28" fill="${bg}"/>
  <defs><clipPath id="cup"><path d="${cupPath}"/></clipPath></defs>
  <g clip-path="url(#cup)">
    <rect x="55" y="60" width="92" height="120" fill="${bottom}"/>
    <rect x="55" y="60" width="92" height="46" fill="${top2}"/>
  </g>
  ${straw(strawColor)}
  <path d="${cupPath}" fill="none" stroke="#ffffff" stroke-width="6"/>
  <path d="${cupPath}" fill="none" stroke="#d9c4b5" stroke-width="2.5"/>
  ${extra}
  ${face()}
</svg>`
}

// --- per-product config --------------------------------------------------
const items = {
  // Coffee
  'milk-coffee':          { bg: '#f3e4d3', liquid: ['#7b4b27', '#e9d2b8'], topping: 'none' },
  'iced-coffee':          { bg: '#e9d8c4', liquid: '#6f4423', topping: 'ice' },
  'iced-cappuccino':      { bg: '#efe2d0', liquid: ['#6f4423', '#f4e7d6'], topping: 'whip' },
  'iced-latte':           { bg: '#f0e3d2', liquid: ['#8a5a32', '#ead6bd'], topping: 'ice' },
  // Matcha
  'matcha-latte':         { bg: '#e3efcf', liquid: ['#7fae3a', '#eef3d8'], topping: 'none', straw: '#6f9c2e' },
  'strawberry-matcha':    { bg: '#e8f0d6', liquid: ['#ff7d97', '#8cbe46'], topping: 'fruit', toppingArg: '#ff5d73', straw: '#6f9c2e' },
  'blueberry-matcha':     { bg: '#e6efd4', liquid: ['#7a6fc4', '#8cbe46'], topping: 'fruit', toppingArg: '#6b62c0', straw: '#6f9c2e' },
  'passion-fruit-matcha': { bg: '#eaf1d6', liquid: ['#f6b73c', '#8cbe46'], topping: 'fruit', toppingArg: '#f0a92e', straw: '#6f9c2e' },
  // Tea
  'lemon-tea':            { bg: '#fdf3cf', liquid: '#f4cf52', topping: 'lemon', straw: '#f2a900' },
  'green-milk-tea':       { bg: '#e6f0d8', liquid: ['#b6cf86', '#eef4df'], topping: 'none', straw: '#8aab57' },
  'milk-tea':             { bg: '#f1e6d2', liquid: '#cda878', topping: 'none', straw: '#b07d4a' },
  'brown-sugar-milk-tea': { bg: '#ecdcc4', liquid: ['#c79a64', '#efe1cb'], topping: 'boba', straw: '#8a5a2b' },
  // Milk
  'strawberry-milk':      { bg: '#ffe1ea', liquid: '#ffaec3', topping: 'fruit', toppingArg: '#ff5d73' },
  'blueberry-milk':       { bg: '#e6e2f7', liquid: '#bcb2e6', topping: 'fruit', toppingArg: '#6b62c0', straw: '#7a6fc4' },
  'passion-fruit-milk':   { bg: '#fdeecb', liquid: '#ffd87a', topping: 'fruit', toppingArg: '#f0a92e', straw: '#f2a900' },
  'chocolate-milk':       { bg: '#ead9c8', liquid: '#7a4a2b', topping: 'none', straw: '#5e3618' },
  // Soda (fizzy, clear straw)
  'passion-fruit-soda':   { bg: '#ffeec6', liquid: '#ffba33', topping: 'fizz', straw: '#ff8c1a' },
  'blueberry-soda':       { bg: '#d9e6fb', liquid: '#5b8def', topping: 'fizz', straw: '#3f6fd8' },
  'strawberry-soda':      { bg: '#ffdbe3', liquid: '#ff6f8a', topping: 'fizz', straw: '#ff4d6d' },
  // Cream (whipped top)
  'passion-fruit-cream':  { bg: '#fdeec7', liquid: ['#ffcf66', '#fff7f2'], topping: 'whip', straw: '#f2a900' },
  'strawberry-cream':     { bg: '#ffe0e9', liquid: ['#ff9fb6', '#fff7f2'], topping: 'whip' },
  'blueberry-cream':      { bg: '#e7e3f7', liquid: ['#b0a4e2', '#fff7f2'], topping: 'whip', straw: '#7a6fc4' },
}

let n = 0
for (const [name, cfg] of Object.entries(items)) {
  writeFileSync(new URL(`${name}.svg`, OUT), drink(cfg))
  n++
}
console.log(`Generated ${n} drink SVGs in public/images/`)
