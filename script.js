// ===== helpers =====
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const EMAIL = "batchuamitha@gmail.com";

// ===== footer year =====
$("#year").textContent = new Date().getFullYear();

// ===== theme toggle (cyber dark default) =====
const themeBtn = $("#themeBtn");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";
  if (next) document.documentElement.setAttribute("data-theme", next);
  else document.documentElement.removeAttribute("data-theme");
  localStorage.setItem("theme", next || "");
});

// ===== copy email =====
$("#copyEmailBtn").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    toast("Email copied ✅");
  } catch {
    toast("Copy failed — please copy manually.");
  }
});

// ===== project filters =====
const buttons = $$(".chipbtn");
const cards = $$("#projectCards .card");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const f = btn.dataset.filter;
    cards.forEach(card => {
      const tags = (card.dataset.tags || "").split(" ");
      const show = (f === "all") || tags.includes(f);
      card.style.display = show ? "" : "none";
    });
  });
});

// ===== modal =====
const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");

function openModal(title, body){
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

$$(".openModal").forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.title, btn.dataset.body);
  });
});

$("#closeModal").addEventListener("click", closeModal);
$("#okModal").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if(e.key === "Escape") closeModal(); });

// ===== contact email draft =====
$("#mailBtn").addEventListener("click", () => {
  const name = $("#nameInput").value.trim();
  const msg  = $("#msgInput").value.trim();
  const subject = encodeURIComponent(`Full-time opportunity - Amitha Batchu (${name || "Intro"})`);
  const body = encodeURIComponent(
`Hi Amitha,

${msg || "I’d like to connect regarding full-time opportunities."}

Thanks,
${name || ""}`
  );
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
});

// ===== typewriter (terminal) =====
const lines = [
  "Scanning candidate profile…",
  "✔ Data Science: EDA • Feature Engineering • ML Modeling • Evaluation • Deployment",
  "✔ Software Engineering: REST APIs • Microservices • System Design • Security (OAuth/JWT)",
  "✔ Tools: Python • SQL • PyTorch/TensorFlow • AWS/Azure/GCP • Power BI/Tableau",
  "✔ Experience: Quixy (DS) • Vixspace (SE)",
  "",
  "Result: Strong hybrid candidate for Data Scientist / ML Engineer / Software Engineer roles."
];

const typeTarget = $("#typeTarget");
let i = 0, j = 0;
function type(){
  if(i >= lines.length) return;
  const line = lines[i];
  if(j <= line.length){
    typeTarget.textContent = lines.slice(0,i).join("\n") + "\n" + line.slice(0,j) + (i < lines.length-1 ? "▌" : "");
    j++;
    setTimeout(type, Math.max(12, 30 - j));
  } else {
    i++; j = 0;
    setTimeout(type, 280);
  }
}
type();

// ===== tiny toast =====
let toastEl;
function toast(msg){
  if(!toastEl){
    toastEl = document.createElement("div");
    toastEl.style.position = "fixed";
    toastEl.style.left = "50%";
    toastEl.style.bottom = "18px";
    toastEl.style.transform = "translateX(-50%)";
    toastEl.style.padding = "10px 12px";
    toastEl.style.borderRadius = "14px";
    toastEl.style.border = "1px solid rgba(255,255,255,.18)";
    toastEl.style.background = "rgba(10,12,24,.75)";
    toastEl.style.backdropFilter = "blur(10px)";
    toastEl.style.color = "white";
    toastEl.style.fontWeight = "800";
    toastEl.style.zIndex = "999";
    toastEl.style.display = "none";
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(()=> toastEl.style.display="none", 1600);
}
