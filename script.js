// =====================
// CATEGORIES
// =====================
const categories = [
  "Who Said That?",
  "Texts from the past",
  "Secret Lore",
  "Out of Context",
  "What happened Next?"
];

// =====================
// QUESTIONS (hardcoded)
// =====================
const questions = [
  [
    { question: "images/jacob_booze.png", answer: "images/jacob_answer.png" },
    { question: "Quote #2", answer: "Answer" },
    { question: "Quote #3", answer: "Answer" },
    { question: "Quote #4", answer: "Answer" },
    { question: "Quote #5", answer: "Answer" }
  ],
  [
    { question: "Text #1", answer: "Answer" },
    { question: "Text #2", answer: "Answer" },
    { question: "Text #3", answer: "Answer" },
    { question: "Text #4", answer: "Answer" },
    { question: "Text #5", answer: "Answer" }
  ],
  [
    { question: "Lore #1", answer: "Answer" },
    { question: "Lore #2", answer: "Answer" },
    { question: "Lore #3", answer: "Answer" },
    { question: "Lore #4", answer: "Answer" },
    { question: "Lore #5", answer: "Answer" }
  ],
  [
    { question: "Context #1", answer: "Answer" },
    { question: "Context #2", answer: "Answer" },
    { question: "Context #3", answer: "Answer" },
    { question: "Context #4", answer: "Answer" },
    { question: "Context #5", answer: "Answer" }
  ],
  [
    { question: "Next #1", answer: "Answer" },
    { question: "Next #2", answer: "Answer" },
    { question: "Next #3", answer: "Answer" },
    { question: "Next #4", answer: "Answer" },
    { question: "Next #5", answer: "Answer" }
  ]
];

function isImage(v) {
  return typeof v === "string" && v.match(/\.(png|jpg|gif)$/i);
}

// =====================
// BOARD GENERATION
// =====================
function generateBoard() {
  const board = document.getElementById("jeopardyBoard");
  board.innerHTML = "";

  // Category headers
  categories.forEach(c => {
    const div = document.createElement("div");
    div.className = "category";
    div.textContent = c;
    board.appendChild(div);
  });

  // Question cells
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = `$${(r + 1) * 100}`;
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.onclick = () => showQuestion(r, c);
      board.appendChild(cell);
    }
  }
}

// =====================
// MODAL HANDLING
// =====================
const modal = document.getElementById("questionModal");
const questionText = document.getElementById("questionText");
const answerText = document.getElementById("answerText");
const revealButton = document.getElementById("revealButton");
const closeButton = document.getElementById("closeButton");
let currentCell = null;

function showQuestion(r, c) {
  currentCell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
  const q = questions[c][r];

  questionText.innerHTML = "";
  answerText.innerHTML = "";

  if (isImage(q.question)) {
    const img = document.createElement("img");
    img.src = q.question;
    questionText.appendChild(img);
  } else {
    questionText.textContent = q.question;
  }

  if (isImage(q.answer)) {
    const img = document.createElement("img");
    img.src = q.answer;
    answerText.appendChild(img);
  } else {
    answerText.textContent = q.answer;
  }

  answerText.classList.add("hidden");
  revealButton.classList.remove("hidden");
  closeButton.classList.add("hidden");
  modal.classList.remove("hidden");
}

revealButton.onclick = () => {
  answerText.classList.remove("hidden");
  revealButton.classList.add("hidden");
  closeButton.classList.remove("hidden");
  currentCell.classList.add("used");
};

closeButton.onclick = () => modal.classList.add("hidden");

// =====================
// TEAMS HANDLING
// =====================
const teamsList = document.getElementById("teamsList");
const addTeamButton = document.getElementById("addTeamButton");
let teams = [];

function enterToSave(el) {
  el.onkeydown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      el.blur();
    }
  };
}

function renderTeams() {
  teamsList.innerHTML = "";
  teams.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "team";

    const name = document.createElement("div");
    name.className = "team-name";
    name.contentEditable = true;
    name.textContent = t.name;
    name.onblur = () => t.name = name.textContent;
    enterToSave(name);

    const score = document.createElement("div");
    score.className = "team-score";
    score.contentEditable = true;
    score.textContent = t.score;
    score.onblur = () => {
      t.score = parseInt(score.textContent) || 0;
      score.textContent = t.score;
    };
    enterToSave(score);

    const del = document.createElement("button");
    del.textContent = "X";
    del.onclick = () => {
      teams.splice(i, 1);
      renderTeams();
    };

    div.append(name, score, del);
    teamsList.appendChild(div);
  });
}

addTeamButton.onclick = () => {
  teams.push({ name: `Team ${teams.length + 1}`, score: 0 });
  renderTeams();
};

// =====================
// NEW YEAR COUNTDOWN
// =====================
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const target = new Date(`Jan 1, ${now.getFullYear() + 1} 00:00:00`);
  const diff = target - now;

  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  countdownEl.textContent =
    `${h.toString().padStart(2, "0")}h ` +
    `${m.toString().padStart(2, "0")}m ` +
    `${s.toString().padStart(2, "0")}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =====================
// INITIALIZE BOARD AND TEAMS
// =====================
generateBoard();
renderTeams();
