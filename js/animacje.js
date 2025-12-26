document.addEventListener("DOMContentLoaded", () => {

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

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = "sectionIn 0.7s cubic-bezier(.2,.8,.2,1)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll("section").forEach(section => {
        observer.observe(section);

        section.addEventListener("click", e => {
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            section.appendChild(ripple);

            const rect = section.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;

            setTimeout(() => ripple.remove(), 600);
        });
    });

});