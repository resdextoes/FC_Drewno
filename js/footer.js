document.addEventListener("DOMContentLoaded", () => {
    fetch("html/footer.html")
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById("footer");
            if (footerContainer) {
                footerContainer.innerHTML = data;
                const yearSpan = document.getElementById("current-year");
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            }
        })
        .catch(err => console.error("Błąd ładowania footera:", err));
});