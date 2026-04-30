// Menu data
const menuItems = [
    { name: "Tavë kosi", desc: "Tavë kosi me qengji e oriz", price: "€9.90", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" },
    { name: "Byrek me spinaq", desc: "Byrek i freskët i punuar dore", price: "€4.50", img: "https://images.unsplash.com/photo-1627661925665-8f4e861405cc?w=400" },
    { name: "Peshk i pjekur", desc: "Peshk i freskët me perime stinore", price: "€14.90", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400" }
];

// Gallery images (vendos foton e restorantit tend)
const galleryImages = [
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500",
    "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=500"
];

function loadMenu() {
    const container = document.getElementById('menu-grid');
    if(!container) return;
    container.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <span class="price">${item.price}</span>
        </div>
    `).join('');
}

function loadGallery() {
    const container = document.getElementById('gallery-grid');
    if(!container) return;
    container.innerHTML = galleryImages.map(img => `
        <div><img src="${img}" alt="Galeria" loading="lazy"></div>
    `).join('');
}

// Burger menu
function setupMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if(burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }
}

// Smooth scroll për linket
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Mbyll menunë mobile nëse është e hapur
                document.querySelector('.nav-links')?.classList.remove('active');
            }
        });
    });
}

// Form kontakti (simulim)
function setupContactForm() {
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Faleminderit! Ne do t\'ju përgjigjemi sa më shpejt (demo).');
            form.reset();
        });
    }
}

// Inicimi
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    loadGallery();
    setupMobileNav();
    setupSmoothScroll();
    setupContactForm();
});
