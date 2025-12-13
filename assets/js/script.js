
// SWIPER SETUP
var swiper = new Swiper(".myBannerSwiper", {
  effect: "fade",
  loop: true,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },


  speed: 800,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// GSAP animation on slide change
swiper.on("slideChangeTransitionStart", function () {
  const activeSlide = document.querySelector(".swiper-slide-active");
  if (!activeSlide) return;

  const bannerImg = activeSlide.querySelector(".banner-img");
  const bannerText = activeSlide.querySelector(".banner-text");
  const bannerBtn = activeSlide.querySelector(".banner-btn");

  // Kill previous tweens
  gsap.killTweensOf([bannerImg, bannerText, bannerBtn]);

  // IMAGE — luxury vertical reveal mask
  gsap.fromTo(
    bannerImg,
    {
      clipPath: "inset(100% 0% 0% 0%)",
      y: 40,
    },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      y: 0,
      duration: 1.8,
      ease: "power4.out",
    }
  );

  // IMAGE — subtle depth float (runs in parallel)
  gsap.fromTo(
    bannerImg,
    {
      scale: 1.03,
    },
    {
      scale: 1,
      duration: 3,
      ease: "power2.out",
    }
  );

  // TEXT — diagonal cinematic entrance
  gsap.fromTo(
    bannerText,
    {
      x: -40,
      y: 40,
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.4,
      ease: "power3.out",
    }
  );

  // BUTTON — confident delayed reveal
  gsap.fromTo(
    bannerBtn,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay: 0.9,
      ease: "power2.out",
    }
  );
});

