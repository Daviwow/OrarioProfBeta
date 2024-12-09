const schedules = {
    cristina: {
        name: "Cristina Corazza",
        schedule: {
            LUNEDI: "5AL/vuoto/1B/AL/vuoto/vuoto/vuoto",
            MARTEDI: "1BL/1AL/1BL/1B/1B/vuoto/vuoto",
            MERCOLEDI: "5AL/5AL/vuoto/1B/1BL/vuoto/vuoto",
            GIOVEDI: "1BL/1AL/1BL/vuoto/vuoto/vuoto/vuoto",
            VENERDI: "vuoto/vuoto/vuoto/1BL/1BL/5AL/vuoto"
        }
    },
    roberta: { name: "Roberta Roberti", schedule: "Indefinita" },
    patrizia: { name: "Patrizia Mazzotta", schedule: "Indefinita" },
    eleonora: { name: "Eleonora Pace", schedule: "Indefinita" },
    marta: { name: "Marta Loforte", schedule: "Indefinita" },
    silvia: { name: "Silvia Vallefuoco", schedule: "Indefinita" },
    simona: { name: "Simona Previti", schedule: "Indefinita" },
    sathya: { name: "Sathya Piatto", schedule: "Indefinita" },
    andrea: { name: "Andrea Granchi", schedule: "Indefinita" },
    "roberta-g": { name: "Roberta Glielmi", schedule: "Indefinita" },
    rosa: { name: "Rosa Greco", schedule: "Indefinita" }
};

let currentProfileImage = "";
let audioElement = null;
let isMuted = false;

function showDetails(personKey) {
    const person = schedules[personKey];
    document.getElementById("person-name").textContent = person.name;

    if (personKey === "cristina") currentProfileImage = "cosmopolita.png";
    else if (personKey === "roberta") currentProfileImage = "scorbutica.png";
    else if (personKey === "patrizia") currentProfileImage = "strega.png";
    else if (personKey === "eleonora") currentProfileImage = "swiftie.png";
    else if (personKey === "marta") currentProfileImage = "fuggiasca.png";
    else if (personKey === "silvia") currentProfileImage = "butterfly.png";
    else if (personKey === "simona") currentProfileImage = "gelataia.png";
    else if (personKey === "sathya") currentProfileImage = "turutututu.png";
    else if (personKey === "andrea") currentProfileImage = "gesu.png";
    else if (personKey === "roberta-g") currentProfileImage = "potenza.png";
    else if (personKey === "rosa") currentProfileImage = "frescafragrante.png";

    if (currentProfileImage) {
        const audioName = currentProfileImage.replace(".png", ".mp3");
        const audioSrc = `songs/${audioName}`;
        playAudio(audioSrc);
    }

    const currentDay = getCurrentDay();
    const currentHour = getCurrentHour();

    if (typeof person.schedule === "string") {
        document.getElementById("schedule").textContent = person.schedule;
    } else {
        const todaySchedule = person.schedule[currentDay] || "vuoto/vuoto/vuoto/vuoto/vuoto/vuoto/vuoto";
        const classes = todaySchedule.split("/");
        const currentClass = classes[currentHour] || "vuoto";
        document.getElementById("schedule").textContent = 
            `Oggi è ${currentDay}, l'ora attuale è ${currentHour + 1}. Classe: ${currentClass}`;
    }

    document.getElementById("main-container").style.display = "none";
    document.getElementById("details-container").style.display = "block";
}

function playAudio(src) {
    if (!audioElement) audioElement = document.getElementById("profile-audio");
    audioElement.src = src;
    audioElement.volume = isMuted ? 0 : 0.4;
    audioElement.play();
}

function toggleSound() {
    isMuted = !isMuted;
    const soundIcon = document.getElementById("sound-icon");
    soundIcon.src = isMuted ? "assets/soundno.png" : "assets/sound.png";
    if (audioElement) audioElement.volume = isMuted ? 0 : 0.4;
}

function showTimetable() {
    const pdfViewer = document.getElementById("pdf-viewer");
    if (currentProfileImage) {
        const pdfName = currentProfileImage.replace(".png", ".pdf");
        pdfViewer.src = `Tables/${pdfName}`;
        pdfViewer.style.display = "block";
    } else {
        alert("Errore: impossibile trovare l'orario.");
    }
}

function goBack() {
    document.getElementById("main-container").style.display = "block";
    document.getElementById("details-container").style.display = "none";
    document.getElementById("pdf-viewer").style.display = "none";
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
}

function getCurrentDay() {
    const days = ["DOMENICA", "LUNEDI", "MARTEDI", "MERCOLEDI", "GIOVEDI", "VENERDI", "SABATO"];
    const now = new Date();
    return days[now.getDay()];
}

function getCurrentHour() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 8 && hour < 15) return hour - 8;
    return -1;
}
