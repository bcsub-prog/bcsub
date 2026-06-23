// ================================================
// BC Sub — Premium Script v2
// Particles, tilt effects, staggered animations
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCardInteractions();
    initStaggeredEntrance();
});

// ================================================
// Floating Particles — Gradient dots
// ================================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = [
        { bg: 'rgba(0, 119, 204, 0.25)', glow: 'rgba(0, 119, 204, 0.15)' },
        { bg: 'rgba(0, 163, 224, 0.2)',  glow: 'rgba(0, 163, 224, 0.12)' },
        { bg: 'rgba(0, 180, 160, 0.2)',  glow: 'rgba(0, 180, 160, 0.12)' },
        { bg: 'rgba(76, 182, 72, 0.22)', glow: 'rgba(76, 182, 72, 0.13)' },
        { bg: 'rgba(123, 193, 66, 0.18)', glow: 'rgba(123, 193, 66, 0.1)' },
    ];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 18 + 12;
        const delay = Math.random() * 8;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color.bg};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 4}px ${color.glow};
        `;

        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    const count = window.innerWidth < 480 ? 18 : 30;
    for (let i = 0; i < count; i++) {
        createParticle();
    }
}

// ================================================
// Interactive Tilt + Magnetic Effect
// ================================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.link-card, .seller-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = (y - centerY) / centerY * 3;
            const tiltY = (centerX - x) / centerX * 3;

            const baseTransform = card.classList.contains('link-card')
                ? 'translateY(-4px) scale(1.02)'
                : 'translateY(-3px) scale(1.01)';

            card.style.transform = `${baseTransform} perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ================================================
// Staggered Entrance Animation
// ================================================
function initStaggeredEntrance() {
    const cards = document.querySelectorAll('.link-card, .seller-card');

    cards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px) scale(0.97)';

        setTimeout(() => {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, 400 + (index * 120));
    });
}
