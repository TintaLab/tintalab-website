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
 
  $("#year").textContent = new Date().getFullYear();

  $("#servicesGrid").innerHTML = SITE_DATA.services.map(s => `
    <article class="service-card reveal ${s.action ? "service-card-clickable" : ""}" ${s.action ? `data-service-action="${s.action}" role="button" tabindex="0" aria-label="View ${s.title} pricing"` : ""}>
      <div class="service-icon">${icons[s.icon] || icons.document}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <div class="tags">${s.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
      ${s.action ? `<span class="service-action">View pricing & options →</span>` : ""}
    </article>
  `).join("");

  $("#finishesGrid").innerHTML = SITE_DATA.finishes.map(f => `
  <article class="finish-card ${f.className} reveal">
    <img src="${f.image}" alt="${f.name} PhotoTop finish" class="finish-photo">
    <div>
      <h3>${f.name}</h3>
      <p>${f.note}</p>
    </div>
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
  const image = e.target.closest(".gallery-card img, .finish-photo");
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

// Sintra pricing configurator
const sintraConfig = SITE_DATA.sintraConfigurator;
const sintraModal = document.createElement("div");
sintraModal.className = "product-modal";
sintraModal.setAttribute("aria-hidden", "true");
sintraModal.innerHTML = `
  <div class="product-modal-panel" role="dialog" aria-modal="true" aria-labelledby="sintraModalTitle">
    <button class="product-modal-close" type="button" aria-label="Close pricing">×</button>
    <div class="product-modal-grid">
      <div class="product-preview">
        <img src="${sintraConfig.sampleImage}" alt="TintaLab A4 Sintra Board sample" class="product-main-image">
        <div class="included-card">
          <span>✓ INCLUDED</span>
          <p>${sintraConfig.baseNote}</p>
        </div>
      </div>
      <div class="product-config">
        <span class="eyebrow">BUILD YOUR SINTRA BOARD</span>
        <h2 id="sintraModalTitle">${sintraConfig.title}</h2>
        <p class="product-description">${sintraConfig.description}</p>
        <div class="spec-grid">
          ${sintraConfig.specs.map(spec => `<div><small>${spec[0]}</small><b>${spec[1]}</b></div>`).join("")}
        </div>
        <div class="base-price-row"><span>Base price</span><strong>₱${sintraConfig.basePrice}</strong></div>
        <p class="config-label">Optional add-ons & savings</p>
        <div class="addon-list">
          ${sintraConfig.addOns.map(addon => {
            const priceLabel = addon.price === 0 ? "FREE" : addon.price < 0 ? `−₱${Math.abs(addon.price)}` : `+₱${addon.price}`;
            return `
            <label class="addon-option">
              <input type="checkbox" value="${addon.price}" data-addon-id="${addon.id}" data-addon-name="${addon.name}">
              <span class="addon-check"></span>
              <span class="addon-copy">
                <b>${addon.name}</b>
                <small>${addon.note}</small>
              </span>
              <strong>${priceLabel}</strong>
            </label>`;
          }).join("")}
        </div>
        <div class="total-card">
          <span>Estimated total</span>
          <strong id="sintraTotal">₱${sintraConfig.basePrice}</strong>
        </div>
        <div class="product-notes">
          <b>Before ordering</b>
          <ul>${sintraConfig.notes.map(note => `<li>${note}</li>`).join("")}</ul>
        </div>
        <p class="price-note">${sintraConfig.priceNote}</p>
        <div class="config-actions">
          <button type="button" class="button" id="copySintraOrder">Copy Order Summary</button>
          <a class="button button-secondary" id="sintraMessenger" href="${SITE_DATA.messengerUrl}" target="_blank" rel="noopener">Open Messenger</a>
        </div>
        <p class="copy-feedback" id="copyFeedback" aria-live="polite"></p>
      </div>
    </div>
  </div>
`;
document.body.appendChild(sintraModal);

const openSintraModal = () => {
  sintraModal.classList.add("open");
  sintraModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeSintraModal = () => {
  sintraModal.classList.remove("open");
  sintraModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

const updateSintraTotal = () => {
  const selected = [...sintraModal.querySelectorAll('.addon-option input:checked')];
  const total = sintraConfig.basePrice + selected.reduce((sum, box) => sum + Number(box.value), 0);
  sintraModal.querySelector('#sintraTotal').textContent = `₱${total}`;
  return { selected, total };
};

document.addEventListener("click", (e) => {
  const sintraCard = e.target.closest('[data-service-action="sintra"]');
  const documentCard = e.target.closest('[data-service-action="documentPrinting"]');
  const copyScanCard = e.target.closest('[data-service-action="copyScan"]');
const photoPrintingCard = e.target.closest('[data-service-action="photoPrinting"]');
const laminationCard = e.target.closest('[data-service-action="lamination"]');
const bagTagsCard = e.target.closest('[data-service-action="bagTags"]');

  if (sintraCard) {
    openSintraModal();
  }

  if (documentCard) {
    openDocumentPrinting(e);
  }

  if (copyScanCard) {
    openCopyScanModal();
}

if (photoPrintingCard) {
  openPhotoPrintingModal();
}

if (laminationCard) {
  openLaminationModal();
}

if (bagTagsCard) {
  openBagTagsModal();
}

});

document.addEventListener("keydown", (e) => {
  const sintraCard = e.target.closest?.('[data-service-action="sintra"]');
  const documentCard = e.target.closest?.('[data-service-action="documentPrinting"]');
  const copyScanCard = e.target.closest?.('[data-service-action="copyScan"]');
const photoPrintingCard = e.target.closest?.('[data-service-action="photoPrinting"]');
const laminationCard = e.target.closest?.('[data-service-action="lamination"]');
const bagTagsCard = e.target.closest?.('[data-service-action="bagTags"]');

  if (sintraCard && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openSintraModal();
  }

  if (documentCard && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openDocumentPrinting(e);
  }

  if (copyScanCard && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    openCopyScanModal();
  }

if (photoPrintingCard && (e.key === "Enter" || e.key === " ")) {
  e.preventDefault();
  openPhotoPrintingModal();
}

if (laminationCard && (e.key === "Enter" || e.key === " ")) {
  e.preventDefault();
  openLaminationModal();

}

if (bagTagsCard && (e.key === "Enter" || e.key === " ")) {
  e.preventDefault();
  openBagTagsModal();
}

});

sintraModal.querySelector('.product-modal-close').addEventListener('click', closeSintraModal);
sintraModal.addEventListener('click', (e) => {
  if (e.target === sintraModal) closeSintraModal();
});
sintraModal.querySelectorAll('.addon-option input').forEach(input => input.addEventListener('change', updateSintraTotal));

sintraModal.querySelector('#copySintraOrder').addEventListener('click', async () => {
  const { selected, total } = updateSintraTotal();
  const extras = selected.length ? selected.map(box => {
    const price = Number(box.value);
    const label = price === 0 ? "FREE" : price < 0 ? `−₱${Math.abs(price)}` : `+₱${price}`;
    return `${box.dataset.addonName} (${label})`;
  }).join(', ') : 'None';
  const summary = `Hi TintaLab! I’d like to order an A4 Sintra Photo Board. Base: ₱${sintraConfig.basePrice}. Selected options: ${extras}. Estimated total: ₱${total}. I understand the final size may be slightly smaller than A4 depending on the design and that the file should be ready to print.`;
  const feedback = sintraModal.querySelector('#copyFeedback');
  try {
    await navigator.clipboard.writeText(summary);
    feedback.textContent = 'Order summary copied — paste it in Messenger. ✓';
  } catch {
    feedback.textContent = summary;
  }
});

// Extend the existing Escape-key behavior to close the product configurator too.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sintraModal.classList.contains("open")) closeSintraModal();
});
const printingPrices = {
  text: {
    bw: {
      short: 6,
      a4: 7,
      long: 8
    },

    partial: {
      short: 8,
      a4: 9,
      long: 10
    },

    full: {
      short: 12,
      a4: 14,
      long: 16
    }
  },

  image: {
    bw: {
      short: 8,
      a4: 9,
      long: 10
    },

    partial: {
      short: 14,
      a4: 16,
      long: 17
    },

    full: {
      short: 20,
      a4: 22,
      long: 27
    }
  }
};


function openDocumentPrinting(event) {

  event.preventDefault();

  document.getElementById("documentPrintingModal").style.display = "block";

  calculatePrinting();
}


function closeDocumentPrinting() {

  document.getElementById("documentPrintingModal").style.display = "none";

}


function calculatePrinting() {

  const docType =
    document.getElementById("docType").value;

  const printType =
    document.getElementById("printType").value;

  const paperSize =
    document.getElementById("paperSize").value;

  let quantity =
    parseInt(document.getElementById("printQty").value);

  const student =
    document.getElementById("studentDiscount").checked;


  if (!quantity || quantity < 1) {
    quantity = 1;
  }


  const price =
    printingPrices[docType][printType][paperSize];


  const regularTotal =
    price * quantity;


  /* BULK DISCOUNT */

  let bulkDiscount = 0;

  if (quantity >= 100) {

    bulkDiscount = 0.15;

  } else if (quantity >= 50) {

    bulkDiscount = 0.10;

  } else if (quantity >= 20) {

    bulkDiscount = 0.05;

  }


  /* STUDENT DISCOUNT */

  const studentDiscount =
    student ? 0.10 : 0;


  /* USE HIGHEST DISCOUNT ONLY */

  const appliedDiscount =
    Math.max(bulkDiscount, studentDiscount);


  const discountAmount =
    regularTotal * appliedDiscount;


  const finalTotal =
    regularTotal - discountAmount;


  document.getElementById("pricePerPage").textContent =
    "₱" + price.toFixed(2);


  document.getElementById("regularTotal").textContent =
    "₱" + regularTotal.toFixed(2);


  document.getElementById("discountAmount").textContent =
    appliedDiscount > 0
      ? "-₱" + discountAmount.toFixed(2)
      : "₱0.00";


  document.getElementById("estimatedTotal").textContent =
    "₱" + finalTotal.toFixed(2);


  const message =
    document.getElementById("discountMessage");


  if (bulkDiscount > studentDiscount && bulkDiscount > 0) {

    message.textContent =
      Math.round(bulkDiscount * 100) +
      "% Bulk Discount Applied";

  }

  else if (studentDiscount > bulkDiscount) {

    message.textContent =
      "10% Student Discount Applied";

  }

  else if (
    studentDiscount === bulkDiscount &&
    studentDiscount > 0
  ) {

    message.textContent =
      Math.round(appliedDiscount * 100) +
      "% Discount Applied";

  }

  else {

    message.textContent = "";

  }

}


/* COPY ORDER + OPEN MESSENGER */

function sendPrintingOrder() {

  const docType =
    document.getElementById("docType");

  const printType =
    document.getElementById("printType");

  const paperSize =
    document.getElementById("paperSize");

  const quantity =
    document.getElementById("printQty").value;

  const student =
    document.getElementById("studentDiscount").checked;

  const total =
    document.getElementById("estimatedTotal").textContent;


  const orderDetails =
`TintaLab Document Printing Inquiry

Document Type: ${docType.options[docType.selectedIndex].text}
Print Type: ${printType.options[printType.selectedIndex].text}
Paper Size: ${paperSize.options[paperSize.selectedIndex].text}
Quantity: ${quantity} page/s
Student Discount: ${student ? "Yes" : "No"}

Estimated Total: ${total}`;


  navigator.clipboard.writeText(orderDetails)
    .then(() => {

      alert(
        "Order details copied! Paste it into Messenger."
      );

      window.open(
        "https://m.me/61591481322961",
        "_blank"
      );

    });

}
// ========================================
// PHOTOCOPY & SCANNING CALCULATOR
// ========================================

const copyPrices = {
  text: {
    bw:      { short: 5, a4: 6, long: 7 },
    partial: { short: 7, a4: 8, long: 9 },
    full:    { short: 10, a4: 12, long: 14 }
  },
  image: {
    bw:      { short: 7, a4: 8, long: 9 },
    partial: { short: 12, a4: 14, long: 16 },
    full:    { short: 18, a4: 20, long: 23 }
  }
};

function openCopyScanModal() {
  document.getElementById("copyScanModal").style.display = "block";
  updateCopyScanFields();
}

function closeCopyScanModal() {
  document.getElementById("copyScanModal").style.display = "none";
}

function getScanFee(pages) {
  pages = Math.max(1, Number(pages) || 1);
  return 10 + Math.max(0, pages - 1) * 3;
}

function getBulkDiscount(quantity) {
  if (quantity >= 100) return 0.15;
  if (quantity >= 50) return 0.10;
  if (quantity >= 20) return 0.05;
  return 0;
}

function updateCopyScanFields() {
  const service = document.getElementById("copyScanService").value;

  const printOptions = document.getElementById("copyPrintOptions");
  const scanPagesField = document.getElementById("scanPagesField");
  const quantityField = document.getElementById("copyQuantityField");
  const bulkInfo = document.getElementById("copyBulkInfo");

const backToBackField =
  document.getElementById("copyBackToBackField");

const backToBack =
  document.getElementById("copyBackToBack");

  if (service === "photocopy") {
    printOptions.style.display = "";
    scanPagesField.style.display = "none";
    quantityField.style.display = "";
    bulkInfo.style.display = "";
    document.getElementById("copyQuantityLabel").textContent =
      "Quantity / Pages";
backToBackField.style.display = "";
  }

  if (service === "scan") {
    printOptions.style.display = "none";
    scanPagesField.style.display = "";
    quantityField.style.display = "none";
    bulkInfo.style.display = "none";
backToBackField.style.display = "none";
backToBack.checked = false;
  }

  if (service === "scanprint") {
    printOptions.style.display = "";
    scanPagesField.style.display = "";
    quantityField.style.display = "";
    bulkInfo.style.display = "";
    document.getElementById("copyQuantityLabel").textContent =
      "Number of Printed Copies";
backToBackField.style.display = "none";
backToBack.checked = false;
  }

  calculateCopyScan();
}

function calculateCopyScan() {
  const service = document.getElementById("copyScanService").value;

  const content = document.getElementById("copyContent").value;
  const color = document.getElementById("copyColor").value;
  const paper = document.getElementById("copyPaper").value;

  const quantity = Math.max(
    1,
    Number(document.getElementById("copyQuantity").value) || 1
  );

  const scanPages = Math.max(
    1,
    Number(document.getElementById("scanPages").value) || 1
  );
const backToBack =
  document.getElementById("copyBackToBack")?.checked || false;

  let rate = 0;
  let regularTotal = 0;
  let discountAmount = 0;
  let finalTotal = 0;

  const rateLabel = document.getElementById("copyRateLabel");
  const discountRow = document.getElementById("copyDiscountRow");
  const discountMessage = document.getElementById("copyDiscountMessage");

  if (service === "scan") {
    const scanFee = getScanFee(scanPages);

    rateLabel.textContent = "Scan Fee";
    rate = scanFee;
    regularTotal = scanFee;
    finalTotal = scanFee;

    discountRow.style.display = "none";
    discountMessage.textContent =
      scanPages === 1
        ? "₱10 for the first scanned page."
        : "₱10 first page + ₱3 for each additional page.";
  } else {
    rate = copyPrices[content][color][paper];

    let effectiveRate = rate;

if (service === "photocopy" && backToBack) {
  const backSideRate = Math.max(0, rate - 2);
  effectiveRate = rate + backSideRate;
}

const printTotal = effectiveRate * quantity;
const discountRate = getBulkDiscount(quantity);
discountAmount = printTotal * discountRate;
const discountedPrintTotal = printTotal - discountAmount;

    regularTotal = printTotal;
    finalTotal = discountedPrintTotal;

    if (service === "scanprint") {
      const scanFee = getScanFee(scanPages);
      regularTotal += scanFee;
      finalTotal += scanFee;

      rateLabel.textContent = "Print price per page";
    } else {
      if (service === "photocopy" && backToBack) {
  rateLabel.textContent = "Price per back-to-back sheet";
} else {
  rateLabel.textContent = "Price per page";
}
    }

    discountRow.style.display = "";

    if (discountRate > 0) {
      discountMessage.textContent =
        `${Math.round(discountRate * 100)}% bulk discount applied to printing.`;
    } else {
      discountMessage.textContent =
        "Bulk discount starts at 20 printed pages/copies.";
    }
  }

  const displayedRate =
  service === "photocopy" && backToBack
    ? rate + Math.max(0, rate - 2)
    : rate;

document.getElementById("copyRate").textContent =
  `₱${displayedRate.toFixed(2)}`;

  document.getElementById("copyRegularTotal").textContent =
    `₱${regularTotal.toFixed(2)}`;

  document.getElementById("copyDiscount").textContent =
    `-₱${discountAmount.toFixed(2)}`;

  document.getElementById("copyFinalTotal").textContent =
    `₱${finalTotal.toFixed(2)}`;
}
// ========================================
// PHOTO PRINTING CALCULATOR
// ========================================

const PHOTO_SHEET_PRICE = 50;

// PhotoTop additional charge PER A4 sheet
const PHOTO_TOP_PRICES = {
  none: 0,
  glossy: 15,
  matte: 15,
  leather: 17,
  canvas: 17,
  glitter: 20,
  "3d": 20,
  holo: 20
};

// Sizes in millimeters
const PHOTO_SIZES = {
  wallet: { w: 50.8, h: 76.2 },   // 2 x 3 in
  "2r":   { w: 63.5, h: 88.9 },   // 2.5 x 3.5
  "3r":   { w: 88.9, h: 127 },    // 3.5 x 5
  "4r":   { w: 101.6, h: 152.4 }, // 4 x 6
  "5r":   { w: 127, h: 177.8 },   // 5 x 7
  "6r":   { w: 152.4, h: 203.2 }, // 6 x 8
  a4:     { w: 210, h: 297 }
};

// Theoretical A4 working area.
// For now, assume printer is behaving normally 😂
const SHEET_WIDTH = 210;
const SHEET_HEIGHT = 297;

// Small spacing between photos for cutting
const PHOTO_GAP = 2;


// ---------- MODAL ----------

function openPhotoPrintingModal() {
  document.getElementById("photoPrintingModal")
    .classList.add("active");

  calculatePhotoPrinting();
}

function closePhotoPrintingModal() {
  document.getElementById("photoPrintingModal")
    .classList.remove("active");
}


// ---------- MAXRECTS PACKER ----------

function rectanglesIntersect(a, b) {
  return !(
    b.x >= a.x + a.w ||
    b.x + b.w <= a.x ||
    b.y >= a.y + a.h ||
    b.y + b.h <= a.y
  );
}

function containsRect(a, b) {
  return (
    b.x >= a.x &&
    b.y >= a.y &&
    b.x + b.w <= a.x + a.w &&
    b.y + b.h <= a.y + a.h
  );
}

function splitFreeRect(free, used) {
  if (!rectanglesIntersect(free, used)) {
    return [free];
  }

  const newRects = [];

  // Left
  if (used.x > free.x) {
    newRects.push({
      x: free.x,
      y: free.y,
      w: used.x - free.x,
      h: free.h
    });
  }

  // Right
  if (used.x + used.w < free.x + free.w) {
    newRects.push({
      x: used.x + used.w,
      y: free.y,
      w: free.x + free.w - (used.x + used.w),
      h: free.h
    });
  }

  // Top
  if (used.y > free.y) {
    newRects.push({
      x: free.x,
      y: free.y,
      w: free.w,
      h: used.y - free.y
    });
  }

  // Bottom
  if (used.y + used.h < free.y + free.h) {
    newRects.push({
      x: free.x,
      y: used.y + used.h,
      w: free.w,
      h: free.y + free.h - (used.y + used.h)
    });
  }

  return newRects.filter(r => r.w > 0 && r.h > 0);
}

function pruneFreeRects(rects) {
  return rects.filter((rect, i) => {
    return !rects.some((other, j) => {
      return i !== j && containsRect(other, rect);
    });
  });
}

function findBestPosition(freeRects, photo) {
  let best = null;

  for (const free of freeRects) {
    const orientations = [
      { w: photo.w, h: photo.h, rotated: false },
      { w: photo.h, h: photo.w, rotated: true }
    ];

    for (const option of orientations) {
      if (option.w <= free.w && option.h <= free.h) {

        const leftoverX = free.w - option.w;
        const leftoverY = free.h - option.h;

        const shortSide = Math.min(leftoverX, leftoverY);
        const longSide = Math.max(leftoverX, leftoverY);

        if (
          !best ||
          shortSide < best.shortSide ||
          (
            shortSide === best.shortSide &&
            longSide < best.longSide
          )
        ) {
          best = {
            x: free.x,
            y: free.y,
            w: option.w,
            h: option.h,
            rotated: option.rotated,
            shortSide,
            longSide
          };
        }
      }
    }
  }

  return best;
}

function packOneSheet(items) {
  let freeRects = [
    {
      x: 0,
      y: 0,
      w: SHEET_WIDTH,
      h: SHEET_HEIGHT
    }
  ];

  const placed = [];
  const remaining = [];

  for (const item of items) {

    const paddedItem = {
      ...item,
      w: item.w + PHOTO_GAP,
      h: item.h + PHOTO_GAP
    };

    const position = findBestPosition(
      freeRects,
      paddedItem
    );

    if (!position) {
      remaining.push(item);
      continue;
    }

    const usedRect = {
      x: position.x,
      y: position.y,
      w: position.w,
      h: position.h
    };

    placed.push({
      ...item,
      x: position.x,
      y: position.y,
      rotated: position.rotated
    });

    let newFreeRects = [];

    for (const free of freeRects) {
      newFreeRects.push(
        ...splitFreeRect(free, usedRect)
      );
    }

    freeRects = pruneFreeRects(newFreeRects);
  }

  return {
    placed,
    remaining
  };
}


// ---------- ORDER BUILDER ----------

function buildPhotoItems() {

  const inputs = [
    ["wallet", "photoWallet"],
    ["2r", "photo2R"],
    ["3r", "photo3R"],
    ["4r", "photo4R"],
    ["5r", "photo5R"],
    ["6r", "photo6R"],
    ["a4", "photoA4"]
  ];

  const items = [];

  for (const [sizeName, inputId] of inputs) {

    const quantity = Math.max(
      0,
      Number(
        document.getElementById(inputId).value
      ) || 0
    );

    const size = PHOTO_SIZES[sizeName];

    for (let i = 0; i < quantity; i++) {

      items.push({
        type: sizeName,
        w: size.w,
        h: size.h,
        area: size.w * size.h
      });

    }
  }

  // Largest photos first = generally better packing
  items.sort((a, b) => b.area - a.area);

  return items;
}


// ---------- PACK MULTIPLE SHEETS ----------

function calculateRequiredSheets(items) {

  if (items.length === 0) {
    return {
      sheets: 0,
      totalArea: 0
    };
  }

  let remaining = [...items];
  let sheetCount = 0;

  while (remaining.length > 0) {

    const result = packOneSheet(remaining);

    // Safety check
    if (result.placed.length === 0) {
      sheetCount += remaining.length;
      break;
    }

    sheetCount++;
    remaining = result.remaining;
  }

  const totalArea = items.reduce(
    (sum, item) => sum + item.area,
    0
  );

  return {
    sheets: sheetCount,
    totalArea
  };
}


// ---------- MAIN CALCULATOR ----------

function calculatePhotoPrinting() {

  const items = buildPhotoItems();

  const totalPieces = items.length;

  const packing = calculateRequiredSheets(items);

  const sheets = packing.sheets;

  const photoTop =
    document.getElementById("photoTopFinish").value;

  const photoTopPerSheet =
    PHOTO_TOP_PRICES[photoTop];

  const baseTotal =
    sheets * PHOTO_SHEET_PRICE;

  const photoTopTotal =
    sheets * photoTopPerSheet;

  const finalTotal =
    baseTotal + photoTopTotal;


  document.getElementById(
    "photoTotalPieces"
  ).textContent =
    `${totalPieces} pcs`;


  document.getElementById(
    "photoSheetsUsed"
  ).textContent =
    sheets;


  document.getElementById(
    "photoBaseTotal"
  ).textContent =
    `₱${baseTotal.toFixed(2)}`;


  document.getElementById(
    "photoTopTotal"
  ).textContent =
    `₱${photoTopTotal.toFixed(2)}`;


  document.getElementById(
    "photoFinalTotal"
  ).textContent =
    `₱${finalTotal.toFixed(2)}`;


  // -------- UTILIZATION MESSAGE --------

  const message =
    document.getElementById(
      "photoUtilizationMessage"
    );


  if (sheets === 0) {

    message.textContent =
      "Choose your photo sizes to calculate your order.";

    return;
  }


  const totalSheetArea =
    sheets * SHEET_WIDTH * SHEET_HEIGHT;

  const utilization =
    packing.totalArea / totalSheetArea;

  const utilizationPercent =
    Math.round(utilization * 100);


  if (utilization < 0.65) {

    message.textContent =
      `💡 About ${utilizationPercent}% of your estimated sheet area is being used. You may still be able to add more photos and maximize your order.`;

  }

  else if (utilization < 0.85) {

    message.textContent =
      `👍 Estimated sheet utilization: ${utilizationPercent}%. There may still be room for additional smaller photos.`;

  }

  else {

    message.textContent =
      `✨ Estimated sheet utilization: ${utilizationPercent}%. Nice — you're making good use of your photo sheets!`;

  }
}


// ---------- MESSENGER ORDER ----------

function sendPhotoPrintingOrder() {

  const quantities = {
    Wallet: document.getElementById("photoWallet").value,
    "2R": document.getElementById("photo2R").value,
    "3R": document.getElementById("photo3R").value,
    "4R": document.getElementById("photo4R").value,
    "5R": document.getElementById("photo5R").value,
    "6R": document.getElementById("photo6R").value,
    A4: document.getElementById("photoA4").value
  };

  const selectedPhotos = Object.entries(quantities)
    .filter(([_, qty]) => Number(qty) > 0)
    .map(([size, qty]) => `${size}: ${qty} pc/s`)
    .join("\n");

  const finish =
    document.getElementById("photoTopFinish");

  const sheets =
    document.getElementById("photoSheetsUsed")
      .textContent;

  const total =
    document.getElementById("photoFinalTotal")
      .textContent;


  const orderDetails =
`TintaLab Photo Printing Inquiry

${selectedPhotos || "No photos selected"}

Estimated A4 Sheets: ${sheets}

PhotoTop: ${finish.options[finish.selectedIndex].text}

Estimated Total: ${total}

Files will be submitted ready to print. I understand that extensive editing may have additional charges.`;


  navigator.clipboard.writeText(orderDetails)
    .then(() => {

      alert(
        "Order details copied! Paste them into Messenger."
      );

      window.open(
        "https://m.me/61591481322961",
        "_blank"
      );

    });
}
// ========================================
// LAMINATION & PRINTED SIGNAGE CALCULATOR
// ========================================

const LAMINATION_PRICES = {
  id: {
    125: 10
  },
  wallet: {
    125: 15,
    250: 25
  },
  "3r": {
    125: 15,
    250: 30
  },
  "4r": {
    125: 20,
    250: 35
  },
  "5r": {
    125: 25,
    250: 40
  },
  a5: {
    125: 25,
    250: 40
  },
  a4: {
    125: 35,
    250: 60
  }
};

const SIGNAGE_PRICES = {
  basic: {
    125: 45,
    250: 65
  },
  premium: {
    125: 60,
    250: 80
  }
};

const SIGNAGE_DESIGN_FEE = 15;


// ---------- MODAL ----------

function openLaminationModal() {
  document.getElementById("laminationModal")
    .classList.add("active");

  updateLaminationFields();
}

function closeLaminationModal() {
  document.getElementById("laminationModal")
    .classList.remove("active");
}


// ---------- FIELD LOGIC ----------

function updateLaminationFields() {
  const service =
    document.getElementById("laminationService").value;

  const laminationOptions =
    document.getElementById("laminationOnlyOptions");

  const signageOptions =
    document.getElementById("signageOptions");

  const size =
    document.getElementById("laminationSize").value;

  const thickness =
    document.getElementById("laminationThickness");

  const idNote =
    document.getElementById("idLaminationNote");


  if (service === "lamination") {
    laminationOptions.style.display = "";
    signageOptions.style.display = "none";
  }

  if (service === "signage") {
    laminationOptions.style.display = "none";
    signageOptions.style.display = "";
  }


  // ID size = 125 microns only
  if (service === "lamination" && size === "id") {
    thickness.value = "125";
    thickness.disabled = true;
    idNote.style.display = "";
  } else {
    thickness.disabled = false;
    idNote.style.display = "none";
  }


  calculateLamination();
}


// ---------- CALCULATOR ----------

function calculateLamination() {

  const service =
    document.getElementById("laminationService").value;

  let basePrice = 0;
  let designFee = 0;

  const selectedService =
    document.getElementById("laminationSelectedService");

  const designRow =
    document.getElementById("laminationDesignRow");


  if (service === "lamination") {

    const size =
      document.getElementById("laminationSize").value;

    const thickness =
      document.getElementById("laminationThickness").value;

    basePrice =
      LAMINATION_PRICES[size]?.[thickness] || 0;

    selectedService.textContent =
      "Lamination Only";

    designRow.style.display = "none";

  }


  if (service === "signage") {

    const quality =
      document.getElementById("signageQuality").value;

    const thickness =
      document.getElementById("signageThickness").value;

    const design =
      document.getElementById("signageDesign").value;

    basePrice =
      SIGNAGE_PRICES[quality][thickness];

    designFee =
      design === "design"
        ? SIGNAGE_DESIGN_FEE
        : 0;

    selectedService.textContent =
      quality === "premium"
        ? "Premium Printed Signage"
        : "Basic Printed Signage";

    designRow.style.display =
      designFee > 0 ? "" : "none";
  }


  const finalTotal =
    basePrice + designFee;


  document.getElementById(
    "laminationBasePrice"
  ).textContent =
    `₱${basePrice.toFixed(2)}`;


  document.getElementById(
    "laminationDesignFee"
  ).textContent =
    `₱${designFee.toFixed(2)}`;


  document.getElementById(
    "laminationFinalTotal"
  ).textContent =
    `₱${finalTotal.toFixed(2)}`;
}


