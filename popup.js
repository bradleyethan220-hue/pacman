const insults = [
    "UR AN IDIOT HAHA",
    "BRO CAN'T ESCAPE",
    "WHY U SO SLOW",
    "HE'S BEHIND YOU",
    "L + SKILL ISSUE"
];

function spawnPopup() {
    const div = document.createElement("div");
    div.className = "popup";
    div.innerText = insults[Math.floor(Math.random() * insults.length)];

    div.style.left = Math.random() * (window.innerWidth - 260) + "px";
    div.style.top = Math.random() * (window.innerHeight - 120) + "px";

    document.getElementById("popupContainer").appendChild(div);

    setTimeout(() => div.remove(), 2500);
}

setInterval(spawnPopup, 4000);
