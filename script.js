// -------------------- DATA --------------------
const menuItems = [
    { id: 1, name: "Tavë kosi", category: "food", desc: "Qengji i pjekur me kos dhe oriz", price: "€9.90", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { id: 2, name: "Byrek me spinaq", category: "food", desc: "Byrek i freskët i punuar dore", price: "€4.50", img: "https://images.unsplash.com/photo-1627661925665-8f4e861405cc?w=400" },
    { id: 3, name: "Peshk i pjekur", category: "food", desc: "Peshk deti me perime sezonale", price: "€14.90", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" },
    { id: 4, name: "Raki e zezë", category: "drinks", desc: "Pije tradicionale 0.2L", price: "€3.50", img: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400" },
    { id: 5, name: "Mocktail tropical", category: "drinks", desc: "Pije freskuese pa alkool", price: "€5.00", img: "https://images.unsplash.com/photo-1546171753-97d9d0eac3e4?w=400" },
    { id: 6, name: "Trileqe", category: "dessert", desc: "Ëmbëlsirë e pazëvendësueshme", price: "€3.80", img: "https://images.unsplash.com/photo-1563729784474-e77d69ac5a1e?w=400" }
];

const galleryImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=600"
];

// -------------------- RENDER MENU & FILTERS --------------------
function renderMenu(filter = "all") {
    const container = document.getElementById("menu-grid");
    if (!container) return;
    const filtered = filter === "all" ? menuItems : menuItems.filter(item => item.category === filter);
    container.innerHTML = filtered.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span class="price">${item.price}</span>
        </div>
    `).join("");
}

function setupFilters() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");
            renderMenu(filter);
        });
    });
}

// -------------------- GALLERY LIGHTBOX --------------------
function renderGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid) return;
    galleryGrid.innerHTML = galleryImages.map((img, idx) => `
        <a href="${img}" data-lightbox="restaurant-gallery" data-title="Foto ${idx+1}">
            <img src="${img}" alt="Galeria" loading="lazy">
        </a>
    `).join("");
}

// -------------------- WHATSAPP RESERVATION --------------------
function setupReservation() {
    const form = document.getElementById("reservationForm");
    if (!form) return;

    // Numri i restorantit (zëvendëso me numrin real)
    const RESTAURANT_PHONE = "38344123456";  // Vetëm numrat, pa + ose hapësira

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

        // Formatimi i mesazhit për WhatsApp
        let waMessage = `🟡 *Kërkesë e re rezervimi* 🟡%0A`;
        waMessage += `👤 Emri: ${name}%0A`;
        waMessage += `📞 Telefon: ${phone}%0A`;
        waMessage += `📅 Data: ${date}%0A`;
        waMessage += `⏰ Ora: ${time}%0A`;
        waMessage += `👥 Të ftuar: ${guests}%0A`;
        if (message) waMessage += `💬 Kërkesa speciale: ${message}%0A`;
        waMessage += `%0A_A pranoni këtë rezervim?_%0A`;
        waMessage += `Përgjigjuni këtij klienti direkt në numrin e tij: ${phone}`;

        const waUrl = `https://wa.me/${RESTAURANT_PHONE}?text=${waMessage}`;
        window.open(waUrl, "_blank");
    });
}

// -------------------- COUNTDOWN (Special of the day) --------------------
function startCountdown() {
    const countdownEl = document.getElementById("countdown");
    if (!countdownEl) return;
    // Target ora 21:00 çdo ditë
    const now = new Date();
    let target = new Date();
    target.setHours(21, 0, 0, 0);
    if (now > target) target.setDate(target.getDate() + 1);
    
    function update() {
        const diff = target - new Date();
        if (diff <= 0) {
            countdownEl.textContent = "Oferta aktive tani! 🎉";
            return;
        }
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
    }
    update();
    setInterval(update, 1000);
}

// -------------------- DARK/LIGHT MODE --------------------
function setupThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") body.classList.add("dark");
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
        // Ndrysho ikonën
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

// -------------------- FLOATING WHATSAPP BUTTON --------------------
function setupFloatWhatsApp() {
    const btn = document.getElementById("whatsappFloat");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const phone = "38344123456"; // i njejti numer
        window.open(`https://wa.me/${phone}?text=Përshëndetje!%20Dëshiroj%20të%20bëj%20një%20rezervim.`, "_blank");
    });
}

// -------------------- MOBILE NAV --------------------
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
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}

// -------------------- SCROLL REVEAL (AOS) --------------------
function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// -------------------- SMOOTH SCROLL --------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// -------------------- INIT ALL --------------------
document.addEventListener("DOMContentLoaded", () => {
    renderMenu("all");
    renderGallery();
    setupFilters();
    setupReservation();
    startCountdown();
    setupThemeToggle();
    setupFloatWhatsApp();
    setupMobileNav();
    initAOS();
});
