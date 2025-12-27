const TRACKER_LINKS = {
    "1119898337223639040": "https://rocketleague.tracker.network/rocket-league/profile/epic/G0koo_/overview",
    "1260529902495727626": "https://rocketleague.tracker.network/rocket-league/profile/epic/hubonrl./overview",
    "899678477463220305": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20Prawą%20Ręką/overview",
    "929052879879299193": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20I%20do%20pieca%20Fizzu/overview",
    "1060926858759245854": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20MoLI4./overview",
    "1260533155195125872": "https://rocketleague.tracker.network/rocket-league/profile/epic/%20PeDrORl.4/overview"
};

const USER_DESCRIPTIONS = {
    "1119898337223639040": "Fortnitowy placementowiec,<br>Rocket League`owy mid-field player.", // Gokoo
    "1260529902495727626": "Fortnitowy niby frager (pomiędzy semi-pro, a pro), Rocket League`owy diament z ambicjami SSL`a,<br>EA FC ledwie utzymująca się 5 dywizja z chujowymi piłkarzami.", // hubon
    "899678477463220305": "Nie gra bo ma chujowy ping, ale w Fortnite nie umie budować, a w Rocket League drugi Szczęsny z 2022 roku, broni nawet atak Wehrmachtu na bramke.", // Resdex
    "929052879879299193": "Fortnitowy napocony 13 latek ogólnie mocny agent, Rocket League`owy turek kręcocy kebaby w powietrzu.", // Fizzu
    "1060926858759245854": "W Fortnite nie gra odkąd pamiętam ale kiedyś był dobry, wszechstronny bramkarz w Rocket League, w EA FC walczy o najwyższe wyniki, potrafi z gówno składu wyciagnąć co najlepsze.", // Moli
    "1260533155195125872": "Wszechstrony player Fortnite oraz Rocket League, odnajdzie się w każdej sytuacji działając, czasem skutecznie." // Kalgon
};

const AKADEMIA_IDS = ["929052879879299193", "1060926858759245854", "1260533155195125872"];

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
                ? `<div class="mt-auto pb-1 text-[11px] text-[#b9bbbe] text-center italic">Gra w: <span class="text-brand-blue font-bold">${m.game}</span></div>` 
                : '<div class="mt-auto"></div>';

            card.innerHTML = `
                <div class="relative mb-3">
                    <img src="${m.avatar}" class="w-20 h-20 rounded-full border-[3px] border-brand-blue object-cover shadow-[0_0_15px_rgba(0,180,255,0.4)]">
                    ${getStatusIcon(m.status)}
                </div>
                <p class="font-bold text-[16px] text-white tracking-wide">${m.username}</p>
                ${activityHtml}
            `;
            
            card.onclick = () => openModal(m);
            const target = AKADEMIA_IDS.includes(m.id) ? "akad" : "main";
            document.getElementById(target).appendChild(card);
        });
    } catch (e) { container.innerHTML = "Błąd połączenia."; }
}

function openModal(m) {
    const modal = document.getElementById("user-modal");
    const gameInfo = m.game ? `🎮 ${m.game}` : '';

    document.getElementById("modal-body").innerHTML = `
        <div class="flex flex-col items-center w-full text-center">
            <div class="relative mb-6">
                <img src="${m.avatar}" class="w-[130px] h-[130px] rounded-full border-4 border-brand-blue shadow-[0_0_30px_rgba(0,180,255,0.4)]">
                <div class="scale-150 transform translate-x-[-2px] translate-y-[-2px]">
                    ${getStatusIcon(m.status)}
                </div>
            </div>
            
            <div class="flex flex-col items-center gap-2">
                <h2 class="text-4xl font-black text-white tracking-tight">${m.username}</h2>
                ${gameInfo ? `
                    <div class="text-[13px] text-brand-blue bg-brand-blue/15 px-5 py-2 rounded-2xl font-bold italic border border-brand-blue/20">
                        ${gameInfo}
                    </div>
                ` : ''}
            </div>
        </div>

        <div class="modal-description-container overflow-y-auto max-h-[180px] my-8 px-4 w-full">
            <p class="text-[#cbd5e0] text-[16px] leading-relaxed text-center">
                ${USER_DESCRIPTIONS[m.id] || "Brak szczegółowego opisu profilu."}
            </p>
        </div>
        
        <div class="flex justify-center w-full shrink-0">
            <a href="${TRACKER_LINKS[m.id] || '#'}" target="_blank" class="bg-brand-blue text-white px-12 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 no-underline shadow-[0_10px_20px_rgba(0,180,255,0.3)]">
                OTWÓRZ TRACKER
            </a>
        </div>
    `;
    modal.classList.replace('hidden', 'flex');
}

document.querySelector(".close-modal").onclick = () => document.getElementById("user-modal").classList.replace('flex', 'hidden');
window.onclick = (e) => { if (e.target.id === "user-modal") e.target.classList.replace('flex', 'hidden'); };

loadAdmins();