// third sdection swiper
// Swiper init
var gsapSwiper = new Swiper(".myGsapSwiper", {
  effect: "fade",
  loop: true,

  // makes fade transitions smoother and avoids jumpy loops
  fadeEffect: {
    crossFade: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  speed: 900,

  pagination: {
    el: ".gsap-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".gsap-next",
    prevEl: ".gsap-prev",
  },

  // Trigger GSAP on init and on slide changes
  on: {
    init: function () {
      animateActiveSlide(this);
    },
    slideChangeTransitionStart: function () {
      animateActiveSlide(this);
    },
  },
});

// GSAP animation function
function animateActiveSlide(swiper) {
  // get the REAL active slide (works fine with loop + clones)
  const activeSlide = swiper.slides[swiper.activeIndex];

  const activeImage   = activeSlide.querySelector(".gsap-slide-image");
  const activeHeading = activeSlide.querySelector("h2");
  const activePara    = activeSlide.querySelector("p");
  const activeLink    = activeSlide.querySelector(".slide-link");

  if (!activeImage && !activeHeading && !activePara && !activeLink) return;

  // kill any previous tweens on these elements to avoid stacking animations
  gsap.killTweensOf([activeImage, activeHeading, activePara, activeLink]);

  // base state for content
  gsap.set([activeHeading, activePara, activeLink], {
    opacity: 0,
    y: 40,
  });

  // base state for image
  if (activeImage) {
    gsap.set(activeImage, {
      scale: 1.08,
      opacity: 0,
    });
  }

  // timeline for smoother, coordinated animation
  const tl = gsap.timeline();

  // Image zoom / fade
  if (activeImage) {
    tl.to(activeImage, {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
    });
  }

  // Heading
  if (activeHeading) {
    tl.to(
      activeHeading,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.8" 
    );
  }

  // Paragraph
  if (activePara) {
    tl.to(
      activePara,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );
  }

  // Link / button
  if (activeLink) {
    tl.to(
      activeLink,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );
  }
}



// 4th section slider 

var textImageSwiper = new Swiper(".text-image-swiper", {
  direction: "vertical", 
  loop: false,           
  speed: 800,
  slidesPerView: 1,

  mousewheel: {
    enabled: true,
    sensitivity: 0.8,
    releaseOnEdges: true, 
  },

    autoplay: {
    delay: 3000,                
    disableOnInteraction: false 
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// TEXT ANIMATION
textImageSwiper.on("slideChangeTransitionStart", function () {
  const activeSlide = document.querySelector(
    ".text-image-swiper .swiper-slide-active"
  );

  const titleEl = document.querySelector(".text-title");
  const descEl = document.querySelector(".text-description");

  gsap.to([titleEl, descEl], {
    opacity: 0,
    y: 20,
    duration: 0.3,
    onComplete: () => {
      titleEl.textContent = activeSlide.dataset.title;
      descEl.textContent = activeSlide.dataset.desc;

      gsap.fromTo(
        [titleEl, descEl],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    },
  });
});


// parallax effect

// window.addEventListener("load", () => {
//   const slides = [...document.querySelectorAll(".para-item")];
//   const slowSlides = new Set([0, 2]); 

//   let viewportHeight = window.innerHeight;
//   let isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

//   let currentScroll = window.scrollY;
//   let targetScroll = window.scrollY;
//   let scrollVelocity = 0;

//   const lerp = (a, b, n) => a + (b - a) * n;
//   const cinematicEase = (t) => Math.sin(t * Math.PI * 0.5);

//   let slideData = [];

//   function measure() {
//     viewportHeight = window.innerHeight;
//     isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

//     slideData = slides.map((slide) => {
//       const rect = slide.getBoundingClientRect();
//       return {
//         img: slide.querySelector(".para-img"),
//         top: rect.top + window.scrollY,
//         height: rect.height,
//         speed: parseFloat(slide.dataset.speed || 0.22),
//         depth: parseFloat(slide.dataset.depth || 1),
//       };
//     });
//   }

//   measure();

//   function raf() {
//     const prevScroll = currentScroll;
//     currentScroll = lerp(
//       currentScroll,
//       targetScroll,
//       isMobile ? 0.18 : 0.1
//     );
//     scrollVelocity = currentScroll - prevScroll;

//     slideData.forEach((item, index) => {
//       if (!item.img) return;

//       const start = item.top - viewportHeight;
//       const end = item.top + item.height;

//       let progress = (currentScroll - start) / (end - start);
//       progress = Math.min(Math.max(progress, 0), 1);

//       const centerWeight = 1 - Math.abs(progress - 0.5) * 2;
//       const focus = cinematicEase(Math.max(0, centerWeight));

//       let depth = item.depth;
//       if (slowSlides.has(index)) depth *= 0.6;

//       const y =
//         (progress - 0.5) * 110 * item.speed * depth * focus;

//       const inertia = Math.max(
//         Math.min(scrollVelocity * 0.15, 6),
//         -6
//       );

//       if (isMobile) {
//         item.img.style.transform = `
//           translate3d(0, ${y + inertia}%, 0)
//         `;
//       } else {
//         const scale = 1 + focus * 0.035; 

//         item.img.style.transform = `
//           translate3d(0, ${y + inertia}%, 0)
//           scale(${scale})
//         `;
//       }
//     });

//     requestAnimationFrame(raf);
//   }

//   window.addEventListener(
//     "scroll",
//     () => {
//       targetScroll = window.scrollY;
//     },
//     { passive: true }
//   );

//   window.addEventListener("resize", measure);

//   raf();
// });

window.addEventListener("load", () => {
  const slides = [...document.querySelectorAll(".para-item")];
  const slowSlides = new Set([0, 2]);

  let viewportHeight = window.innerHeight;
  let isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let scrollVelocity = 0;
  let lastScroll = window.scrollY;

  const lerp = (a, b, n) => a + (b - a) * n;

  /* Film-like easing */
  const cinematicEase = (t) =>
    Math.sin(t * Math.PI * 0.5);

  let slideData = [];

  function measure() {
    viewportHeight = window.innerHeight;
    isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

    slideData = slides.map((slide) => {
      const rect = slide.getBoundingClientRect();
      return {
        img: slide.querySelector(".para-img"),
        top: rect.top + window.scrollY,
        height: rect.height,
        speed: parseFloat(slide.dataset.speed || 0.22),
        depth: parseFloat(slide.dataset.depth || 1),
        drift: Math.random() * 0.6 + 0.2, // organic feel
      };
    });
  }

  measure();

  function raf() {
    const prev = currentScroll;
    currentScroll = lerp(
      currentScroll,
      targetScroll,
      isMobile ? 0.18 : 0.1
    );

    scrollVelocity = currentScroll - prev;

    slideData.forEach((item, index) => {
      if (!item.img) return;

      const start = item.top - viewportHeight;
      const end = item.top + item.height;

      let progress = (currentScroll - start) / (end - start);
      progress = Math.min(Math.max(progress, 0), 1);

      /* Center camera focus */
      const center = 1 - Math.abs(progress - 0.5) * 2;
      const focus = cinematicEase(Math.max(0, center));

      /* Depth + heaviness */
      let depth = item.depth;
      if (slowSlides.has(index)) depth *= 0.6;

      /* Main parallax */
      const baseY =
        (progress - 0.5) *
        120 *
        item.speed *
        depth *
        focus;

      /* Directional inertia (film camera lag) */
      const inertia = Math.max(
        Math.min(scrollVelocity * 0.18, 8),
        -8
      );

      /* Micro organic drift (very subtle) */
      const drift =
        Math.sin(performance.now() * 0.0006 + item.drift) * 1.2;

      if (isMobile) {
        item.img.style.transform = `
          translate3d(0, ${baseY + inertia + drift}%, 0)
        `;
      } else {
        /* Desktop cinematic zoom */
        const scale = 1 + focus * 0.04;

        item.img.style.transform = `
          translate3d(0, ${baseY + inertia + drift}%, 0)
          scale(${scale})
        `;
      }
    });

    requestAnimationFrame(raf);
  }

  window.addEventListener(
    "scroll",
    () => {
      targetScroll = window.scrollY;
    },
    { passive: true }
  );

  window.addEventListener("resize", measure);

  raf();
});





//   7th section partners
 const partnerSwiper = new Swiper('.partner-slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    speed: 4000,        
    autoplay: {
      delay: 0,            
      disableOnInteraction: false,
    },
    allowTouchMove: false,  
    freeMode: true,        
    freeModeMomentum: false,
    breakpoints: {
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });


