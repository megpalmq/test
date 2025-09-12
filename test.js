gsap.registerPlugin(ScrollTrigger);

// Hero Zoom
gsap.to(".hero-text", {
  scale: 90,
  transformOrigin: "30% 50%",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=300",  // short scroll distance
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      // self.progress goes from 0 → 1 as animation progresses
      if (self.progress > 0.99) {
        // Animation nearly done → change navbar color
        document.querySelector(".navbar .logo").style.color = "#000";
        document.querySelectorAll(".navbar .nav-links a").forEach(link => {
          link.style.color = "#000";
        });
      } else {
        // Reset to white while zooming
        document.querySelector(".navbar .logo").style.color = "#fff";
        document.querySelectorAll(".navbar .nav-links a").forEach(link => {
          link.style.color = "#fff";
        });
      }
    }
  }
});

// Background Fade
gsap.to(".hero", {
  backgroundColor: "#ffffff",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=300",
    scrub: true
  }
});

// Split Text Animation
document.querySelectorAll(".split-text").forEach(text => {
  const letters = text.textContent.split("");
  text.textContent = "";
  letters.forEach(letter => {
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
      scrub: true
    }
  });
});
