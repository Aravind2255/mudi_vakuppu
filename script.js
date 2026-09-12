let photoURL = null;
function go(n) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById("p" + n).classList.add("active");
  if (n === 1) resetScanCard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
const scanFace = document.querySelector(".face");
const c = document.getElementById("counter");
let idleCounterTimer;
let idleCounterResetTimer;

function randomCardCount() {
  return Math.floor(42000 + Math.random() * 90000);
}

function stopIdleCounterLoop() {
  clearTimeout(idleCounterTimer);
  clearTimeout(idleCounterResetTimer);
}

function startIdleCounterLoop() {
  stopIdleCounterLoop();
  c.textContent = "0 hairs detected";
  idleCounterTimer = setTimeout(() => {
    if (scanFace.classList.contains("scanning") || scanFace.classList.contains("complete")) return;
    c.textContent = randomCardCount().toLocaleString() + " hairs detected";
    idleCounterResetTimer = setTimeout(() => {
      if (scanFace.classList.contains("scanning") || scanFace.classList.contains("complete")) return;
      startIdleCounterLoop();
    }, 2100);
  }, 3000);
}

function setScanCardState(state) {
  scanFace.classList.remove("scanning", "complete");
  if (state) scanFace.classList.add(state);
  if (state === "scanning" || state === "complete") {
    stopIdleCounterLoop();
  } else {
    startIdleCounterLoop();
  }
}
function resetScanCard() {
  setScanCardState("");
}

startIdleCounterLoop();

function showRandomBaldImage() {
  const baldImages = [
    "images/bald1.png",
    "images/bald2.jpg",
    "images/bald3.jpg",
    "images/bald4.jpg",
    "images/bald5.jpg",
  ];
  const selectedImage = baldImages[Math.floor(Math.random() * baldImages.length)];
  const futureVisual = document.getElementById("futureVisual");

  futureVisual.className = "cartoon-bald has-image";
  futureVisual.innerHTML =
    '<img src="' + selectedImage + '" alt="Random bald future prediction">';
}

document.getElementById("hairFile").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (!f) return;
  photoURL = URL.createObjectURL(f);
  const img = document.getElementById("preview");
  img.src = photoURL;
  img.style.display = "block";
});
function scan() {
  showRandomBaldImage();
  setScanCardState("scanning");
  document.getElementById("scanBtn").style.display = "none";
  document.getElementById("progressWrap").style.display = "block";
  const bar = document.getElementById("bar"),
    status = document.getElementById("status");
  const msgs = [
    "Locating follicles...",
    "Counting suspiciously small hairs...",
    "Comparing with a coconut...",
    "Running advanced forehead geometry...",
    "Consulting the ancient comb...",
  ];
  let i = 0;
  const timer = setInterval(() => {
    i++;
    bar.style.width = Math.min(i * 23, 100) + "%";
    status.textContent = msgs[Math.min(i, msgs.length - 1)];
  }, 520);
  setTimeout(() => {
    clearInterval(timer);
    finish();
  }, 2900);
}

function startRevealSequence() {
  const revealText = document.getElementById("revealText");
  const revealImage = document.getElementById("revealImage");
  const revealJoke = document.getElementById("revealJoke");
  const letters = Array.from(revealText.textContent);

  revealText.innerHTML = letters
    .map((letter) =>
      letter === " " ? '<span class="reveal-space"> </span>' : `<span>${letter}</span>`
    )
    .join("");
  revealText.classList.remove("reveal-text-falling");
  revealImage.classList.remove("reveal-image-falling");
  revealJoke.classList.remove("reveal-joke-visible");

  setTimeout(() => {
    revealText.classList.add("reveal-text-falling");
  }, 3000);

  setTimeout(() => {
    revealImage.classList.add("reveal-image-falling");
  }, 4300);

  setTimeout(() => {
    revealJoke.classList.add("reveal-joke-visible");
  }, 5200);

  setTimeout(() => {
    go(4);
  }, 7000);
}

function finish() {
  setScanCardState("complete");
  const hairs = photoURL
    ? Math.floor(68000 + Math.random() * 72000)
    : randomCardCount();
  c.textContent = hairs.toLocaleString() + " hairs detected";
  document.getElementById("hairNum").textContent = hairs.toLocaleString();
  const vibes = ["കൊള്ളാം", "കൊഴപ്പല്യ", "മോശം", "വളരെ മോശം", "വളരെ വളരെ മോശം"];
  document.getElementById("vibe").textContent =
    vibes[Math.floor(Math.random() * vibes.length)];
  const bald = Math.random() > 0.38;
  document.getElementById("verdict").textContent = bald
    ? "⚠️ അടുത്ത രണ്ട് വർഷത്തിനുള്ളിൽ നിങ്ങൾ ഇങ്ങനെയായിരിക്കും"
    : "✅ PREDICTION: HAIR SURVIVAL PROBABILITY IS... SUSPICIOUSLY GOOD.";
  document.getElementById("futureText").textContent = bald
    ? "Please enjoy your aerodynamic era."
    : "Your hair appears destined to remain. Unfortunately, our model cannot explain why.";
  go(3);
  startRevealSequence();
}
