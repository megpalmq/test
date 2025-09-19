gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.set(".hero-text", { scale: 1, opacity: 1 });
gsap.set(".hero-video", { opacity: 1 });

// Hero Zoom

const socialsLinks = document.querySelectorAll(".socials a");

// GSAP scroll color change
gsap.to(".hero-text", {
  scale: 90,
  transformOrigin: "50% 50%",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=300",
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      const navbarLinks = document.querySelectorAll(".navbar .nav-links a");

      if (self.progress > 0.99) {
        document.querySelector(".navbar .logo").style.color = "#000";
        navbarLinks.forEach(link => link.style.color = "#000");
        socialsLinks.forEach(link => link.style.color = "#39B44A");
      } else {
        document.querySelector(".navbar .logo").style.color = "#fff";
        navbarLinks.forEach(link => link.style.color = "#fff");
        socialsLinks.forEach(link => link.style.color = "#fff");
      }
    },
  },
});

// Add hover effect in JS
socialsLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.color = "#39B44A";          // text white
  });
  link.addEventListener("mouseleave", () => {
    // Reset back to whatever color it should be based on scroll
    const scrollProgress = ScrollTrigger.getById("heroTextTrigger")?.progress ?? 0;
    link.style.color = scrollProgress > 0.99 ? "#fff" : "#fff";
    link.style.backgroundColor = "transparent";
  });
});


// Background Fade
gsap.to(".hero", {
  backgroundColor: "#ffffff",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=300",
    scrub: true,
  },
});
// Smooth scroll for navbar links
document.querySelectorAll(".navbar .nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href"); // e.g. "#about"
    const target = document.querySelector(targetId);

    if (target) {
      gsap.to(window, {
        duration: 1,        // scroll duration in seconds
        scrollTo: target,   // scrollTo requires the plugin
        ease: "power2.inOut"
      });
    }
  });
});

// Split Text Animation
document.querySelectorAll(".split-text").forEach((text) => {
  const letters = text.textContent.split("");
  text.textContent = "";
  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter;
    text.appendChild(span);
  });
  
  gsap.to(text.children, {
    y: 0,
    stagger: 0.05,
    duration: 1,
    scrollTrigger: {
      trigger: text,
      start: "top 80%",
      end: "top 50%",
      scrub: true,
    },
});
});
const images = gsap.utils.toArray(".left img");

// timeline for scroll-driven sequence
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-content",
    start: "top top",
    end: "+=3000", // length of scroll (px)
    scrub: true,
    pin: ".container", // keeps container fixed while animating
    anticipatePin: 1,
  },
});

// image 1: from left into position
tl.fromTo(images[0], 
  { x: "-100vw" }, 
  { x: 50, duration: 1 }
);

tl.fromTo(
  images[1],
  { x: "100vw", y: 0, zIndex: 10 },   // start offscreen right, ensure high z-index
  { x: 100, y: -100, zIndex: 10, duration: 1 }, // move in + shift up
  "+=0.5"
);

tl.fromTo(images[2], 
  { x: "200vw" }, 
  { x: 300, duration: 1 }, 
  "+=0.5"
);
gsap.fromTo(".background-title",
  { y: 0, opacity: 0, scale: 1.2 },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "#events",
      start: "top bottom",
      endTrigger: ".events-container",
      end: "top top",
      scrub: true
    }
  }
);
