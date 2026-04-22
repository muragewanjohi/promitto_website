const heroSlides = [
  {
    title: 'Royal Heights Sukari Apartments',
    description:
      'Lush, exclusive and secure. Convenient location and strategic home investments in Studio, 1, 2, and 3 bedroom units.',
  },
  {
    title: 'Modern Living in a Gated Community',
    description:
      'Tastefully finished homes designed for comfort, privacy, and long-term value in a serene neighborhood setting.',
  },
];

const unitData = [
  { name: '1 Bedroom Apartment', price: 'KES 4.5M', image: './assets/images/4brm/4br_standard_flat_roof_2.png' },
  { name: '2 Bedroom Apartment', price: 'KES 8.5M', image: './assets/images/house_designs/3br-flat-roof-product-1-3-photo.webp' },
  { name: '3 Bedroom Apartment', price: 'KES 13M', image: './assets/images/hero-house.jpg' },
  { name: 'Studio Apartment', price: 'KES 3.2M', image: './assets/images/hero-house.jpg' },
  { name: '2 Bedroom Superior', price: 'KES 9.8M', image: './assets/images/4brm/4br_standard_flat_roof_2.png' },
  { name: '3 Bedroom Penthouse', price: 'KES 16.5M', image: './assets/images/house_designs/3br-flat-roof-product-1-3-photo.webp' },
];

const amenitySlides = [
  {
    image: './assets/images/4brm/4br_standard_flat_roof_2.png',
    title: 'Blended Nature',
    description: 'Green spaces and attractive landscaping on individual courts.',
  },
  {
    image: './assets/images/hero-house.jpg',
    title: 'Dedicated Entries',
    description: 'Gated courts with dedicated entry and exits to the main gate.',
  },
];

let activeHero = 0;
const heroEls = Array.from(document.querySelectorAll('.hero-slide'));
const dotEls = Array.from(document.querySelectorAll('.dot'));
const heroTitleEl = document.getElementById('heroTitle');
const heroDescEl = document.getElementById('heroDescription');

function setHero(index) {
  activeHero = (index + heroSlides.length) % heroSlides.length;
  heroEls.forEach((el, i) => el.classList.toggle('active', i === activeHero));
  dotEls.forEach((el, i) => el.classList.toggle('active', i === activeHero));
  heroTitleEl.textContent = heroSlides[activeHero].title;
  heroDescEl.textContent = heroSlides[activeHero].description;
}

dotEls.forEach((dot) => {
  dot.addEventListener('click', () => {
    const idx = Number(dot.dataset.heroIndex || 0);
    setHero(idx);
  });
});

setInterval(() => setHero(activeHero + 1), 6000);

const unitGridEl = document.getElementById('unitGrid');
unitData.forEach((unit) => {
  const message = `Hello, I'm interested in the ${unit.name} at Royal Heights Sukari (${unit.price}). Please share more details.`;
  const whatsappHref = `https://wa.me/254729506506?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:info@promittoltd.com?subject=${encodeURIComponent(`Inquiry: ${unit.name} at Royal Heights Sukari`)}&body=${encodeURIComponent(message)}`;

  const card = document.createElement('article');
  card.className = 'unit-card';
  card.innerHTML = `
    <img src="${unit.image}" alt="${unit.name}">
    <div class="unit-body">
      <h3 class="unit-name">${unit.name}</h3>
      <p class="unit-price">${unit.price}</p>
      <div class="cta-row">
        <a class="btn-wa" href="${whatsappHref}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a class="btn-mail" href="${emailHref}">Email</a>
      </div>
    </div>
  `;
  unitGridEl.appendChild(card);
});

let activeAmenity = 0;
const amenityImage = document.getElementById('amenityImage');
const amenityTitle = document.getElementById('amenityTitle');
const amenityDesc = document.getElementById('amenityDesc');
const amenityCounter = document.getElementById('amenityCounter');

function setAmenity(index) {
  activeAmenity = (index + amenitySlides.length) % amenitySlides.length;
  const current = amenitySlides[activeAmenity];
  amenityImage.src = current.image;
  amenityTitle.textContent = current.title;
  amenityDesc.textContent = current.description;
  amenityCounter.textContent = `${activeAmenity + 1}/${amenitySlides.length}`;
}

document.getElementById('amenityPrev').addEventListener('click', () => setAmenity(activeAmenity - 1));
document.getElementById('amenityNext').addEventListener('click', () => setAmenity(activeAmenity + 1));

const siteVisitCheckbox = document.getElementById('siteVisit');
const siteVisitDate = document.getElementById('siteVisitDate');
siteVisitCheckbox.addEventListener('change', () => {
  const enabled = siteVisitCheckbox.checked;
  siteVisitDate.classList.toggle('hidden', !enabled);
  siteVisitDate.required = enabled;
  if (!enabled) siteVisitDate.value = '';
});

document.getElementById('inquiryForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const lines = [
    `Full Name: ${form.get('fullName') || ''}`,
    `Email: ${form.get('email') || ''}`,
    `Phone: ${form.get('phone') || ''}`,
    `Unit Type: ${form.get('unitType') || 'Not specified'}`,
    `Site Visit Requested: ${siteVisitCheckbox.checked ? 'Yes' : 'No'}`,
    `Site Visit Date: ${siteVisitCheckbox.checked ? form.get('siteVisitDate') || 'Not selected' : 'N/A'}`,
    '',
    `Message: ${form.get('message') || "Hello, I'm interested in Royal Heights Sukari. Please share more details."}`,
  ];

  const subject = encodeURIComponent('Royal Heights Sukari Inquiry');
  const body = encodeURIComponent(lines.join('\n'));
  window.location.href = `mailto:info@promittoltd.com?subject=${subject}&body=${body}`;
});
