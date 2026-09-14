// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// Keep the portfolio grouped by the folders in media/.
const galleryCollections = {
  automotive: ['DSC00770.jpg', 'DSC00774.jpg', 'DSC00778.jpg', 'DSC00793.jpg', 'DSC00806.jpg', 'DSC00814.jpg', 'DSC00819.jpg', 'DSC00822_1.jpg', 'DSC00840.jpg', 'DSC00844.jpg', 'DSC00849_2.jpg', 'DSC00867.jpg', 'DSC00875.jpg', 'DSC09477_1.jpg', 'DSC09501.jpg', 'DSC09509.jpg', 'DSC09511.jpg', 'IMG_3449.jpg', 'IMG_4430.JPG', 'IMG_6754.jpg', 'IMG_6755.jpg', 'IMG_6780.jpg', 'IMG_7269.JPG', 'IMG_7270.JPG', 'IMG_7273.JPG', 'IMG_7274.JPG', 'IMG_8947.jpg'],
  bday: ['DSC00259.jpg', 'DSC00267.jpg', 'DSC00272_1.jpg', 'DSC00291.jpg', 'DSC00452.jpg', 'DSC00957.jpg', 'DSC00973.jpg', 'DSC00982.jpg', 'DSC01063.jpg', 'DSC01068_1.jpg', 'DSC01115.jpg', 'DSC01121.jpg', 'DSC01124.jpg', 'DSC01319.jpg', 'DSC01623.jpg', 'DSC01643.jpg', 'DSC09720.jpg', 'DSC09724.jpg', 'DSC09730.jpg', 'DSC09741.jpg', 'DSC09744.jpg', 'DSC09750_1.jpg', 'DSC09830.jpg', 'DSC09837.jpg', 'DSC09839.jpg', 'DSC09936.jpg', 'DSC09958.jpg', 'DSC09960.jpg', 'DSC09963.jpg'],
  brands: ['IMG_0510.JPG', 'IMG_4145.JPG', 'IMG_5499.JPG', 'IMG_5501.JPG'],
  cultural: ['IMG_1044.JPG', 'IMG_5351 - Copy.JPG', 'IMG_5744.JPG', 'IMG_5745.JPG', 'IMG_6705 - Copy.JPG', 'IMG_6714.JPG', 'IMG_7033 - Copy.JPG', 'IMG_7452.jpg', 'IMG_7664.jpg', 'IMG_8645.jpg', 'IMG_9685.jpg', 'IMG_9686.jpg', 'IMG_9687.jpg', 'IMG_9688.jpg'],
  edits: ['IMG_3446.MOV', 'IMG_3674.MOV', 'IMG_5977.MOV', 'IMG_6078.MOV', 'IMG_8321.MOV'],
  model: ['DSC00078.jpg', 'DSC00362.jpg', 'DSC00878.jpg', 'DSC00879.jpg', 'DSC00881.jpg', 'DSC00894.jpg', 'DSC00896.jpg', 'DSC00918.jpg', 'DSC01039.jpg', 'DSC01073.jpg', 'DSC01166.jpg', 'DSC01462.jpg', 'DSC01464_1.jpg', 'DSC01845.jpg', 'DSC01859.jpg', 'DSC01870.jpg', 'DSC01894.jpg', 'DSC01932.jpg', 'DSC01935_1.jpg', 'DSC01938.jpg', 'DSC08592_2.jpg', 'DSC08632_1.jpg', 'DSC08684_1.jpg', 'DSC08700_1.jpg', 'DSC08718_1.jpg', 'DSC08798_1.jpg', 'DSC08834_1.jpg', 'DSC08848_1.jpg', 'DSC08872_1.jpg', 'DSC08903_1.jpg', 'DSC08958_1.jpg', 'DSC08981.jpg', 'DSC09033.jpg', 'DSC09044.jpg', 'DSC09264.jpg', 'IMG_0626.jpg', 'IMG_0627.jpg', 'IMG_2240.jpg', 'IMG_2260.jpg', 'IMG_4146.JPG', 'IMG_4176.PNG', 'IMG_4177.PNG', 'IMG_4179.JPG', 'IMG_9303.JPG'],
  nature: ['DSC09487_1.jpg', 'DSC09489_1.jpg', 'IMG_1405.jpg', 'IMG_1872.jpg', 'IMG_1874.jpg', 'IMG_3282.JPG', 'IMG_3283.JPG', 'IMG_4094.JPG', 'IMG_4235.JPG', 'IMG_4380.JPG', 'IMG_5105.JPG', 'IMG_5387.JPG', 'IMG_5636.jpg', 'IMG_5637.jpg', 'IMG_5639.jpg', 'IMG_5688.MOV', 'IMG_6227.JPG', 'IMG_8352.jpg']
};

const galleryLabels = {
  automotive: 'Motion & Machines',
  bday: 'Little Chapters',
  brands: 'Brand Narratives',
  cultural: 'Heritage in Frame',
  edits: 'Recent Edits',
  model: 'Faces & Forms',
  nature: 'Untamed'
};

const allWorkPriority = [
  ['automotive', 'DSC00806.jpg'],
  ['bday', 'DSC01319.jpg'],
  ['brands', 'IMG_4145.JPG'],
  ['cultural', 'IMG_7664.jpg'],
  ['model', 'IMG_0626.jpg']
];

