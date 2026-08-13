const $ = (selector) => document.querySelector(selector);

const icons = {
  document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="7" width="12" height="14" rx="2"/><path d="M5 17H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"/></svg>',
  photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m2 17 5-5 4 4 3-3 8 8"/></svg>',
  id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2.5"/><path d="M4.5 17c.7-2 2-3 3.5-3s2.8 1 3.5 3M14 10h5M14 14h4"/></svg>',
  sintra: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 3h16v14H4zM8 21h8M12 17v4"/><path d="m6.5 14 4-4 3 3 2-2 2 2"/></svg>',
  magnet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3v9a7 7 0 0 0 14 0V3h-5v9a2 2 0 0 1-4 0V3z"/><path d="M5 7h5M14 7h5"/></svg>',
  laminate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h10M7 14h7M8 3h8M8 21h8"/></svg>',
  sticker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 13 11 22 2 13V2h11z"/><circle cx="8" cy="8" r="2"/><path d="M14 20c0-3 2-5 5-5"/></svg>'
};

function populate() {
  $("#announcement").textContent = SITE_DATA.announcement;
  $("#tagline").textContent = SITE_DATA.tagline.split(".")[0] + ".";
  $("#subTagline").textContent = SITE_DATA.subTagline;
  $("#addressTop").textContent = SITE_DATA.address;
  $("#hoursTop").textContent = SITE_DATA.businessHours;
  $("#address").textContent = SITE_DATA.address;
  $("#phone").textContent = SITE_DATA.phone;
  $("#email").textContent = SITE_DATA.email;
  $("#hours").textContent = SITE_DATA.businessHours;
  $("#messengerButton").href = SITE_DATA.messengerUrl;
  $("#facebookButton").href = SITE_DATA.facebookUrl;
  $("#mapLink").href = SITE_DATA.mapUrl;
  $("#year").textContent = new Date().getFullYear();

  $("#servicesGrid").innerHTML = SITE_DATA.services.map(s => `
    <article class="service-card reveal">
      <div class="service-icon">${icons[s.icon] || icons.document}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <div class="tags">${s.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    </article>
  `).join("");

  $("#finishesGrid").innerHTML = SITE_DATA.finishes.map(f => `
    <article class="finish-card ${f.className} reveal">
      <div class="finish-swatch"></div>
      <div><h3>${f.name}</h3><p>${f.note}</p></div>
    </article>
  `).join("");

  $("#photoSizesBody").innerHTML = SITE_DATA.photoSizes.map(row =>
    `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`
  ).join("");

  $("#galleryGrid").innerHTML = SITE_DATA.gallery.map(item => `
    <article class="gallery-card reveal">
      <img src="${item.image}" alt="${item.title}">
      <div><small>${item.category}</small><h3>${item.title}</h3></div>
    </article>
  `).join("");
}

populate();

const menu = $(".menu-button");
const nav = $(".nav-links");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .08 });

setTimeout(() => document.querySelectorAll(".reveal").forEach(el => observer.observe(el)), 20);
// Simple image lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <button class="lightbox-close" aria-label="Close image">×</button>
  <img src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

document.addEventListener("click", (e) => {
  const image = e.target.closest(".gallery-card img");
  if (!image) return;

  lightboxImg.src = image.src;
  lightboxImg.alt = image.alt;
  lightbox.classList.add("open");
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
  }
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("open");
  }
});