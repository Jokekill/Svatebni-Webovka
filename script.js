// Odpočet do svatby
const weddingDate = new Date("August 23, 2025 10:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Výpočet dnů, hodin, minut a sekund
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Aktualizace hodnot v HTML
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    // Pokud odpočet skončil
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<h2>Dnes je náš velký den!</h2>";
    }
}

// Aktualizace odpočtu každou sekundu
const countdownInterval = setInterval(updateCountdown, 1000);

// Spuštění odpočtu ihned po načtení stránky
updateCountdown();

// Mobilní menu
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animace hamburger menu
    const bars = document.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'rotate(0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0)';
    }
});

// Zavření menu po kliknutí na odkaz
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'rotate(0)';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'rotate(0)';
    });
});

// Změna barvy navigace při scrollování
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Galerie a lightbox
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Zamezení scrollování stránky
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Povolení scrollování stránky
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Cyklické procházení obrázků
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    lightboxImg.src = galleryImages[currentImageIndex].src;
}

// Zavření lightboxu klávesou Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

// RSVP formulář
const rsvpForm = document.getElementById('rsvp-form');
const formSuccess = document.getElementById('form-success');
const attendingRadios = document.querySelectorAll('input[name="attending"]');
const guestsGroup = document.getElementById('guests-group');

// Zobrazení/skrytí pole pro počet hostů podle odpovědi
attendingRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'yes') {
            guestsGroup.style.display = 'block';
        } else {
            guestsGroup.style.display = 'none';
        }
    });
});

// Zpracování formuláře
rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Zde by normálně byl kód pro odeslání dat na server
    // Pro účely ukázky jen zobrazíme potvrzení
    
    rsvpForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Scrollování k potvrzení
    formSuccess.scrollIntoView({ behavior: 'smooth' });
});

// Plynulé scrollování na odkazy v navigaci
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
