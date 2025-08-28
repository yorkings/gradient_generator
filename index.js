import { updateGradient, SaveData } from "./data/classes_required.js";

export const card = document.getElementById("card-gradient");
export const code = document.querySelector(".output-code");
const contents = document.querySelector(".list-gradients");

export const pickers_1= {
  start: document.getElementById("startColorInput"),
  mid: document.getElementById("midColorInput"),
  end: document.getElementById("endColorInput"),
};

const labels_1= {
  start: document.getElementById("startColorValue"),
  mid: document.getElementById("midColorValue"),
  end: document.getElementById("endColorValue"),
};

const GradientsPerPage = 20;
let currentPage = 1;
export const getStoredGradients = () => JSON.parse(localStorage.getItem("gradients")) || [];

// Unified function to handle gradient generation and saving
const handleGradientGeneration = (type, count, isRandom) => {
    const generator = new updateGradient(type, count);
    const gradient = isRandom ? generator.randomBuildGradient() : generator.buildGradient();
    generator.applyGradient(gradient);
    const saver = new SaveData(gradient, type);
    saver.checkGradientAndSave();
};

let interval;
const checkInifinty=(isInfinity)=>{
   if(isInfinity){
       clearInterval(interval);
       interval=setInterval(() => {
          let type=Math.random() <0.5?"linear":"radial"
          handleGradientGeneration(type,2,true);
      }, 5000);
    }else{
       clearInterval(interval);
    }
}


const updateGradientDisplay = () => {
    Object.keys(pickers_1).forEach((key) => {
    labels_1[key].innerText = pickers_1[key].value;
  });
}

const renderPagination = (gradients) => {
  const totalPages = Math.ceil(gradients.length / GradientsPerPage);
  const page = document.querySelector(".pagination");
  page.innerHTML = ""; 

  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  if (start > 1) {
    addButton(1);
    if (start > 2) addEllipsis();
  }

  for (let i = start; i <= end; i++) {
    addButton(i);
  }

  if (end < totalPages) {
    if (end < totalPages - 1) addEllipsis();
    addButton(totalPages);
  }

  function addButton(i) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderGradientList(gradients);
    });

    page.appendChild(btn);
  }

  function addEllipsis() {
    const span = document.createElement("span");
    span.textContent = "...";
    span.classList.add("ellipsis");
    page.appendChild(span);
  }
};

export const renderGradientList = (gradients) => {
  const start = (currentPage - 1) * GradientsPerPage;
  const end = start + GradientsPerPage;
  const sortGradients = gradients.sort((a,b) => b.time - a.time);
  const paginated = sortGradients.slice(start, end);

  contents.innerHTML = paginated.map((g) => `
      <div class="list-card">
        <div class="preview" style="background:${g.key}"></div>
        <h4>${g.key}</h4>
      </div>`
    ).join("");

  renderPagination(gradients);
};

// Event Listeners - now cleaner and more efficient
Object.keys(pickers_1).forEach((key) => {
  pickers_1[key].addEventListener('input', updateGradientDisplay);
});

document.getElementById("LinearBtn1").addEventListener('click', () => handleGradientGeneration('linear', 3, false));
document.getElementById("LinearBtn2").addEventListener('click', () => handleGradientGeneration('linear', 2, false));
document.getElementById("RadialBtn1").addEventListener('click', () => handleGradientGeneration('radial', 3, false));
document.getElementById("RadialBtn2").addEventListener('click', () => handleGradientGeneration('radial', 2, false)); // Fixed: changed to 2 colors as per your `updatelinearGradient2`
document.getElementById("RandomBtn1").addEventListener('click', () => handleGradientGeneration('linear', 2, true));
document.getElementById("RandomBtn2").addEventListener('click', () => handleGradientGeneration('radial', 2, true));
document.getElementById("RandomBtn3").addEventListener('click', () => checkInifinty(true));
document.getElementById("RandomBtn4").addEventListener('click', () => checkInifinty(false));

// Initial setup
updateGradientDisplay();
renderGradientList(getStoredGradients());