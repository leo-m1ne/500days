
/* OUR LITTLE UNIVERSE — INTERACCIONES */

// PERSONALIZA LAS PREGUNTAS AQUÍ
const questions = [
  {
    question: "What is my favorite thing about us?",
    answers: [
      "The little moments we share",
      "Being perfect all the time",
      "Never having anything to talk about"
    ],
    correct: 0,
    message: "It's all the little things that become our favorite memories. ♡"
  },
  {
    question: "If we could go anywhere together, what would I choose?",
    answers: [
      "Somewhere with no internet",
      "Anywhere, as long as we're together",
      "Somewhere where we can't talk"
    ],
    correct: 1,
    message: "The place matters less when I get to share it with you. ✧"
  },
  {
    question: "What would I give you in another universe?",
    answers: [
      "A thousand reasons to smile",
      "A lifetime of homework",
      "Absolutely nothing"
    ],
    correct: 0,
    message: "And I would find a thousand more ways to love you."
  },
  {
    question: "What is my favorite kind of memory?",
    answers: [
      "The ones I forget",
      "The ones where we argue",
      "The little moments that remind me of you"
    ],
    correct: 2,
    message: "Even the smallest moments can mean the whole world. ♡"
  },
  {
    question: "Would I find you in another universe?",
    answers: [
      "Maybe, if I remembered",
      "I'd look for you in every single one",
      "I would never look"
    ],
    correct: 1,
    message: "In every universe, I hope our paths cross again."
  }
];

// ELEMENTOS DE LA PÁGINA
const screens = document.querySelectorAll(".screen");
const stars = document.getElementById("stars");

const startBtn = document.getElementById("startBtn");
const questionCount = document.getElementById("questionCount");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

const questionArea = document.getElementById("questionArea");
const gameResult = document.getElementById("gameResult");

const toMemoriesBtn = document.getElementById("toMemoriesBtn");
const toLetterBtn = document.getElementById("toLetterBtn");
const finalBtn = document.getElementById("finalBtn");
const restartBtn = document.getElementById("restartBtn");

let currentQuestion = 0;
let answered = false;
let score = 0;

// CAMBIAR ENTRE SECCIONES
function showScreen(screenId) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const destination = document.getElementById(screenId);

  if (destination) {
    destination.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// CREAR ESTRELLITAS DECORATIVAS
function createStars() {
  const symbols = ["✧", "✦", "·", "♡", "⋆"];

  for (let i = 0; i < 42; i++) {
    const star = document.createElement("span");

    star.className = "sparkle";
    star.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (10 + Math.random() * 15) + "px";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = (1.5 + Math.random() * 3) + "s";

    stars.appendChild(star);
  }
}

// MOSTRAR LA PREGUNTA ACTUAL
function renderQuestion() {
  answered = false;

  const q = questions[currentQuestion];
  const progress = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  questionCount.textContent =
    `question ${currentQuestion + 1} of ${questions.length}`;

  progressPercent.textContent = progress + "%";
  progressBar.style.width = progress + "%";
  questionText.textContent = q.question;

  answersContainer.innerHTML = "";
  feedback.textContent = "";
  nextBtn.classList.add("hidden");

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}

// COMPROBAR RESPUESTA
function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = answersContainer.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.correct) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && index !== q.correct) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    feedback.textContent = "That's right! " + q.message;
  } else {
    feedback.textContent =
      "Not quite, but that's okay. " + q.message;
  }

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "unlock my surprise ♡"
      : "next question ♡";

  nextBtn.classList.remove("hidden");
}

// AVANZAR EN EL JUEGO
function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    questionArea.classList.add("hidden");
    gameResult.classList.remove("hidden");

    const resultMessage = document.querySelector("#gameResult p");

    resultMessage.textContent =
      `You got ${score} out of ${questions.length} answers right. ` +
      "But you never have to get everything right to be loved.";
  }
}

// REINICIAR EL JUEGO
function restartGame() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  questionArea.classList.remove("hidden");
  gameResult.classList.add("hidden");

  renderQuestion();
  showScreen("home");
}

// BOTONES
startBtn.addEventListener("click", () => {
  showScreen("game");
  renderQuestion();
});

nextBtn.addEventListener("click", nextQuestion);

toMemoriesBtn.addEventListener("click", () => {
  showScreen("memories");
});

toLetterBtn.addEventListener("click", () => {
  showScreen("letter");
});

finalBtn.addEventListener("click", () => {
  showScreen("final");
});

restartBtn.addEventListener("click", restartGame);

// INICIAR
createStars();
