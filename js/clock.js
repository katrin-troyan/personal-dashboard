const greetingElement = document.querySelector(".greeting");
const timeElement = document.querySelector(".current-time");
const dateElement = document.querySelector(".current-data");

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

function updateClock() {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formatTime = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
  timeElement.textContent = formatTime;
}

function updateDate() {
  const now = new Date();
  const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];
  const days = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
  ];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const dayOfWeek = days[now.getDay()];

  const formDate = `${day} ${month} ${year}, ${dayOfWeek}`;
  dateElement.textContent = formDate;
}
function changeName() {
  const newName = prompt("Введіть ваше ім\'я:");
  if (newName && newName.trim() !== "") {
    localStorage.setItem("userName", newName.trim());
    updateGreeting();
  }
}
window.changeName = changeName;

function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();

  const morning = [
    "доброго ранку! Кава вже поруч?",
    "ранок настав, ти — герой",
    "ранкове виживання почалось",
    "новий день — нові можливості! ☀️",
    "прокидайся, сонце! ☕",
    "ранній птах ловить баги 🐛",
  ];

  const day = [
    "день у розпалі — тримаємось!",
    "продуктивність: увімкнено (майже)",
    "саме час робити великі справи",
  ];

  const evening = [
    "вечір прийшов — можна видихнути 🌙",
    "режим відпочинку дозволено 🛋️",
    "вечірній вайб активовано ✨",
    "час для релаксу! 🎮",
  ];

  let greeting = "";
  if (hours < 12) {
    greeting = morning[Math.floor(Math.random() * morning.length)];
  } else if (hours < 18) {
    greeting = day[Math.floor(Math.random() * day.length)];
  } else {
    greeting = evening[Math.floor(Math.random() * evening.length)];
  }

  const userName = localStorage.getItem("userName") || "Kateryna";
  greetingElement.textContent = `${userName}, ${greeting} `;
}

function initClock() {
  updateClock();
  updateDate();
  updateGreeting();

  setInterval(updateClock, 1000);
  setInterval(() => {
    updateDate();
  }, 60000);
}
initClock();
