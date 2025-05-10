gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
// =======================================================
// Animation 
console.clear(); 

window.addEventListener("load", () => {
    // Hero animation
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".navHero__wrapper",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
            markers: false
        }
    });
    heroTl.to(".navHero__animation__container img", {
        scale: 5,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut"    
    })

    // Exhibition animation
    const submarineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".exhibition__scroll",
          start: "top top",
          scrub: true,
          pin: true,
          markers: false
        }
    });

    const segments = [
        {start: 0, end: 0.2, card: 1},
        {start: 0.2, end: 0.5, card: 2},
        {start: 0.5, end: 0.75, card: 3},
        {start: 0.75, end: 1, card: 4}
    ];

    segments.forEach(({start, end, card}) => {
        submarineTl.to(".submarine", {
          motionPath: {
            path: ".path",
            align: ".path",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start,
            end
          },
          onStart: () => showCard(card)
        });
    });

    function showCard(num) {
        gsap.to(".exhibition__card", {
            opacity: 0, 
            duration: 0.2
        });
        gsap.to(`.card${num}`, {
            opacity: 1, 
            duration: 0.5
        });
    }

    // Meet friends animation
    ScrollTrigger.create({
        trigger: ".carousel__container",
        start: "center 70%",
        onEnter: () => renderCarousel()
    });
});

// =======================================================
// Meet friends section
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