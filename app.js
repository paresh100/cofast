/**
 * COFAST (Company Fasteners Ltd)
 * Modern Light Brochure Experience with GSAP & ScrollTrigger Animations
 */

document.addEventListener("DOMContentLoaded", () => {
  initGSAPAnimations();
  initCounters();
});

/**
 * GSAP & ScrollTrigger Initialization
 */
function initGSAPAnimations() {
  if (typeof gsap === "undefined") return;

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Entrance Timeline
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimeline
    .from(".hero-eyebrow", {
      opacity: 0,
      y: 20,
      duration: 0.7
    })
    .from(".hero-title", {
      opacity: 0,
      y: 35,
      duration: 0.85
    }, "-=0.4")
    .from(".hero-lead", {
      opacity: 0,
      y: 25,
      duration: 0.7
    }, "-=0.5")
    .from(".hero-cta-wrapper", {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.4")
    .from(".stats-ribbon", {
      opacity: 0,
      y: 20,
      duration: 0.6
    }, "-=0.4")
    .from(".spec-card", {
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: "back.out(1.4)"
    }, "-=0.8");

  // 2. ScrollTrigger Reveal for sections & cards
  if (typeof ScrollTrigger !== "undefined") {
    // Reveal all elements with .gs-fade-up
    gsap.utils.toArray(".gs-fade-up").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
      });
    });

    // Animate standard certification cards with a staggered entrance
    gsap.from(".s-card", {
      scrollTrigger: {
        trigger: ".standards-cards-grid",
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out"
    });

    // Workflow steps in KANBAN
    gsap.from(".w-step", {
      scrollTrigger: {
        trigger: ".workflow-steps",
        start: "top 80%"
      },
      opacity: 0,
      x: -25,
      stagger: 0.18,
      duration: 0.6,
      ease: "power2.out"
    });
  }

  // 3. 3D Tilt Effect on Spec Card (Mouse movement in Hero)
  const specCard = document.querySelector(".spec-card");
  const heroVisual = document.querySelector(".hero-visual");

  if (specCard && heroVisual) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(specCard, {
        rotationY: x * 0.03,
        rotationX: -y * 0.03,
        transformPerspective: 1000,
        ease: "power1.out",
        duration: 0.5
      });
    });

    heroVisual.addEventListener("mouseleave", () => {
      gsap.to(specCard, {
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 0.7
      });
    });
  }
}

/**
 * Animated Number Counters
 */
function initCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (!statNumbers.length) return;

  statNumbers.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 40;
    const increment = Math.ceil(target / speed);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count.toLocaleString() + "+";
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target.toLocaleString() + (target >= 1000 ? "+" : "m²");
      }
    };

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        onEnter: () => updateCount(),
        once: true
      });
    } else {
      updateCount();
    }
  });
}

/**
 * Switch Capability Tabs
 */
function switchCategory(catId, buttonEl) {
  // Update Tab States
  document.querySelectorAll(".cat-tab").forEach(tab => tab.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");

  // Update Panel States
  document.querySelectorAll(".cap-panel").forEach(panel => panel.classList.remove("active"));
  const targetPanel = document.getElementById(`panel-${catId}`);
  if (targetPanel) {
    targetPanel.classList.add("active");

    // Animate content change with GSAP
    if (typeof gsap !== "undefined") {
      gsap.fromTo(targetPanel.querySelector(".panel-grid"), 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }
}

/**
 * File attachment label update
 */
function fileAttached(input) {
  const label = document.getElementById("fileLabelText");
  if (input.files && input.files[0]) {
    label.innerText = `File attached: ${input.files[0].name} (${(input.files[0].size / 1024).toFixed(0)} KB)`;
    label.style.color = "#2563eb";
    label.style.fontWeight = "700";
  }
}

/**
 * Handle Brochure Enquiry Submission
 */
function handleBrochureSubmit(e) {
  e.preventDefault();
  const successBanner = document.getElementById("enqSuccess");
  if (successBanner) {
    successBanner.style.display = "flex";
    successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });

    if (typeof gsap !== "undefined") {
      gsap.from(successBanner, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "back.out"
      });
    }
  }
}

/**
 * Mobile Navigation Toggle
 */
function toggleMenu() {
  const menu = document.querySelector(".nav-menu");
  if (menu) {
    if (menu.style.display === "flex") {
      menu.style.display = "none";
    } else {
      menu.style.display = "flex";
      menu.style.flexDirection = "column";
      menu.style.position = "absolute";
      menu.style.top = "80px";
      menu.style.left = "0";
      menu.style.right = "0";
      menu.style.background = "#ffffff";
      menu.style.padding = "24px";
      menu.style.borderBottom = "1px solid #e2e8f0";
      menu.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
    }
  }
}