// ---------- MESSENGER ORDER ----------

function sendLaminationOrder() {

  const service =
    document.getElementById("laminationService").value;

  let details = "";
  let total =
    document.getElementById("laminationFinalTotal")
      .textContent;


  if (service === "lamination") {

    const size =
      document.getElementById("laminationSize");

    const thickness =
      document.getElementById("laminationThickness");

    details =
`TintaLab Lamination Inquiry

Service: Lamination Only
Size: ${size.options[size.selectedIndex].text}
Protection: ${thickness.options[thickness.selectedIndex].text}

Estimated Total: ${total}`;

  }


  if (service === "signage") {

    const quality =
      document.getElementById("signageQuality");

    const thickness =
      document.getElementById("signageThickness");

    const design =
      document.getElementById("signageDesign");

    details =
`TintaLab Printed & Laminated Signage Inquiry

Service: Printed & Laminated Signage
Print Quality: ${quality.options[quality.selectedIndex].text}
Protection: ${thickness.options[thickness.selectedIndex].text}
File / Design: ${design.options[design.selectedIndex].text}

Estimated Total: ${total}`;

  }


  navigator.clipboard.writeText(details)
    .then(() => {

      alert(
        "Order details copied! Paste them into Messenger."
      );

      window.open(
        "https://m.me/61591481322961",
        "_blank"
      );

    });
}
// ========================================
// ID SIZE BAG TAGS CALCULATOR
// ========================================

