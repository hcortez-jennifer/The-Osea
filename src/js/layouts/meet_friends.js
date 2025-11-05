import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
    ScrollTrigger.create({
        trigger: ".carousel__container",
        start: "center 70%",
        onEnter: () => renderCarousel(),
    });
});

const carouselItems = document.querySelectorAll('.carousel__item');
const circles = document.querySelectorAll('.scroll__indicator-carousel .circle');

let current = 0;

function renderCarousel() {
    carouselItems.forEach((item, i) => {
        const offset = ((i - current + carouselItems.length) % carouselItems.length);
        const logicalOffset = offset > carouselItems.length / 2 ? offset - carouselItems.length : offset;
        const angle = logicalOffset * 45;
        const x = logicalOffset * 400;
        const z = -Math.abs(logicalOffset) * 150;
        const scale = 1 - Math.abs(logicalOffset) * 0.05;

        if(Math.abs(logicalOffset) > 2) {
            gsap.to(item, {
                duration: 0.5,
                opacity: 0,
                zIndex: 0,
                pointerEvents: 'none',
            });
        } else {
            gsap.to(item, {
                duration: 0.6,
                opacity: 1,
                x: x,
                z: z,
                scale: scale,
                rotationY: angle,
                ease: "power3.out",
                zIndex: 10 - Math.abs(logicalOffset),
                transformOrigin: "center center",
                pointerEvents: 'auto',
            });
        }
    });

    circles.forEach((circle, i) => {
        circle.classList.toggle('active', i === current);
    });
}

circles.forEach((circle, i) => {
    circle.addEventListener('click', () => {
        current = i;
        renderCarousel()
    });
});

let startX = 0;
let isDragging = false;
const dragThreshold = 50;

const carousel = document.querySelector('.carousel__track');

carousel.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX || e.touches?.[0]?.clientX || 0;
    carousel.setPointerCapture(e.pointerId);
});

carousel.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
  
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    const diffX = currentX - startX;
});

carousel.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const diffX = endX - startX;

    if (Math.abs(diffX) > dragThreshold) {
        if (diffX < 0) {
            current = (current + 1) % carouselItems.length;
        } else {
            current = (current - 1 + carouselItems.length) % carouselItems.length;
        }
        renderCarousel();
    }
});