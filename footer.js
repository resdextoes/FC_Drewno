document.addEventListener("DOMContentLoaded", () => {
    fetch("/footer.html")
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById("footer");
            if (footer) {
                footer.innerHTML = data;
            }
        })
        .catch(err => console.error("Błąd ładowania footera:", err));
});
document.addEventListener("DOMContentLoaded", () => {
    fetch("/header.html")
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById("header");
            if (footer) {
                footer.innerHTML = data;
            }
        })
        .catch(err => console.error("Błąd ładowania headera:", err));
});
