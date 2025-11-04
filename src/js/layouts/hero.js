import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function headerAnimation() {
    const animationTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".header__wrapper",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
            markers: false
        }
    });

    animationTl.to(".header__animation__container img", {
        scale: 6,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut"
    })

    animationTl.from(".hero__content > *", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power2.out"
    }, ">")
}