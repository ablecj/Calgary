
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

// window.addEventListener('load', () => {
//   const slides = [...document.querySelectorAll('.para-item')];
//   const zoomSlides = new Set([1, 3]);
//   let viewportHeight = window.innerHeight;
//   let ticking = false;

//   function update() {
//     slides.forEach((slide, index) => {
//       const img = slide.querySelector('.para-img');
//       if (!img) return;

//       const rect = slide.getBoundingClientRect();
//       const start = viewportHeight;
//       const end = -rect.height;

//       let progress = (rect.top - start) / (end - start);
//       progress = Math.min(Math.max(progress, 0), 1);


//       const y = (progress - 0.5) * 25;
//       img.style.setProperty('--y', `${y}%`);

   
//       if (zoomSlides.has(index)) {
//         const intensity = Math.pow(
//           1 - Math.abs(progress - 0.5) / 0.5,
//           2
//         );
//         const scale = 1.1 + (1.25 - 1.1) * intensity;
//         img.style.setProperty('--scale', scale.toFixed(3));
//       } else {
//         img.style.setProperty('--scale', '1.1');
//       }
//     });

//     ticking = false;
//   }

//   function onScroll() {
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(update);
//     }
//   }

//   window.addEventListener('scroll', onScroll, { passive: true });
//   window.addEventListener('resize', () => {
//     viewportHeight = window.innerHeight;
//     update();
//   });

//   update();
// });


// new para
// CINEMATIC SMOOTH PARALLAX (JS ONLY – no HTML/CSS changes)

// ULTRA SMOOTH CINEMATIC PARALLAX
// JS ONLY — no HTML / CSS changes

// window.addEventListener("load", () => {
//   const slides = [...document.querySelectorAll(".para-item")];
//   const zoomSlides = new Set([1, 3]);

//   let viewportHeight = window.innerHeight;

//   let targetScroll = window.scrollY;
//   let smoothScroll = window.scrollY;

//   let ticking = false;

//   const lerp = (a, b, n) => a + (b - a) * n;
//   const easeInOut = (t) =>
//     t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

//   function animate() {
//     smoothScroll = lerp(smoothScroll, targetScroll, 0.06);

//     slides.forEach((slide, index) => {
//       const img = slide.querySelector(".para-img");
//       if (!img) return;

//       const rect = slide.getBoundingClientRect();

//       const start = viewportHeight * 1.1;
//       const end = -rect.height * 0.8;

//       let progress = (rect.top - start) / (end - start);
//       progress = Math.min(Math.max(progress, 0), 1);

   
//       const focus = 1 - Math.abs(progress - 0.5) * 2;
//       const easedFocus = easeInOut(Math.max(0, focus));


//       const speed = parseFloat(slide.dataset.speed || 0.3);

   
//       const y = (progress - 0.5) * 120 * speed * easedFocus;
//       img.style.setProperty("--y", `${y}%`);

 
//       if (zoomSlides.has(index)) {
//         const scale = lerp(1.14, 1.38, easedFocus);
//         img.style.setProperty("--scale", scale.toFixed(3));
//       } else {
//         img.style.setProperty("--scale", "1.14");
//       }
//     });

//     ticking = false;
//   }

//   function onScroll() {
//     targetScroll = window.scrollY;
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(animate);
//     }
//   }

//   window.addEventListener("scroll", onScroll, { passive: true });

//   window.addEventListener("resize", () => {
//     viewportHeight = window.innerHeight;
//   });

//   animate();
// });


// window.addEventListener("load", () => {
//   const slides = [...document.querySelectorAll(".para-item")];

//   const slowSlides = new Set([0, 2]); 
//   const zoomSlides = new Set([1, 3]); 

//   let viewportHeight = window.innerHeight;

//   let targetScroll = window.scrollY;
//   let smoothScroll = window.scrollY;
//   let ticking = false;

//   const lerp = (a, b, n) => a + (b - a) * n;

//   const easeInOut = (t) =>
//     t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

//   function animate() {
//     smoothScroll = lerp(smoothScroll, targetScroll, 0.06);

//     slides.forEach((slide, index) => {
//       const img = slide.querySelector(".para-img");
//       if (!img) return;

//       const rect = slide.getBoundingClientRect();

//       const start = viewportHeight * 1.1;
//       const end = -rect.height * 0.8;

//       let progress = (rect.top - start) / (end - start);
//       progress = Math.min(Math.max(progress, 0), 1);

   
//       const focus = 1 - Math.abs(progress - 0.5) * 2;
//       const easedFocus = easeInOut(Math.max(0, focus));

    
//       let speed = parseFloat(slide.dataset.speed || 0.3);

      
//       if (slowSlides.has(index)) {
//         speed *= 0.45; 
//       }

     
//       const y = (progress - 0.5) * 120 * speed * easedFocus;
//       img.style.setProperty("--y", `${y}%`);

    
//       if (zoomSlides.has(index)) {
//         const scale = lerp(1.14, 1.38, easedFocus);
//         img.style.setProperty("--scale", scale.toFixed(3));
//       } else {
//         img.style.setProperty("--scale", "1.14");
//       }
//     });

//     ticking = false;
//   }

//   function onScroll() {
//     targetScroll = window.scrollY;
//     if (!ticking) {
//       ticking = true;
//       requestAnimationFrame(animate);
//     }
//   }

//   window.addEventListener("scroll", onScroll, { passive: true });

//   window.addEventListener("resize", () => {
//     viewportHeight = window.innerHeight;
//   });

//   animate();
// });

window.addEventListener("load", () => {
  const slides = [...document.querySelectorAll(".para-item")];

  const slowSlides = new Set([0, 2]);
  const zoomSlides = new Set([1, 3]); 

  let viewportHeight = window.innerHeight;

  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;

  const lerp = (a, b, n) => a + (b - a) * n;

  const easeInOut = (t) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

 
  let slideData = [];

  function measure() {
    viewportHeight = window.innerHeight;
    slideData = slides.map((slide) => {
      const rect = slide.getBoundingClientRect();
      return {
        el: slide,
        img: slide.querySelector(".para-img"),
        top: rect.top + window.scrollY,
        height: rect.height,
        speed: parseFloat(slide.dataset.speed || 0.3),
      };
    });
  }

  measure();


  function raf() {
    currentScroll = lerp(currentScroll, targetScroll, 0.08);

    slideData.forEach((item, index) => {
      if (!item.img) return;

      const start = item.top - viewportHeight * 1.1;
      const end = item.top + item.height * 0.8;

      let progress = (currentScroll - start) / (end - start);
      progress = Math.min(Math.max(progress, 0), 1);

      const focus = 1 - Math.abs(progress - 0.5) * 2;
      const easedFocus = easeInOut(Math.max(0, focus));

      let speed = item.speed;
      if (slowSlides.has(index)) speed *= 0.45;


      const y = (progress - 0.5) * 120 * speed * easedFocus;

      const scale = zoomSlides.has(index)
        ? lerp(1.12, 1.34, easedFocus)
        : 1.12;

      item.img.style.transform = `
        translate3d(0, ${y}%, 0)
        scale(${scale})
      `;
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


