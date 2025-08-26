import { generateshortUid } from "./data/shortid.js";
const color1=document.getElementById('startColorInput');
const color2=document.getElementById('midColorInput');
const color3=document.getElementById('endColorInput');
const card=document.getElementById("card-gradient");
const code=document.querySelector(".output-code");

function updateColor() {
     let c1 = color1.value;
     let c2 = color2.value;
     let c3 = color3.value;
    document.getElementById("startColorValue").innerText = c1;
    document.getElementById("midColorValue").innerText = c2;
    document.getElementById("endColorValue").innerText = c3;
}

const updateLinearGradient = () => {
    let degrees = Number(prompt("enter the gradient degrees (0-359): "));
    if(isNaN(degrees) || degrees<0 || degrees>360){
        return
    }
    card.style.background = `linear-gradient(${degrees}deg, ${color1.value}, ${color2.value}, ${color3.value})`;
    code.innerText= `linear-gradient(${degrees}deg, ${color1.value}, ${color2.value}, ${color3.value})`
    saveGradientData(degrees,"linear");
};

const radialGradient = () => {
    let degrees = Number(prompt("enter the gradient degrees (0-359): "));
    if(isNaN(degrees) || degrees<0 || degrees>360){
        return
    }
    card.style.background = `radial-gradient(${degrees}deg, ${color1.value}, ${color2.value}, ${color3.value})`;
    code.innerText= `radial-gradient(${degrees}deg, ${color1.value}, ${color2.value}, ${color3.value})`
    saveGradientData(degrees,"radial");
};



const saveGradientData = (degrees,type) => {
    html2canvas(card).then(
        (canvas) => {
            const imageData = canvas.toDataURL("image/png");
            const newgradients={
                id:generateshortUid(),
                image:imageData,
                colors: [color1.value, color2.value, color3.value],
                degrees:degrees,
                type:type   
            }
            const storedGradients = localStorage.getItem('gradients');
            let gradients = [];

            if (storedGradients) {
                try {
                    gradients = JSON.parse(storedGradients);
                } catch (e) {
                    console.error("Failed to parse gradients from localStorage:", e);
                }
            }

            // Add the new gradient to the array
            gradients.push(newgradients);

            // Save the updated array back to localStorage
            const json = JSON.stringify(gradients, null, 2); // Use 2 spaces for readability
            localStorage.setItem("gradients", json);

            console.log("Gradient saved successfully!");
        })
        .catch((err) => {
            console.error("Failed to generate canvas or save data:", err);
        });
    
};


color1.addEventListener("input", updateColor);
color2.addEventListener("input", updateColor);
color3.addEventListener("input", updateColor);

const generateLinearBtn = document.getElementById('generateLinearBtn');
generateLinearBtn.addEventListener('click', updateLinearGradient);
const generateRadialBtn = document.getElementById('generateRadialBtn');
generateRadialBtn.addEventListener('click', radialGradient);