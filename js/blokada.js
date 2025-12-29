const createNotification = () => {
    const existing = document.getElementById('security-alert');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.id = 'security-alert';
    alert.innerText = "Nie tym razem gagatku";
    
    alert.style.position = 'fixed';
    alert.style.top = '50%';
    alert.style.left = '50%';
    alert.style.transform = 'translate(-50%, -50%) scale(0.5)';
    alert.style.backgroundColor = 'rgba(26, 5, 5, 0.95)';
    alert.style.color = '#ff4444';
    alert.style.padding = '40px 60px';
    alert.style.borderRadius = '24px';
    alert.style.border = '2px solid #ff4444';
    alert.style.boxShadow = '0 0 50px rgba(255, 68, 68, 0.6)';
    alert.style.zIndex = '10000';
    alert.style.fontFamily = 'sans-serif';
    alert.style.fontWeight = '900';
    alert.style.fontSize = '32px';
    alert.style.textAlign = 'center';
    alert.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    alert.style.opacity = '0';
    alert.style.pointerEvents = 'none';
    alert.style.textTransform = 'uppercase';
    alert.style.letterSpacing = '2px';
    alert.style.backdropFilter = 'blur(10px)';
    alert.style.width = 'max-content';
    alert.style.maxWidth = '90vw';

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.transform = 'translate(-50%, -50%) scale(1)';
        alert.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        alert.style.transform = 'translate(-50%, -50%) scale(1.1)';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 400);
    }, 2000);
};

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    createNotification();
});

document.addEventListener('keydown', (e) => {
    if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || 
        (e.ctrlKey && e.keyCode === 85)
    ) {
        e.preventDefault();
        createNotification();
    }
});