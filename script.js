// -------------------- DATA --------------------
// Menu items (zëvendësoji me fotot tuaja reale)
const menuItems = [
    { id: 1, name: "Tavë Dheu", category: "traditional", desc: "Qengji i pjekur ngadalë me perime, i servirur në tavë balte", price: "€12.90", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { id: 2, name: "Flia", category: "traditional", desc: "Peta tradicionale e shtresuar, e përgatitur me 12 shtresa", price: "€8.50", img: "https://images.unsplash.com/photo-1627661925665-8f4e861405cc?w=400" },
    { id: 3, name: "Qebaptë e Gjakovës", category: "traditional", desc: "Tre çifte qebapësh të shijshëm me qepë dhe leqen", price: "€7.90", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" },
    { id: 4, name: "Raki e Manastirit", category: "drinks", desc: "Raki rrushi e vjetëruar 5 vjet", price: "€3.50", img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400" },
    { id: 5, name: "Limonatë e freskët", category: "drinks", desc: "Limonatë natyrale me nenexhik", price: "€2.90", img: "https://images.unsplash.com/photo-1546171753-97d9d0eac3e4?w=400" },
    { id: 6, name: "Trileqe", category: "dessert", desc: "Ëmbëlsira më e famshme shqiptare me tri qumështa", price: "€4.00", img: "https://images.unsplash.com/photo-1563729784474-e77d69ac5a1e?w=400" },
    { id: 7, name: "Kadaif me arra", category: "dessert", desc: "Kadaif i pjekur me arra dhe shurup", price: "€4.50", img: "https://images.unsplash.com/photo-1571847140471-1d7766a0d4fe?w=400" }
];

// Galeria (vendosni URL-të e postimeve tuaja në Instagram)
const galleryImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600"
];

// Dëshmitë e klientëve
const testimonials = [
    { name: "Arbër Z.", role: "Mysafir i rregullt", text: "Ambienti i ngrohtë dhe ushqimi i shkëlqyer! Tavë dheu është specialiteti im i preferuar. Patjetër do të kthehem.", rating: 5, img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Gresa H.", role: "Food blogger", text: "Një përvojë autentike e kuzhinës veriore. Flia e Tavernës Gegë është më e mira që kam provuar ndonjëherë.", rating: 5, img: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Luan M.", role: "Biznesmen", text: "Shërbim i shpejtë, staf i sjellshëm dhe çmime të arsyeshme. E rekomandoj për darka pune.", rating: 4, img: "https://randomuser.me/api/portraits/men/3.jpg" }
];

// -------------------- RENDER MENU WITH FILTER --------------------
function renderMenu(filter = "all") {
    const container = document.getElementById("menu-grid");
    if (!container) return;
    const filtered = filter === "all" ? menuItems : menuItems.filter(item => item.category === filter);
    container.innerHTML = filtered.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span class="price">${item.price}</span>
        </div>
    `).join("");
    // Shto event listener për klikim në menu-item (opsionale për modal)
    document.querySelectorAll('.menu-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = parseInt(el.dataset.id);
            const item = menuItems.find(i => i.id === id);
            if (item) showModal(item);
        });
    });
}

function setupFilters() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderMenu(btn.dataset.filter);
        });
    });
}

// Modal për detaje të pjatës
function showModal(item) {
    let modal = document.getElementById("itemModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "itemModal";
        modal.className = "modal";
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3></h3>
                <p></p>
                <span class="price"></span>
                <button class="btn btn-primary close-modal-btn">Mbylle</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector(".close-modal").onclick = () => modal.style.display = "none";
        modal.querySelector(".close-modal-btn").onclick = () => modal.style.display = "none";
    }
    modal.querySelector("h3").innerText = item.name;
    modal.querySelector("p").innerText = item.desc;
    modal.querySelector(".price").innerText = item.price;
    modal.style.display = "flex";
}

// -------------------- GALLERY LIGHTBOX --------------------
function renderGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid) return;
    galleryGrid.innerHTML = galleryImages.map((img, idx) => `
        <a href="${img}" data-lightbox="gallery" data-title="Taverna Gegë - Foto ${idx+1}">
            <img src="${img}" alt="Galeria e Tavernës Gegë" loading="lazy">
        </a>
    `).join("");
}

// -------------------- TESTIMONIALS SWIPER --------------------
function initTestimonialsSwiper() {
    const wrapper = document.getElementById("testimonials-wrapper");
    if (!wrapper) return;
    wrapper.innerHTML = testimonials.map(t => `
        <div class="swiper-slide">
            <div class="testimonial-card">
                <img src="${t.img}" alt="${t.name}">
                <div class="stars">
                    ${Array(t.rating).fill('<i class="fas fa-star"></i>').join('')}
                    ${Array(5-t.rating).fill('<i class="far fa-star"></i>').join('')}
                </div>
                <p>"${t.text}"</p>
                <h4>${t.name}</h4>
                <small>${t.role}</small>
            </div>
        </div>
    `).join('');
    new Swiper('.testimonial-swiper', {
        loop: true,
        autoplay: { delay: 4000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        slidesPerView: 1,
        breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
}

// -------------------- WHATSAPP RESERVATION --------------------
function setupReservation() {
    const form = document.getElementById("reservationForm");
    if (!form) return;
    const RESTAURANT_PHONE = "38344123456"; // Zëvendëso me numrin real të Tavernës Gegë
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("resName").value.trim();
        const phone = document.getElementById("resPhone").value.trim();
        const date = document.getElementById("resDate").value;
        const time = document.getElementById("resTime").value;
        const guests = document.getElementById("resGuests").value;
        const message = document.getElementById("resMessage").value.trim();
        
        if (!name || !phone || !date || !time || !guests) {
            alert("Ju lutemi plotësoni të gjitha fushat e detyrueshme.");
            return;
        }
        
        let waMsg = `🔴 *Kërkesë rezervimi - Taverna Gegë* 🔴%0A`;
        waMsg += `👤 Emri: ${name}%0A`;
        waMsg += `📞 Telefon: ${phone}%0A`;
        waMsg += `📅 Data: ${date}%0A`;
        waMsg += `⏰ Ora: ${time}%0A`;
        waMsg += `👥 Të ftuar: ${guests}%0A`;
        if (message) waMsg += `💬 Kërkesa: ${message}%0A`;
        waMsg += `%0A_Kontakto klientin për konfirmim._`;
        
        window.open(`https://wa.me/${RESTAURANT_PHONE}?text=${waMsg}`, "_blank");
    });
}

