document.addEventListener("DOMContentLoaded", () => {

    /* ===== HEADER ANIMACJA ===== */
    const header = document.querySelector("header");
    if (header) {
        header.style.opacity = "0";
        header.style.transform = "translateY(-20px)";
        setTimeout(() => {
            header.style.transition = "0.8s ease";
            header.style.opacity = "1";
            header.style.transform = "translateY(0)";
        }, 100);
    }

    /* ===== SEKCJE – ANIMACJA PRZY SCROLLU ===== */
    const sections = document.querySelectorAll("section");

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "0.8s ease";
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < windowHeight - 100) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* ===== HOVER EFFECT – KARTY ===== */
    sections.forEach(section => {
        section.addEventListener("mouseenter", () => {
            section.style.transform = "scale(1.02)";
            section.style.boxShadow = "0 15px 40px rgba(0,0,0,0.4)";
        });

        section.addEventListener("mouseleave", () => {
            section.style.transform = "scale(1)";
            section.style.boxShadow = "none";
        });
    });

    /* ===== LOGO ANIMACJA (STRONA GŁÓWNA) ===== */
    const logo = document.querySelector("img");

    if (logo) {
        logo.style.opacity = "0";
        logo.style.transform = "scale(0.8)";
        logo.style.transition = "1s ease";

        setTimeout(() => {
            logo.style.opacity = "1";
            logo.style.transform = "scale(1)";
        }, 300);
    }

});
