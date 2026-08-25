// Mobile menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------------------
// Signature element: animated "grid map" — a small network
// of nodes (substations / cluster nodes) connected by lines,
// with a pulse of current traveling along a few edges.
// Reduced-motion users get a static version (see prefers-reduced-motion check).
// ---------------------------------------------------------
(function buildGridMap() {
  const svg = document.getElementById('gridMap');
  if (!svg) return;

  const SIZE = 560;
  const nodes = [
    { id: 'n0', x: 90,  y: 90,  label: 'sub-01' },
    { id: 'n1', x: 300, y: 60,  label: 'node-02' },
    { id: 'n2', x: 480, y: 130, label: 'sub-03' },
    { id: 'n3', x: 210, y: 220, label: 'node-04' },
    { id: 'n4', x: 420, y: 280, label: 'sub-05' },
    { id: 'n5', x: 100, y: 340, label: 'node-06' },
    { id: 'n6', x: 300, y: 420, label: 'sub-07' },
    { id: 'n7', x: 480, y: 460, label: 'node-08' },
    { id: 'n8', x: 150, y: 480, label: 'sub-09' },
  ];

  const edges = [
    [0, 1], [1, 2], [1, 3], [2, 4], [3, 4],
    [3, 5], [4, 6], [5, 6], [6, 7], [5, 8], [6, 8],
  ];

  const ns = 'http://www.w3.org/2000/svg';
  const makeEl = (tag, attrs) => {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  };

  // edges
  edges.forEach(([a, b], i) => {
    const na = nodes[a], nb = nodes[b];
    const line = makeEl('line', {
      x1: na.x, y1: na.y, x2: nb.x, y2: nb.y,
      stroke: 'rgba(234,241,246,0.14)',
      'stroke-width': 1,
    });
    svg.appendChild(line);
  });

  // pulses on a subset of edges
  const pulseEdges = [0, 2, 5, 7, 9];
  pulseEdges.forEach((edgeIndex, i) => {
    const [a, b] = edges[edgeIndex];
    const na = nodes[a], nb = nodes[b];
    const pulse = makeEl('circle', {
      r: 3.2,
      fill: i % 2 === 0 ? 'var(--copper-bright)' : 'var(--cyan)',
    });
    svg.appendChild(pulse);

    const animMotion = makeEl('animateMotion', {
      dur: `${3 + (i % 3)}s`,
      repeatCount: 'indefinite',
      path: `M${na.x},${na.y} L${nb.x},${nb.y}`,
      begin: `${i * 0.5}s`,
    });
    pulse.appendChild(animMotion);

    const animOpacity = makeEl('animate', {
      attributeName: 'opacity',
      values: '0;1;1;0',
      keyTimes: '0;0.1;0.9;1',
      dur: `${3 + (i % 3)}s`,
      repeatCount: 'indefinite',
      begin: `${i * 0.5}s`,
    });
    pulse.appendChild(animOpacity);
  });

  // nodes
  nodes.forEach((n, i) => {
    const g = makeEl('g', {});
    const glow = makeEl('circle', {
      cx: n.x, cy: n.y, r: 10,
      fill: 'none',
      stroke: i % 3 === 0 ? 'var(--copper)' : 'rgba(95,211,196,0.4)',
      'stroke-width': 1,
      opacity: 0.35,
    });
    const dot = makeEl('circle', {
      cx: n.x, cy: n.y, r: 4,
      fill: i % 3 === 0 ? 'var(--copper-bright)' : 'var(--cyan)',
    });
    const label = makeEl('text', {
      x: n.x, y: n.y - 16,
      fill: 'rgba(143,163,179,0.8)',
      'font-family': 'JetBrains Mono, monospace',
      'font-size': 9,
      'text-anchor': 'middle',
    });
    label.textContent = n.label;

    g.appendChild(glow);
    g.appendChild(dot);
    g.appendChild(label);
    svg.appendChild(g);
  });
})();

// Freeze animations for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('animateMotion, animate').forEach(a => {
    a.setAttribute('repeatCount', '1');
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => observer.observe(s));
