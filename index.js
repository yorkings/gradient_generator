import { generateshortUid } from "./data/shortid.js";
const card = document.getElementById("card-gradient");
const code = document.querySelector(".output-code");
const contents = document.querySelector(".list-gradients");

const pickers_1= {
  start: document.getElementById("startColorInput"),
  mid: document.getElementById("midColorInput"),
  end: document.getElementById("endColorInput"),
};

const labels_1= {
  start: document.getElementById("startColorValue"),
  mid: document.getElementById("midColorValue"),
  end: document.getElementById("endColorValue"),
};

class updateGradient{
    constructor(type,count){
      this.type=type;
      this.count=count;
    }
    generateStops(){
        let stops=[]
        if(this.count === 3){
            stops.push(Math.floor(Math.random()*33))
            stops.push(Math.floor(Math.random()*(67-33) + 33))
            stops.push(Math.floor(Math.random()*(100-67) + 67))
        }
        else{
            stops.push(0)
            let randomStop=Math.floor(Math.random()*(100-50)+ 50)
            stops.push(randomStop)
        }

        return stops.sort((a,b)=>a-b)
    }
    buildGradient(){
        let colors;
        switch(this.count){
            case 2:
               colors = [pickers_1.start.value, pickers_1.end.value];
                break;
            case 3:
                colors=Object.values(pickers_1).map(c=>c.value)
                break;

        }
        const stops=this.generateStops()
        const colorStops=colors.map((c,i)=>`${c} ${stops[i]}%`).join(',')
        
        if(this.type == "linear"){
            
            const degree=Math.floor(Math.random()*360)
            if(isNaN(degree)|| degree <=0 || degree >360){
                return `linear-gradient(to right, ${colorStops} )`
            }
            else{
                return `linear-gradient(${degree}deg,${colorStops})`
            }
        }
        else{
             const shape=Math.random()<0.5 ? "circle":"ellipse at center"
             return `radial-gradient(${shape},${colorStops})`
        }
    }

    applyGradient(gradient){
         card.style.background=gradient;
         code.innerText=gradient;
    }
}

// class SaveData{
//     constructor(gradient,)
// }
const updateGradientDisplay=()=>{
    Object.keys(pickers_1).forEach((key) => {
    labels_1[key].innerText = pickers_1[key].value;
  });
}
const updatelinearGradient1=()=>{
    const g1= new updateGradient('linear',3);
    const gradient=g1.buildGradient();
    g1.applyGradient(gradient)   
}
const updatelinearGradient2=()=>{
    const g2= new updateGradient('linear',2);
    const gradient=g2.buildGradient();
    g2.applyGradient(gradient)   
}

const updateradialGradient1=()=>{
    const r1= new updateGradient('radial',3);
    const gradient=r1.buildGradient();
    r1.applyGradient(gradient)  
}

Object.keys(pickers_1).forEach((key) => {
  pickers_1[key].addEventListener('input',updateGradientDisplay );
});

document.getElementById("LinearBtn1").addEventListener('click',updatelinearGradient1)
document.getElementById("LinearBtn2").addEventListener('click',updatelinearGradient2)
document.getElementById("RadialBtn1").addEventListener('click',updateradialGradient1)
// document.getElementById("RadialBtn2").addEventListener('click',updateradialGradient2)