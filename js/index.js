const QUOTES = [
    "Resdex - ZW, pies mi się zrzygał!",
    "Hubon - Jestem między semi-pro a pro.",
    "Resdex - Jebany internet psu w dupe!",
    "Gokoo - Robił byś na tej bramce coś, Wojtuś.",
    "Kalgon - Teodor zrzygałeś się, to wygląda jak kakao!",
    "Hubon - Jeśli nie zabrał byś mi boosta zrobił bym...",
    "Fizzu - Ale ja nie nadużywam air-roll`a!",
];

let lastIndex = -1;
const quoteText = document.getElementById('quote-text');
const quoteContainer = document.getElementById('quote-container');

function updateDimensions() {
    if (!quoteContainer || !quoteText) return;
    quoteContainer.style.width = 'auto';
    quoteContainer.style.height = 'auto';
    const targetWidth = quoteContainer.offsetWidth;
    const targetHeight = quoteContainer.offsetHeight;
    quoteContainer.style.width = targetWidth + 'px';
    quoteContainer.style.height = targetHeight + 'px';
}

function changeQuote() {
    if (!quoteText || !quoteContainer) return;

    quoteText.style.opacity = "0";
    quoteText.style.filter = "blur(8px)";
    quoteText.style.transform = "scale(0.95)";

    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * QUOTES.length);
        } while (randomIndex === lastIndex);
        
        lastIndex = randomIndex;
        const oldWidth = quoteContainer.offsetWidth;
        const oldHeight = quoteContainer.offsetHeight;

        quoteText.innerText = `"${QUOTES[randomIndex]}"`;

        quoteContainer.style.width = 'auto';
        quoteContainer.style.height = 'auto';
        const newWidth = quoteContainer.offsetWidth;
        const newHeight = quoteContainer.offsetHeight;

        quoteContainer.style.transition = 'none';
        quoteContainer.style.width = oldWidth + 'px';
        quoteContainer.style.height = oldHeight + 'px';
        
        quoteContainer.offsetHeight;

        quoteContainer.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        quoteContainer.style.width = newWidth + 'px';
        quoteContainer.style.height = newHeight + 'px';

        setTimeout(() => {
            quoteText.style.opacity = "1";
            quoteText.style.filter = "blur(0px)";
            quoteText.style.transform = "scale(1)";
        }, 400);
    }, 500);
}

setInterval(changeQuote, 6000);

window.addEventListener('DOMContentLoaded', () => {
    const initialIndex = Math.floor(Math.random() * QUOTES.length);
    lastIndex = initialIndex;
    if (quoteText) {
        quoteText.innerText = `"${QUOTES[initialIndex]}"`;
        setTimeout(updateDimensions, 150);
    }
});

window.addEventListener('resize', updateDimensions);