const money = n => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(n);

const platform = [...document.querySelectorAll('input[name="platform"]')];
const service = document.querySelector('#service');
const days = document.querySelector('#days');
const reach = document.querySelector('#reach');
const addons = [...document.querySelectorAll('.addons input')];

function calc() {
  const selectedPlatform = document.querySelector('input[name="platform"]:checked');
  if (!selectedPlatform || !service || !days || !reach) return;

  const p = selectedPlatform.value;
  const b = Number(service.value);
  const m = Number(reach.value);
  const d = Number(days.value);
  const e = addons
    .filter(x => x.checked)
    .reduce((sum, x) => sum + Number(x.value), 0);

  const sub = (b * m * d) / 7;
  const total = Math.round(sub + e);

  document.querySelector('#sp').textContent = p;
  document.querySelector('#ss').textContent = service.options[service.selectedIndex].text;
  document.querySelector('#sd').textContent = days.options[days.selectedIndex].text;
  document.querySelector('#sr').textContent = reach.options[reach.selectedIndex].text;
  document.querySelector('#sub').textContent = money(sub);
  document.querySelector('#extra').textContent = money(e);
  document.querySelector('#total').textContent = money(total);
}

[...platform, service, days, reach, ...addons].forEach(el => {
  el.addEventListener('change', calc);
});

calc();

const waButton = document.querySelector('#wa');
if (waButton) {
  waButton.addEventListener('click', () => {
    const msg = [
      'Halo Srilex Buditra, saya ingin konsultasi jasa media sosial.',
      `Platform: ${document.querySelector('input[name="platform"]:checked').value}`,
      `Layanan: ${service.options[service.selectedIndex].text}`,
      `Durasi: ${days.options[days.selectedIndex].text}`,
      `Target: ${reach.options[reach.selectedIndex].text}`,
      `Estimasi: ${document.querySelector('#total').textContent}`
    ].join('\n');

    window.open(
      'https://wa.me/6282136238350?text=' + encodeURIComponent(msg),
      '_blank',
      'noopener,noreferrer'
    );
  });
}

/* Mobile navigation */
const menuButton = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const mainNav = document.querySelector('#main-nav');

if (menuButton && nav && mainNav) {
  const closeMenu = () => {
    nav.classList.remove('nav-open');
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 950) closeMenu();
  });
}