// -------------------- COUNTDOWN (Oferta e ditës deri në ora 21:00) --------------------
function startCountdown() {
    const el = document.getElementById("countdown");
    if (!el) return;
    let target = new Date();
    target.setHours(21, 0, 0, 0);
    if (new Date() > target) target.setDate(target.getDate() + 1);
    
    function update() {
        const diff = target - new Date();
        if (diff <= 0) { el.textContent = "🔔 Oferta aktive tani!"; return; }
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `${h}h ${m}m ${s}s`;
    }
    update();
    setInterval(update, 1000);
}

// -------------------- DARK/LIGHT MODE --------------------
function setupTheme() {
    const toggle = document.getElementById("themeToggle");
    const body = document.body;
    const saved = localStorage.getItem("theme");
    if (saved === "dark") body.classList.add("dark");
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
        const icon = toggle.querySelector("i");
        if (body.classList.contains("dark")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
    if (body.classList.contains("dark")) {
        toggle.querySelector("i").classList.remove("fa-moon");
        toggle.querySelector("i").classList.add("fa-sun");
    }
}

// -------------------- FLOATING WHATSAPP --------------------
function setupFloatWA() {
    const btn = document.getElementById("whatsappFloat");
    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            window.open("https://wa.me/38344123456?text=Përshëndetje!%20Dua%20të%20rezervoj%20një%20tryezë.", "_blank");
        });
    }
}

// -------------------- MOBILE NAVIGATION --------------------
function setupMobileNav() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            burger.classList.toggle("toggle");
        });
    }
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("active"));
    });
}

// -------------------- SCROLL REVEAL (AOS) --------------------
function initAOS() {
    AOS.init({ duration: 800, once: true, offset: 100 });
}

// -------------------- SMOOTH SCROLL (për lidhjet #) --------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

// -------------------- INIT ALL --------------------
document.addEventListener("DOMContentLoaded", () => {
    renderMenu("all");
    renderGallery();
    setupFilters();
    setupReservation();
    startCountdown();
    setupTheme();
    setupFloatWA();
    setupMobileNav();
    initAOS();
    initTestimonialsSwiper();
    // Inicializo Lightbox (libri i jashtëm)
    if (typeof lightbox !== 'undefined') lightbox.option({ resizeDuration: 200, wrapAround: true });
});
