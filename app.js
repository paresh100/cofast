/**
 * COFAST - Modern GSAP Motion & Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero entrance timeline
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .from(".hero-tagline", { opacity: 0, y: 15, duration: 0.6 })
      .from(".hero-main-title", { opacity: 0, y: 25, duration: 0.8 }, "-=0.4")
      .from(".hero-subtext", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
      .from(".hero-action-row", { opacity: 0, y: 15, duration: 0.5 }, "-=0.4")
      .from(".hero-trust-pills .trust-pill", { opacity: 0, y: 15, stagger: 0.1, duration: 0.5 }, "-=0.3")
      .from(".sector-card", { opacity: 0, x: 30, stagger: 0.12, duration: 0.7 }, "-=0.8");

    // ScrollTrigger for 4 Pillars Cards
    gsap.from(".pillar-card", {
      scrollTrigger: {
        trigger: ".section-pillars",
        start: "top 80%"
      },
      opacity: 0,
      y: 35,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out"
    });

    // ScrollTrigger for Stats Bar
    gsap.from(".stat-col", {
      scrollTrigger: {
        trigger: ".section-stats",
        start: "top 85%"
      },
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.6,
      ease: "power2.out"
    });

    // ScrollTrigger for About Section
    gsap.from(".about-left-block, .about-video-card, .value-item", {
      scrollTrigger: {
        trigger: ".section-about-cofast",
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      stagger: 0.18,
      duration: 0.7,
      ease: "power2.out"
    });
  }
});
