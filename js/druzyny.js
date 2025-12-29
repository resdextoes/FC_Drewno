const RL_TRACKER_LINKS = {
    "1119898337223639040": "https://rocketleague.tracker.network/rocket-league/profile/epic/G0koo_/overview",
    "1260529902495727626": "https://rocketleague.tracker.network/rocket-league/profile/epic/hubonrl./overview",
    "899678477463220305": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20Prawą%20Ręką/overview",
    "929052879879299193": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20I%20do%20pieca%20Fizzu/overview",
    "1060926858759245854": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20MoLI4./overview",
    "1260533155195125872": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20PeDrORl.4/overview"
};

const FN_TRACKER_LINKS = {
    "1119898337223639040": "https://fortnitetracker.com/profile/all/G0koo_",
    "1260529902495727626": "https://fortnitetracker.com/profile/all/destroy%20lonely8",
    "899678477463220305": "https://fortnitetracker.com/profile/all/Praw%c4%85%20R%c4%99k%c4%85",
    "929052879879299193": "https://fortnitetracker.com/profile/all/I%20do%20pieca%20Fizzu",
    "1060926858759245854": "https://fortnitetracker.com/profile/all/MoLI4.",
    "1260533155195125872": "https://fortnitetracker.com/profile/all/PeDrORl.4"
};

const FC_TRACKER_LINKS = {
    "1260529902495727626": "https://fc-tracker-link-hubon.com",
    "1060926858759245854": "https://fc-tracker-link-moli.com"
};

const USER_DESCRIPTIONS = {
    "1119898337223639040": "Fortnitowy placementowiec,<br>Rocket League`owy mid-field player.",
    "1260529902495727626": "Fortnitowy niby frager (pomiędzy semi-pro, a pro), Rocket League`owy diament z ambicjami SSL`a,<br>EA FC ledwie utzymująca się 5 dywizja z chujowymi piłkarzami.",
    "899678477463220305": "Nie gra bo ma chujowy ping, ale w Fortnite nie umie budować, a w Rocket League drugi Szczęsny z 2022 roku, broni nawet atak Wehrmachtu na bramke.",
    "929052879879299193": "Fortnitowy napocony 13 latek ogólnie mocny agent, Rocket League`owy turek kręcocy kebaby w powietrzu.",
    "1060926858759245854": "W Fortnite nie gra odkąd pamiętam ale kiedyś był dobry, wszechstronny bramkarz w Rocket League, w EA FC walczy o najwyższe wyniki, potrafi z gówno składu wyciagnąć co najlepsze.",
    "1260533155195125872": "Wszechstrony player Fortnite oraz Rocket League, odnajdzie się w każdej sytuacji działając, czasem skutecznie."
};

const AKADEMIA_IDS = ["929052879879299193", "1060926858759245854", "1260533155195125872"];
const FC_IDS = [""];

function getStatusIcon(status) {
    const base = "absolute bottom-0 right-0 w-5 h-5 rounded-full border-[3px] border-[#1b2733] flex items-center justify-center";
    if (status === 'online') return `<div class="${base} bg-[#23a55a]"></div>`;
    if (status === 'dnd') return `<div class="${base} bg-[#f23f43]"><div class="w-2.5 h-0.5 bg-[#1b2733] rounded-full"></div></div>`;
    if (status === 'idle') return `<div class="${base} bg-[#f0b232]"><div class="w-2.5 h-2.5 bg-[#1b2733] rounded-full translate-x-[-2px] translate-y-[-2px]"></div></div>`;
    return `<div class="${base} bg-[#80848e]"><div class="w-2 h-2 bg-[#1b2733] rounded-full"></div></div>`;
}

