  // Add active class to nav items when scrolling
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", function () {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active");
        }
      });
    });

    // Smooth scrolling for nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile nav if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      });
    });

    // Back to top button
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = "flex";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const bars = document.querySelectorAll(".progress-bar");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.width = el.getAttribute("aria-valuenow") + "%";
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    bars.forEach((bar) => {
      bar.style.width = "0%"; // Set awal
      observer.observe(bar);
    });
  });

  /* Add JavaScript for Back to Top button visibility */
  document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    // Add animation classes to elements when they come into view
    const animateElements = document.querySelectorAll(
      ".service-box, .project-card, .skill-bar, .timeline-item, .contact-info"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animateElements.forEach((el) => {
      observer.observe(el);
    });
  });

  /* Initialize skill level animations when element comes into view */
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target
              .getAttribute("style")
              .replace("width: 0%", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".skill-level").forEach((el) => {
      observer.observe(el);
    });

    // Read more functionality
    document.querySelectorAll(".read-more").forEach((button) => {
      button.addEventListener("click", function () {
        const target = document.getElementById(
          this.getAttribute("data-target")
        );
        target.classList.toggle("expanded");
        this.classList.toggle("active");
      });
    });
  });

  // JavaScript untuk implementasi efek blur saat navigasi
  document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const sections = document.querySelectorAll("section");

    // Tambahkan kelas untuk transisi pada semua section
    sections.forEach((section) => {
      section.classList.add("section-transition");
    });

    // Fungsi untuk mendeteksi section yang terlihat
    const checkVisibility = () => {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        if (
          scrollPosition > sectionTop - windowHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 2
        ) {
          section.classList.add("section-visible");
        }
      });
    };

    // Periksa visibility saat halaman pertama dimuat
    window.addEventListener("load", checkVisibility);
    // Periksa visibility saat scrolling
    window.addEventListener("scroll", checkVisibility);

    // Implementasi efek blur saat navigasi
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;

        // Tambahkan efek blur ke body
        document.body.classList.add("blur-transition");

        // Tutup navbar mobile jika terbuka
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }

        // Set timeout untuk memberikan waktu efek blur terlihat
        setTimeout(() => {
          // Scroll ke section yang dituju
          window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: "smooth",
          });

          // Setelah scroll, hapus efek blur
          setTimeout(() => {
            document.body.classList.remove("blur-transition");

            // Perbarui status active pada navigasi
            navLinks.forEach((navLink) =>
              navLink.classList.remove("active")
            );
            this.classList.add("active");

            // Pastikan section terlihat dengan baik
            targetSection.classList.add("section-visible");
          }, 400); // Waktu yang sama dengan durasi transisi filter
        }, 200);
      });
    });

    // Tambahkan efek blur untuk tombol back-to-top
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Tambahkan efek blur
        document.body.classList.add("blur-transition");

        // Setelah efek blur terlihat, scroll ke atas
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          // Hapus efek blur setelah scroll selesai
          setTimeout(() => {
            document.body.classList.remove("blur-transition");
          }, 400);
        }, 200);
      });
    }

    // Tambahkan animasi saat load pertama kali untuk header
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          heroSection.classList.add("section-visible");
        }, 300);
      });
    }
  });

  /* Add this JavaScript to your script.js file */
  document.addEventListener("DOMContentLoaded", function () {
    // Navbar scroll effect
    window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Add active class based on scroll position
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    window.addEventListener("scroll", function () {
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active");
        }
      });
    });
  });

//   <!-- JavaScript untuk efek tambahan -->

  document.addEventListener("DOMContentLoaded", function () {
    const whatsappBtn = document.querySelector(".whatsapp-btn");

    // Efek hover - sedikit membesar
    whatsappBtn.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    whatsappBtn.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });

    // Efek klik - tekan dan rebound
    whatsappBtn.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.95)";
    });

    whatsappBtn.addEventListener("mouseup", function () {
      this.style.transform = "scale(1.05)";
    });

    // Efek getar setelah 3 detik jika belum diklik
    setTimeout(function () {
      if (!whatsappBtn.classList.contains("clicked")) {
        whatsappBtn.classList.add("vibrate");
        setTimeout(() => whatsappBtn.classList.remove("vibrate"), 1000);
      }
    }, 3000);
  });