const galleryGrid = document.getElementById('galleryGrid');
const galleryEmpty = document.getElementById('galleryEmpty');
const galleryFilters = document.querySelectorAll('.gallery-filter');
const fullGalleryButton = document.getElementById('fullGalleryButton');
const aboutImage = document.querySelector('.about-image');
const aboutImageLabel = document.querySelector('.about-image-label');
const aboutImages = [
  { src: 'media/model/IMG_4177.PNG', niche: 'FACES & FORMS' },
  { src: 'media/nature/IMG_4235.JPG', niche: 'UNTAMED' },
  { src: 'media/automotive/IMG_7274.JPG', niche: 'MOTION & MACHINES' },
  { src: 'media/cultural/IMG_7664.jpg', niche: 'HERITAGE IN FRAME' },
  {src: 'media/model/IMG_0626.jpg' , niche:'FACES & MACHINES'}
];
let galleryExpanded = false;
let currentGalleryCategory = 'featured';

if (aboutImage && aboutImages.length > 1) {
  let aboutImageIndex = 0;
  setInterval(() => {
    aboutImage.classList.add('is-changing');
    setTimeout(() => {
      aboutImageIndex = (aboutImageIndex + 1) % aboutImages.length;
      aboutImage.src = aboutImages[aboutImageIndex].src;
      if (aboutImageLabel) aboutImageLabel.textContent = aboutImages[aboutImageIndex].niche;
      aboutImage.classList.remove('is-changing');
    }, 350);
  }, 5000);
}

function updateFullGalleryButton() {
  if (!fullGalleryButton) return;
  fullGalleryButton.textContent = galleryExpanded ? 'VIEW LESS' : 'VIEW MORE';
  fullGalleryButton.setAttribute('aria-expanded', String(galleryExpanded));
}

function renderGallery(category = 'all') {
  let collections = category === 'featured'
    ? allWorkPriority.map(([collection, photo]) => [collection, [photo]])
    : category === 'all'
      ? Object.entries(galleryCollections)
      : [[category, galleryCollections[category] || []]];

  if (category === 'all') {
    const allPhotos = collections.flatMap(([collection, photos]) => photos.map(photo => [collection, photo]));
    const priorityKeys = new Set(allWorkPriority.map(([collection, photo]) => `${collection}/${photo}`));
    const priorityPhotos = allWorkPriority.filter(([collection, photo]) =>
      allPhotos.some(([itemCollection, itemPhoto]) => itemCollection === collection && itemPhoto === photo)
    );
    const remainingPhotos = allPhotos.filter(([collection, photo]) => !priorityKeys.has(`${collection}/${photo}`));
    collections = [...priorityPhotos, ...remainingPhotos].map(([collection, photo]) => [collection, [photo]]);
  }

  if (!galleryExpanded && category !== 'featured') {
    const previewPhotos = collections.flatMap(([collection, photos]) => photos.map(photo => [collection, photo])).slice(0, 5);
    collections = previewPhotos.map(([collection, photo]) => [collection, [photo]]);
  }

  galleryGrid.innerHTML = collections.flatMap(([collection, photos]) => photos.map(photo => {
    const extension = photo.split('.').pop().toLowerCase();
    const source = `media/${collection}/${photo}`;
    const nicheCaption = category === 'all' || category === 'featured'
      ? `<figcaption>${galleryLabels[collection]}</figcaption>`
      : '';
    const media = extension === 'mov'
      ? `<video src="${source}" controls preload="metadata" aria-label="${photo}"></video>`
      : ['heic', 'dng'].includes(extension)
        ? `<a class="gallery-download" href="${source}" download><span>Download original</span></a>`
        : `<img src="${source}" alt="${galleryLabels[collection]} photograph" loading="lazy">`;

    return `
      <figure class="gallery-card">
        ${media}
        ${nicheCaption}
      </figure>
    `;
  })).join('');

  galleryEmpty.hidden = galleryGrid.children.length > 0;
  updateFullGalleryButton();
}

if (galleryGrid) {
  galleryExpanded = false;
  currentGalleryCategory = 'all';
  renderGallery('featured');
  galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      galleryFilters.forEach(item => {
        const isActive = item === filter;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
      galleryExpanded = false;
      currentGalleryCategory = filter.dataset.category;
      renderGallery(currentGalleryCategory);
    });
  });

  fullGalleryButton?.addEventListener('click', event => {
    event.preventDefault();
    galleryExpanded = !galleryExpanded;
    renderGallery(currentGalleryCategory);
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

function setActiveLink() {
  let current = 'home';
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ============ TESTIMONIAL DOTS ============
const dots = document.querySelectorAll('.dot');
const testimonialCards = document.querySelectorAll('.t-card');

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    // On mobile-friendly single-view layouts, could show/hide cards here.
    // For desktop grid layout, dots simply indicate position and remain clickable.
  });
});

// Auto-advance dots for visual feedback (cosmetic, matches static design intent)
let dotIndex = 0;
setInterval(() => {
  if (!dots.length) return;
  dots.forEach(d => d.classList.remove('active'));
  dotIndex = (dotIndex + 1) % dots.length;
  dots[dotIndex].classList.add('active');
}, 4000);

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});