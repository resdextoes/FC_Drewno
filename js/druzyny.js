const TRACKER_LINKS = {
    "1119898337223639040": "https://rocketleague.tracker.network/rocket-league/profile/epic/G0koo_/overview",
    "1260529902495727626": "https://rocketleague.tracker.network/rocket-league/profile/epic/hubonrl./overview",
    "899678477463220305": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20Prawą%20Ręką/overview",
    "929052879879299193": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20I%20do%20pieca%20Fizzu/overview",
    "1060926858759245854": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20MoLI4./overview",
    "1260533155195125872": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20PeDrORl.4/overview"
};

const USER_DESCRIPTIONS = {
    "1119898337223639040": "Fortnitowy placementowiec, Rocket League`owy mid-field player.", // Gokoo
    "1260529902495727626": "Fortnitowy niby frager (pomiędzy semi-pro, a pro), Rocket League`owy diament z ambicjami SSL`a, EA FC ledwie utzymująca się 5 dywizja z chujowymi piłkarzami.", // hubon
    "899678477463220305": "Nie gra bo ma chujowy ping, ale w Fortnite nie umie budować, a w Rocket League drugi Szczęsny z 2022 roku, broni nawet atak Wehrmachtu na bramke.", // Resdex
    "929052879879299193": "Fortnitowy napocony 13 latek ogólnie mocny agent, Rocket League`owy turek kręcocy kebaby w powietrzu.", // Fizzu
    "1060926858759245854": "W Fortnite nie gra odkąd pamiętam ale kiedyś był dobry, wszechstronny bramkarz w Rocket League, w EA FC walczy o najwyższe wyniki, potrafi z gówno składu wyciagnąć co najlepsze.", // Moli
    "1260533155195125872": "Wszechstrony player Fortnite oraz Rocket League, odnajdzie się w każdej sytuacji działając, czasem skutecznie." // Kalgon
};

const AKADEMIA_IDS = ["929052879879299193", "1060926858759245854", "1260533155195125872"];

async function loadAdmins() {
    const container = document.getElementById("admins");
    try {
        const response = await fetch("https://discord-api-jqj5.onrender.com/admins");
        const members = await response.json();

        container.innerHTML = `
            <div class="team-group"><h2>Skład</h2><div id="main" class="admins-container"></div></div>
            <div class="team-group"><h2>Akademia</h2><div id="akad" class="admins-container"></div></div>
        `;

        members.forEach(m => {
            const card = document.createElement('div');
            card.className = 'admin-card';
            const showActivity = m.status !== 'offline' && m.game;
            const activityHtml = showActivity ? `<div class="admin-activity">🎮 <span>${m.game}</span></div>` : '<div class="admin-activity"></div>';

            card.innerHTML = `
                <div class="avatar-wrapper">
                    <img src="${m.avatar}" class="admin-avatar">
                    <span class="status-dot ${m.status}"></span>
                </div>
                <p class="admin-name">${m.username}</p>
                ${activityHtml}
            `;
            card.onclick = () => openModal(m);
            document.getElementById(AKADEMIA_IDS.includes(m.id) ? "akad" : "main").appendChild(card);
        });
    } catch (e) { container.innerHTML = "Błąd ładowania."; }
}

function openModal(m) {
    const modal = document.getElementById("user-modal");
    const showActivity = m.status !== 'offline' && m.game;
    const activityHtml = showActivity ? `<div class="modal-status-text" style="color:#00b4ff; font-size:11px; font-weight:bold; margin-top:5px;">🎮 Gram w: ${m.game}</div>` : '';

    document.getElementById("modal-body").innerHTML = `
        <div class="modal-left">
            <img src="${m.avatar}" class="modal-avatar-big">
            <h2 class="modal-username-big">${m.username}</h2>
            ${activityHtml}
        </div>
        <div class="modal-center">
            <p class="modal-desc-text">${USER_DESCRIPTIONS[m.id] || "Brak opisu profilu."}</p>
        </div>
        <div class="modal-right">
            <a href="${TRACKER_LINKS[m.id] || '#'}" target="_blank" class="modal-btn-tracker">Otwórz Tracker</a>
        </div>
    `;
    modal.style.display = "flex";
}

document.querySelector(".close-modal").onclick = () => document.getElementById("user-modal").style.display = "none";
window.onclick = (e) => { if (e.target.id === "user-modal") e.target.style.display = "none"; };

loadAdmins();