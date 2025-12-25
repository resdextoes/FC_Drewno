document.addEventListener("DOMContentLoaded", () => {
    const osiagn_list = document.querySelectorAll("section ul");
    const osiagn_winner = document.getElementById("tytul1");

    osiagn_list.forEach(el => {
        el.style.transition = "transform 0.3s ease, filter 0.3s ease";
        
        const handleEnter = () => {
            el.style.transform = "translateX(10px)";
            const icon = el.querySelector("img");
            if (icon) icon.style.filter = "drop-shadow(0 0 10px currentColor)";
        };

        const handleLeave = () => {
            el.style.transform = "translateX(0)";
            const icon = el.querySelector("img");
            if (icon) icon.style.filter = "none";
        };

        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
        el.addEventListener("touchstart", handleEnter, {passive: true});
        el.addEventListener("touchend", () => setTimeout(handleLeave, 300), {passive: true});
    });

    if (osiagn_winner) {
        const pulseWinner = () => {
            osiagn_winner.style.transition = "text-shadow 1.5s ease, transform 1.5s ease";
            osiagn_winner.style.textShadow = "0 0 15px rgba(40, 114, 40, 0.6)";
            osiagn_winner.style.transform = "scale(1.02)";
            
            setTimeout(() => {
                osiagn_winner.style.textShadow = "0 0 15px rgba(40, 114, 40, 0.6)";
                osiagn_winner.style.transform = "scale(1)";
            }, 1500);
        };
        setInterval(pulseWinner, 4000);
    }
});