const BAG_TAG_PRICES = {
  regular: {
    qty: 1,
    total: 35
  },

  studentBundle: {
    qty: 3,
    total: 100
  },

  bundle10: {
    qty: 10,
    total: 300
  },

  reseller: {
    qty: 10,
    total: 250
  },

  custom: {
    qty: 10,
    total: 300
  }
};


// ---------- MODAL ----------

function openBagTagsModal() {
  document.getElementById("bagTagsModal")
    .classList.add("active");

  updateBagTagFields();
}

function closeBagTagsModal() {
  document.getElementById("bagTagsModal")
    .classList.remove("active");
}


// ---------- FIELD LOGIC ----------

function updateBagTagFields() {

  const orderType =
    document.getElementById("bagTagOrderType").value;

  const quantityField =
    document.getElementById("bagTagQuantityField");

  const quantityInput =
    document.getElementById("bagTagQuantity");

  const designInfo =
    document.getElementById("bagTagAvailableDesignInfo");

  const customInfo =
    document.getElementById("bagTagCustomInfo");

  const resellerInfo =
    document.getElementById("bagTagResellerInfo");


  // Regular order allows custom quantity
  if (orderType === "regular") {

    quantityField.style.display = "";
    quantityInput.disabled = false;

    if (Number(quantityInput.value) < 1) {
      quantityInput.value = 1;
    }

  } else {

    quantityField.style.display = "none";
    quantityInput.disabled = true;

  }


  // Available designs
  designInfo.style.display =
    orderType === "custom" ? "none" : "";


  // Custom image instructions
  customInfo.style.display =
    orderType === "custom" ? "" : "none";


  // Reseller instructions
  resellerInfo.style.display =
    orderType === "reseller" ? "" : "none";


  calculateBagTags();
}


