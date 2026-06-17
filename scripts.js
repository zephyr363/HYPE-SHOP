// Build WhatsApp links with a pre-filled message
var waMessage =
    "Здравствуйте! Хочу узнать о наличии размеров и новых поступлениях 👟";
var waUrl = "https://wa.me/77070606699?text=" + encodeURIComponent(waMessage);
document.querySelectorAll(".js-whatsapp").forEach(function (a) {
    a.href = waUrl;
});

// Mobile nav toggle
var toggle = document.getElementById("navToggle");
var header = document.getElementById("siteHeader");
toggle.addEventListener("click", function () {
    var open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
});

// Live open/closed status (Astana = Asia/Almaty, UTC+5, no DST)
function getAstanaMinutes() {
    var parts = new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Asia/Almaty",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).formatToParts(new Date());
    var h = 0,
        m = 0;
    parts.forEach(function (p) {
        if (p.type === "hour") h = parseInt(p.value, 10);
        if (p.type === "minute") m = parseInt(p.value, 10);
    });
    return h * 60 + m;
}
function applyStatus() {
    var mins = getAstanaMinutes();
    var open = mins >= 11 * 60 && mins < 20 * 60;
    var dots = document.querySelectorAll(".js-dot");
    dots.forEach(function (d) {
        d.classList.toggle("closed", !open);
    });
    var heroText = document.querySelector(".js-status-text");
    if (heroText) {
        heroText.textContent = open
            ? "Открыто сейчас · до 20:00"
            : "Закрыто · откроется в 11:00";
    }
    document.querySelectorAll(".js-stamp-status").forEach(function (s) {
        s.classList.toggle("stamp--green", open);
    });
    document.querySelectorAll(".js-stamp-num").forEach(function (s) {
        s.textContent = open ? "OPEN" : "CLOSED";
    });
    document.querySelectorAll(".js-stamp-label").forEach(function (s) {
        s.textContent = open ? "11:00–20:00" : "до 11:00";
    });
}
applyStatus();
setInterval(applyStatus, 60000);
