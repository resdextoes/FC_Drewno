const TRACKER_LINKS = {
    "1119898337223639040": "https://rocketleague.tracker.network/rocket-league/profile/epic/G0koo_/overview",
    "1260529902495727626": "https://rocketleague.tracker.network/rocket-league/profile/epic/hubonrl./overview",
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
    if (!container) return;

    try {
        const response = await fetch("https://discord-api-jqj5.onrender.com/admins");
        if (!response.ok) throw new Error("API Offline");
        const members = await response.json();

        container.innerHTML = `
            <div class="team-group">
                <h2>Osoby</h2>
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
            const statusClass = member.status || 'offline';
            
            const cardHTML = `
                <a href="${trackerUrl}" target="_blank" class="admin-link status-${statusClass}">
                    <div class="admin-card">
                        <div class="avatar-wrapper">
                            <img src="${member.avatar}" class="admin-avatar" alt="${member.username}">
                            <span class="status-dot ${statusClass}"></span>
                        </div>
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

    } catch (error) {
        let secondsLeft = 10;
        const countdown = setInterval(() => {
            container.innerHTML = `
                <div style="text-align: center; color: white; padding: 20px; width: 100%;">
                    Budzenie servera informacyjnego... <strong>${secondsLeft}s</strong>
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