// ---------- CALCULATOR ----------

function calculateBagTags() {

  const orderType =
    document.getElementById("bagTagOrderType").value;

  const attachment =
    document.getElementById("bagTagAttachment");

  let quantity = 1;
  let total = 35;
  let regularEquivalent = 35;


  if (orderType === "regular") {

    quantity = Math.max(
      1,
      Number(
        document.getElementById("bagTagQuantity").value
      ) || 1
    );

    total = quantity * 35;

    regularEquivalent = total;

  } else {

    quantity =
      BAG_TAG_PRICES[orderType].qty;

    total =
      BAG_TAG_PRICES[orderType].total;

    regularEquivalent =
      quantity * 35;

  }


  const savings =
    Math.max(
      0,
      regularEquivalent - total
    );


  // DISPLAY QUANTITY

  document.getElementById(
    "bagTagPieces"
  ).textContent =
    `${quantity} pc${quantity > 1 ? "s" : ""}`;


  // DISPLAY ATTACHMENT

  document.getElementById(
    "bagTagAttachmentDisplay"
  ).textContent =
    attachment.options[
      attachment.selectedIndex
    ].text;


  // SAVINGS

  const savingsRow =
    document.getElementById(
      "bagTagSavingsRow"
    );

  if (savings > 0) {

    savingsRow.style.display = "";

    document.getElementById(
      "bagTagSavings"
    ).textContent =
      `₱${savings.toFixed(2)}`;

  } else {

    savingsRow.style.display = "none";

  }


  // TOTAL

  document.getElementById(
    "bagTagFinalTotal"
  ).textContent =
    `₱${total.toFixed(2)}`;


  // MESSAGE

  const message =
    document.getElementById(
      "bagTagPriceMessage"
    );


  if (orderType === "studentBundle") {

    message.textContent =
      "🎓 Student Bundle: 3 personalized bag tags for ₱100.";

  }

  else if (orderType === "bundle10") {

    message.textContent =
      "✨ 10-piece bundle saves you ₱50 compared with regular pricing.";

  }

  else if (orderType === "reseller") {

    message.textContent =
      "💼 Reseller cost: ₱25 per tag. Potential profit: up to ₱100 when sold at ₱35 each.";

  }

  else if (orderType === "custom") {

    message.textContent =
      "🖼️ Custom image batch: minimum 10 tags. Different images may be submitted.";

  }

  else {

    message.textContent =
      "Regular price: ₱35 per personalized bag tag.";

  }

}


// ---------- MESSENGER ORDER ----------

function sendBagTagOrder() {

  const orderType =
    document.getElementById("bagTagOrderType");

  const attachment =
    document.getElementById("bagTagAttachment");

  const pieces =
    document.getElementById("bagTagPieces")
      .textContent;

  const total =
    document.getElementById("bagTagFinalTotal")
      .textContent;


  const details =
`TintaLab ID-Size Bag Tag Inquiry

Order: ${orderType.options[orderType.selectedIndex].text}
Quantity: ${pieces}
Attachment: ${attachment.options[attachment.selectedIndex].text}

Estimated Total: ${total}

I will send my selected design/theme or custom images through Messenger.`;


  navigator.clipboard.writeText(details)
    .then(() => {

      alert(
        "Order details copied! Paste them into Messenger."
      );

      window.open(
        "https://m.me/61591481322961",
        "_blank"
      );

    });

}