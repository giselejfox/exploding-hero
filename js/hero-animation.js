gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const objs = [
    document.querySelector(".hero-obj-1"),
    document.querySelector(".hero-obj-2"),
    document.querySelector(".hero-obj-3"),
    document.querySelector(".hero-obj-4"),
    document.querySelector(".hero-obj-5")
];

// initial offset
gsap.set(objs, { y: 100 });
gsap.set(objs[1], { y: 25 });
gsap.set(objs[2], { y: 55 });

// scale factor for paths
const screenScale = window.innerWidth / 1440; // assuming 1440px as base width

const objConfigs = [
    { el: objs[0], path: [{ x: -140, y: -180 }, { x: -200, y: -320 }], curviness: 1.1 },
    { el: objs[1], path: [{ x: -40, y: -220 }, { x: -90, y: -530 }], curviness: 0.85 },
    { el: objs[2], path: [{ x: 30, y: -260 }, { x: 60, y: -690 }], curviness: 1.3 },
    { el: objs[3], path: [{ x: 90, y: -190 }, { x: 110, y: -360 }], curviness: 0.6 },
    { el: objs[4], path: [{ x: 180, y: -140 }, { x: 220, y: -170 }], curviness: 0.9 }
];

// scale paths
objConfigs.forEach(obj => {
    obj.path = obj.path.map(p => ({ x: p.x * screenScale, y: p.y * screenScale }));
});

// shared timeline
const tl = gsap.timeline({
    immediateRender: false,
    scrollTrigger: {
        trigger: ".hero",
        start: "bottom bottom",
        end: "+=300",
        scrub: 0.4,
        pin: true,
        anticipatePin: 1,
    }
});

objConfigs.forEach(({ el, path, curviness }) => {
    tl.to(el, {
        motionPath: { path, curviness, autoRotate: false },
        clearProps: "transform"
    }, 0);
});
