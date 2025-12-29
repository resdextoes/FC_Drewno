document.addEventListener("DOMContentLoaded", () => {
    const preloadPage = (url) => {
        if (!url || url.includes('#') || url.includes('mailto:') || url.includes('discord')) return;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    };

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseenter', () => preloadPage(link.href), { once: true });
        link.addEventListener('touchstart', () => preloadPage(link.href), { once: true });
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .catch(err => console.log('SW registration failed: ', err));
    });
}

window.addEventListener("beforeunload", () => {
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = "0";
});

document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img.lazy-load');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});