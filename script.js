const schedules = {
    cristina: {
        name: "Cristina Corazza",
        schedule: {
            LUNEDI: "5AL/Nessuna/1B/AL/Nessuna/Nessuna/Nessuna",
            MARTEDI: "1BL/1AL/1BL/1B/1B/Nessuna/Nessuna",
            MERCOLEDI: "5AL/5AL/Nessuna/1B/1BL/Nessuna/Nessuna",
            GIOVEDI: "1BL/1AL/1BL/Nessuna/Nessuna/Nessuna/Nessuna",
            VENERDI: "Nessuna/Nessuna/Nessuna/1BL/1BL/5AL/Nessuna"
        }
    },
    roberta: {
        name: "Roberta Roberti",
        schedule: "Indefinita"
    },
    patrizia: {
        name: "Patrizia Mazzotta",
        schedule: "Indefinita"
    },
    eleonora: {
        name: "Eleonora Pace",
        schedule: "Indefinita"
    },
    marta: {
        name: "Marta Loforte",
        schedule: "Indefinita"
    },
    silvia: {
        name: "Silvia Vallefuoco",
        schedule: "Indefinita"
    },
    simona: {
        name: "Simona Previti",
        schedule: "Indefinita"
    }
};

let currentProfileImage = "";
let audioElement = null;
let isMuted = false;

function showDetails(personKey) {
    const person = schedules[personKey];
    document.getElementById("person-name").textContent = person.name;

    // Determinare l'immagine del professoere e il file audio corrispondente
    if (personKey === "cristina") {
        currentProfileImage = "cosmopolita.png";
    } else if (personKey === "roberta") {
        currentProfileImage = "scorbutica.png";
    } else if (personKey === "patrizia") {
        currentProfileImage = "strega.png";
    } else if (personKey === "eleonora") {
        currentProfileImage = "swiftie.png";
    } else if (personKey === "marta") {
        currentProfileImage = "fuggiasca.png";
    } else if (personKey === "silvia") {
        currentProfileImage = "butterfly.png";
    } else if (personKey === "simona") {
        currentProfileImage = "gelataia.png";
    }

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
        const todaySchedule = person.schedule[currentDay] || "Nessuna/Nessuna/Nessuna/Nessuna/Nessuna/Nessuna/Nessuna";
        const classes = todaySchedule.split("/");
        const currentClass = classes[currentHour] || "Nessuna";
        document.getElementById("schedule").textContent =
            `Oggi è ${currentDay}, l'ora attuale è ${currentHour + 1}. Classe: ${currentClass}`;
    }

    document.getElementById("main-container").style.display = "none";
    document.getElementById("details-container").style.display = "block";
}

function playAudio(src) {
    if (!audioElement) {
        audioElement = document.getElementById("profile-audio");
    }
    audioElement.src = src;
    audioElement.volume = isMuted ? 0 : 0.4;
    audioElement.play();
}

function toggleSound() {
    isMuted = !isMuted;
    const soundIcon = document.getElementById("sound-icon");
    soundIcon.src = isMuted ? "assets/soundno.png" : "assets/sound.png";

    if (audioElement) {
        audioElement.volume = isMuted ? 0 : 0.4;
    }
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
    if (hour >= 8 && hour < 15) {
        return hour - 8;
    }
    return -1;
}
