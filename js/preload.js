document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll(".lazy-load");
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy-load");
                        img.style.opacity = "1";
                        observer.unobserve(img);
                    }
                }
            });
        });
        lazyImages.forEach(img => {
            img.style.transition = "opacity 0.4s ease-in-out";
            img.style.opacity = "0";
            imageObserver.observe(img);
        });
    }
});

setTimeout(() => {
    location.reload(true);
}, 15 * 60 * 1000);