async function loadAdmins() {
    const container = document.getElementById("admins");
    try {
        const response = await fetch("https://discord-api-jqj5.onrender.com/admins");
        const members = await response.json();
        container.innerHTML = `
            <div class="w-full flex flex-col gap-12">
                <div class="flex flex-col items-center">
                    <h2 class="text-brand-blue text-[24px] font-bold mb-8 uppercase tracking-widest text-center">Główny Skład</h2>
                    <div id="main" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full"></div>
                </div>
                <div class="flex flex-col items-center">
                    <h2 class="text-brand-blue text-[24px] font-bold mb-8 uppercase tracking-widest text-center">Akademia</h2>
                    <div id="akad" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full"></div>
                </div>
            </div>
        `;
        members.forEach(m => {
            const card = document.createElement('div');
            card.className = `group relative flex flex-col items-center justify-start h-[250px] p-5 bg-white/5 border border-white/10 rounded-[15px] transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-[10px] hover:border-brand-blue hover:shadow-[0_10px_25px_rgba(0,180,255,0.3)] cursor-pointer animate-section-in`;
            const activityHtml = m.status !== 'offline' && m.game 
                ? `<div class="mt-auto pb-2 text-[13px] text-white/80 text-center italic tracking-tight">Gra w: <span class="text-brand-blue font-black drop-shadow-[0_0_8px_rgba(0,180,255,0.5)]">${m.game}</span></div>` 
                : '<div class="mt-auto"></div>';
            card.innerHTML = `
                <div class="relative mb-3">
                    <img src="${m.avatar}" class="w-20 h-20 rounded-full border-[3px] border-brand-blue object-cover shadow-[0_0_15px_rgba(0,180,255,0.4)]">
                    ${getStatusIcon(m.status)}
                </div>
                <p class="font-bold text-[18px] text-white tracking-wide mb-1">${m.username}</p>
                ${activityHtml}
            `;
            card.onclick = () => openModal(m);
            const target = AKADEMIA_IDS.includes(m.id) ? "akad" : "main";
            document.getElementById(target).appendChild(card);
        });
    } catch (e) { container.innerHTML = "Błąd połączenia."; }
}

function showTrackers(m) {
    const body = document.getElementById("modal-body");
    const fcButton = FC_IDS.includes(m.id) 
        ? `<a href="${FC_TRACKER_LINKS[m.id] || '#'}" target="_blank" class="flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white border border-green-500/30 py-4 rounded-xl transition-all font-black text-sm uppercase tracking-widest shadow-lg active:scale-95">EA FC Tracker</a>`
        : '';

    body.innerHTML = `
        <div class="flex flex-col items-center justify-center w-full h-full min-h-[300px] animate-section-in">
            <h3 class="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-6 italic">Wybierz Tracker</h3>
            <div class="grid grid-cols-1 gap-4 w-full mb-8">
                <a href="${RL_TRACKER_LINKS[m.id] || '#'}" target="_blank" class="flex items-center justify-center gap-2 bg-[#00b4ff]/10 hover:bg-[#00b4ff] text-[#00b4ff] hover:text-white border border-[#00b4ff]/30 py-4 rounded-xl transition-all font-black text-sm uppercase tracking-widest shadow-lg active:scale-95">Rocket League</a>
                <a href="${FN_TRACKER_LINKS[m.id] || '#'}" target="_blank" class="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/20 text-white border border-white/10 py-4 rounded-xl transition-all font-black text-sm uppercase tracking-widest shadow-lg active:scale-95">Fortnite</a>
                ${fcButton}
            </div>
            <button onclick='openModal(${JSON.stringify(m)})' class="mt-auto w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 transition-all font-black text-xs uppercase tracking-widest active:scale-95">
                Powrót
            </button>
        </div>
    `;
}

function openModal(m) {
    const modal = document.getElementById("user-modal");
    const activityInfo = m.status !== 'offline' && m.game 
        ? `<div class="flex items-center justify-center gap-2 text-[13px] text-brand-blue bg-brand-blue/10 px-4 py-2 rounded-xl mb-4 border border-brand-blue/20 font-bold italic drop-shadow-[0_0_5px_rgba(0,180,255,0.3)]">
            <span class="text-white/60 not-italic font-medium">Aktualnie w:</span> ${m.game}
           </div>` 
        : '';

    document.getElementById("modal-body").innerHTML = `
        <div class="animate-section-in flex flex-col items-center">
            <div class="relative mb-4">
                <img src="${m.avatar}" class="w-[110px] h-[110px] rounded-full border-4 border-brand-blue shadow-[0_0_25px_rgba(0,180,255,0.4)]">
                <div class="scale-125 transform translate-x-[-2px] translate-y-[-2px]">
                    ${getStatusIcon(m.status)}
                </div>
            </div>
            <h2 class="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">${m.username}</h2>
            ${activityInfo}
            <div class="modal-description-container overflow-y-auto max-h-[120px] mb-8 px-2 text-center">
                <p class="text-white/70 text-sm leading-relaxed">${USER_DESCRIPTIONS[m.id] || "Brak opisu."}</p>
            </div>
            <button onclick='showTrackers(${JSON.stringify(m)})' class="w-full flex items-center justify-center gap-2 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 py-4 rounded-xl transition-all font-black text-base uppercase tracking-widest shadow-lg active:scale-95">
                Trackery
            </button>
        </div>
    `;
    modal.classList.replace('hidden', 'flex');
}

document.querySelector(".close-modal").onclick = () => document.getElementById("user-modal").classList.replace('flex', 'hidden');
window.onclick = (e) => { if (e.target.id === "user-modal") e.target.classList.replace('flex', 'hidden'); };
loadAdmins();