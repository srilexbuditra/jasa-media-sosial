const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);

const mediaInputs = document.querySelectorAll('input[name="media"]');
const service = document.getElementById('service');
const quantity = document.getElementById('quantity');
const addonInputs = document.querySelectorAll('.addons input');
const sumMedia = document.getElementById('sumMedia');
const sumService = document.getElementById('sumService');
const sumQty = document.getElementById('sumQty');
const subtotalEl = document.getElementById('subtotal');
const addonTotalEl = document.getElementById('addonTotal');
const totalEl = document.getElementById('total');

function updateSelectedStyles(){
  document.querySelectorAll('.choice').forEach(c=>c.classList.toggle('selected', c.querySelector('input').checked));
}

function calculate(){
  const media = document.querySelector('input[name="media"]:checked');
  const mediaFee = Number(media.dataset.fee || 0);
  const base = Number(service.value);
  const qty = Math.max(1, Math.min(100, Number(quantity.value) || 1));
  const addons = [...addonInputs].filter(x=>x.checked).reduce((s,x)=>s+Number(x.dataset.price),0);
  const subtotal = (base + mediaFee) * qty;
  const total = subtotal + addons;
  sumMedia.textContent = media.value;
  sumService.textContent = service.options[service.selectedIndex].text.split("—")[0].trim();
  sumQty.textContent = qty;
  subtotalEl.textContent = rupiah(subtotal);
  addonTotalEl.textContent = rupiah(addons);
  totalEl.textContent = rupiah(total);
  updateSelectedStyles();
}

mediaInputs.forEach(x=>x.addEventListener('change',calculate));
service.addEventListener('change',calculate);
quantity.addEventListener('input',calculate);
addonInputs.forEach(x=>x.addEventListener('change',calculate));

document.querySelectorAll('.choose-plan').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const plan = btn.dataset.plan;
    document.getElementById('estimator').scrollIntoView({behavior:'smooth'});
    const planMap = {Starter:75000, Growth:100000, Professional:150000};
    const option = [...service.options].find(o=>Number(o.value)===planMap[plan]);
    if(option) service.value = option.value;
    calculate();
  });
});

document.getElementById('orderBtn').addEventListener('click',()=>{
  const media = document.querySelector('input[name="media"]:checked').value;
  const jasa = service.options[service.selectedIndex].text.split("—")[0].trim();
  const qty = quantity.value;
  const total = totalEl.textContent;
  const addons = [...addonInputs].filter(x=>x.checked).map(x=>x.value).join(", ") || "Tidak ada";
  const text = `Halo Srilex Buditra, saya ingin konsultasi/order layanan media sosial.%0A%0AMedia: ${media}%0AJasa: ${jasa}%0AJumlah: ${qty}%0AFitur tambahan: ${addons}%0AEstimasi: ${total}`;
  window.open(`https://wa.me/6282136238350?text=${text}`,'_blank');
});

document.querySelector('.menu-toggle').addEventListener('click',()=>{
  const nav = document.querySelector('.navbar nav');
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.position='absolute'; nav.style.top='72px'; nav.style.left='0'; nav.style.right='0';
  nav.style.background='#050b1b'; nav.style.padding='20px'; nav.style.flexDirection='column'; nav.style.gap='18px';
});

calculate();
