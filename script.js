// =====================
// CATEGORIES
// =====================
const categories = [
  "Who Said That?",
  "Texts from the ex",
  "Secret Lore",
  "What happened Next?",
  "Name Both Ends"
];

// =====================
// QUESTIONS (hardcoded with 'done' flag and 'read' flag)
// =====================
const questions = [
  [
    { question: "images/becky_gift.jpg", answer: "Becky", done: true, read: false },
    { question: "images/cant_believe_ur_married.JPEG", answer: "Kalahn", done: true, read: false },
    { question: "images/coffee_no_good.JPEG", answer: "Kendra", done: true, read: false },
    { question: "images/my_dad_picked_me_up.JPEG", answer: "Kalahn", done: true, read: false },
    { question: "", answer: "", done: false, read: false }
  ],
  [
    { question: "Text #1", answer: "Answer", done: false, read: false },
    { question: "images/jonah_ex.jpg", answer: "Jonah", done: true, read: false },
    { question: "images/emotionally_weak.JPEG", answer: "Emma", done: true, read: false },
    { question: "images/jake_kal_ex.JPEG", answer: "Kalahn", done: true, read: false },
    { question: "images/sarah_ex.JPEG", answer: "Sarah", done: true, read: false }
  ],
  [
    { question: "Lore #1", answer: "Answer", done: false, read: false },
    { question: "I was born with no wisdom teeth", answer: "Sarah", done: true, read: false },
    { question: "I can wiggle my ears", answer: "Jonah", done: true, read: false },
    { question: "I have drank people's fermented spit", answer: "Kalahn", done: true, read: false },
    { question: "When I was 4, I rode my christmas gift bike down that stairs", answer: "Austin", done: true, read: false }
  ],
  [
    { question: "images/jonah_barking.JPEG", answer: "Jonah started barking", done: true, read: false },
    { question: "Context #2", answer: "Answer", done: false, read: false },
    { question: "images/jonah_puking.jpg", answer: "Jonah started puking", done: true, read: false },
    { question: "Context #4", answer: "Answer", done: false, read: false },
    { question: "images/carlos_emma.JPEG", answer: "Carlos freaked out on a dude", done: true, read: false }
  ],
  [
    { question: "images/kal_jacob_high.PNG", answer: "Kalahn & Jacob", done: true, read: false },
    { question: "images/becky_kyle_no_location.jpg", answer: "Becky & Kyle", done: true, read: false },
    { question: "images/becky_jason_halloween.jpg", answer: "Becky & Jason", done: true, read: false },
    { question: "Next #5", answer: "Answer", done: false, read: false },
    { question: "images/jacob_booze.png", answer: "Jacob & Jason", done: true, read: false }
  ]
];

function isImage(v) {
  return typeof v === "string" && v.match(/\.(png|jpg|gif|JPEG)$/i);
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
      const q = questions[c][r];
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = `$${(r + 1) * 100}`;
      cell.dataset.row = r;
      cell.dataset.col = c;

      // Set initial color based on done/read
      if (q.done && !q.read) {
        cell.style.backgroundColor = "#0040a0"; // blue
        cell.style.color = "#f5c518";          // gold
      } else {
        cell.style.backgroundColor = "#555";   // gray
        cell.style.color = "#ccc";
      }

      cell.onclick = () => showQuestion(r, c, cell);
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
let currentQ = null;

function showQuestion(r, c, cell) {
  currentCell = cell;
  currentQ = questions[c][r];

  // Mark as read if not already
  currentQ.read = true;

  // Update color to gray if it was blue
  if (!currentQ.done || currentQ.read) {
    currentCell.style.backgroundColor = "#555";
    currentCell.style.color = "#ccc";
  }

  questionText.innerHTML = "";
  answerText.innerHTML = "";

  if (isImage(currentQ.question)) {
    const img = document.createElement("img");
    img.src = currentQ.question;
    questionText.appendChild(img);
  } else {
    questionText.textContent = currentQ.question;
  }

  if (isImage(currentQ.answer)) {
    const img = document.createElement("img");
    img.src = currentQ.answer;
    answerText.appendChild(img);
  } else {
    answerText.textContent = currentQ.answer;
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
