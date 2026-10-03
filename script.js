document.getElementById('year').textContent = new Date().getFullYear();
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
btn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

const locBtn = document.getElementById('locate');
const locMsg = document.getElementById('locate-msg');
const DEST = encodeURIComponent('104, E Block, Bhai Randhir Singh Nagar, Ludhiana, Punjab, India');
function openRoute(origin) {
  const o = origin ? '&origin=' + origin : '';
  window.open('https://www.google.com/maps/dir/?api=1' + o + '&destination=' + DEST + '&travelmode=driving', '_blank', 'noopener');
}
locBtn.addEventListener('click', () => {
  if (!navigator.geolocation) { locMsg.textContent = 'Location is not available on this browser. Opening directions without it.'; openRoute(''); return; }
  locMsg.textContent = 'Finding your location...';
  navigator.geolocation.getCurrentPosition(
    p => { locMsg.textContent = 'Opening directions from your location.'; openRoute(p.coords.latitude + ',' + p.coords.longitude); },
    () => { locMsg.textContent = 'Location permission was not given. Opening directions from Google Maps instead.'; openRoute(''); },
    { enableHighAccuracy: true, timeout: 10000 }
  );
});
