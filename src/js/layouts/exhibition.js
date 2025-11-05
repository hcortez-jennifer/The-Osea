import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// Exhibition animation
 const segments = [
    {start: 0, end: 0.2, card: 1},
    {start: 0.2, end: 0.5, card: 2},
    {start: 0.5, end: 0.75, card: 3},
    {start: 0.75, end: 1, card: 4}
];

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

export function exhibitionAnimation(){
    const submarineTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".exhibition__scroll",
            start: "top top",
            scrub: true,
            pin: true,
            markers: false
        }
    });

    submarineTl.from(".exhibition__header", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power2.out"
    })

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

    showCard(num);
}