const TRACKER_LINKS = {
    "1119898337223639040": "https://rocketleague.tracker.network/rocket-league/profile/epic/G0koo_/overview",
    "1260529902495727626": "https://rocketleague.tracker.network/rocket-league/profile/epic/destroy%20lonely8/overview",
    "899678477463220305": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20Prawą%20Ręką/overview",
    "929052879879299193": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20I%20do%20pieca%20Fizzu/overview",
    "1060926858759245854": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20MoLI4./overview",
    "1260533155195125872": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20PeDrORl.4/overview"
};

const AKADEMIA_IDS = [
    "929052879879299193",
    "1060926858759245854",
    "1260533155195125872"
];

async function loadAdmins() {
    const container = document.getElementById("admins");
    container.innerHTML = "<p>Ładowanie informacji z Discorda...</p>";

    try {
        const response = await fetch("https://discord-api-jqj5.onrender.com/admins");
        
        if (!response.ok) throw new Error("Problem z serwerem");
        
        const members = await response.json();
        
        container.innerHTML = `
            <div class="team-group">
                <h2>Główny skład</h2>
                <div id="group-main" class="admins-container"></div>
            </div>
            <div class="team-group">
                <h2>Akademia</h2>
                <div id="group-akademia" class="admins-container"></div>
            </div>
        `;

        const mainGroup = document.getElementById("group-main");
        const akademiaGroup = document.getElementById("group-akademia");

        members.forEach(member => {
            const trackerUrl = TRACKER_LINKS[member.id] || "#";
            const isAkademia = AKADEMIA_IDS.includes(member.id);
            
            const cardHTML = `
                <a href="${trackerUrl}" target="_blank" class="admin-link">
                    <div class="admin-card">
                        <img src="${member.avatar}" class="admin-avatar" alt="${member.username}">
                        <p class="admin-name">${member.username}</p>
                    </div>
                </a>
            `;

            if (isAkademia) {
                akademiaGroup.innerHTML += cardHTML;
            } else {
                mainGroup.innerHTML += cardHTML;
            }
        });

        if (mainGroup.innerHTML === "") mainGroup.parentElement.remove();
        if (akademiaGroup.innerHTML === "") akademiaGroup.parentElement.remove();

    } catch (error) {
        console.error("Błąd:", error);
        
        let secondsLeft = 10;
        const countdown = setInterval(() => {
            container.innerHTML = `
                <div style="text-align: center; color: #8495a5ff; padding: 20px;">
                    <p>Budzenie serwera informacyjnego (może to zająć chwilę)...</p>
                    <br>
                    <p>Automatyczne odświeżenie za: <strong>${secondsLeft}s</strong></p>
                </div>
            `;
            secondsLeft--;
            if (secondsLeft < 0) {
                clearInterval(countdown);
                location.reload();
            }
        }, 1000);
    }
}


document.addEventListener("DOMContentLoaded", loadAdmins);
