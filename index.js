import { SaveData, updateGradient } from "./data/classes_required.js";

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

const GradientsPerPage =2;
let currentPage=1;
export const getStoredGradients=()=>JSON.parse(localStorage.getItem("gradients"))||[]

const updateGradientDisplay=()=>{
    Object.keys(pickers_1).forEach((key) => {
    labels_1[key].innerText = pickers_1[key].value;
  });
}
const updatelinearGradient1=()=>{
    const g1= new updateGradient('linear',3);
    const gradient=g1.buildGradient();
    g1.applyGradient(gradient)
    const sav=new SaveData(gradient,'linear') 
    sav.checkGradientAndSave()  
}
const updatelinearGradient2=()=>{
    const g2= new updateGradient('linear',2);
    const gradient=g2.buildGradient();
    g2.applyGradient(gradient)
    const sav=new SaveData(gradient,'linear') 
    sav.checkGradientAndSave()    
}

const updateradialGradient1=()=>{
    const r1= new updateGradient('radial',3);
    const gradient=r1.buildGradient();
    r1.applyGradient(gradient)  
    const sav=new SaveData(gradient,'radial') 
    sav.checkGradientAndSave() 
}

const updateradialGradient2=()=>{
    const r2= new updateGradient('radial',3);
    const gradient=r2.buildGradient();
    r2.applyGradient(gradient)  
    const sav=new SaveData(gradient,'radial') 
    sav.checkGradientAndSave() 
}


const renderPagination = (gradients) => {
  const totalPages = Math.ceil(gradients.length / GradientsPerPage);
  const page = document.querySelector(".pagination");
  page.innerHTML = ""; 

  const maxVisible = 5; // number of page buttons visible at once
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);

  // Adjust start if we’re at the end
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  // Always show "1" if not in range
  if (start > 1) {
    addButton(1);
    if (start > 2) addEllipsis();
  }

  // Middle range
  for (let i = start; i <= end; i++) {
    addButton(i);
  }

  // Always show "last" if not in range
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
  const paginated = gradients.slice(start, end);

  contents.innerHTML = paginated.map((g) => `
      <div class="list-card">
        <div class="preview" style="background:${g.key}"></div>
        <h4>${g.key}</h4>
      </div>`
    )
    .join("");

  renderPagination(gradients);
};

Object.keys(pickers_1).forEach((key) => {
  pickers_1[key].addEventListener('input',updateGradientDisplay );
});

document.getElementById("LinearBtn1").addEventListener('click',updatelinearGradient1)
document.getElementById("LinearBtn2").addEventListener('click',updatelinearGradient2)
document.getElementById("RadialBtn1").addEventListener('click',updateradialGradient1)
document.getElementById("RadialBtn2").addEventListener('click',updateradialGradient2)
updateGradientDisplay();
renderGradientList(getStoredGradients());