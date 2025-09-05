import { generateshortUid } from "./shortid.js";
import { pickers_1, card, code, getStoredGradients, renderGradientList } from "../index.js";

export class updateGradient {
  constructor(type, count) {
    this.type = type;
    this.count = count;
  }

  generateStops() {
    let stops = [];
    if (this.count === 3) {
      stops.push(Math.floor(Math.random() * 33));
      stops.push(Math.floor(Math.random() * (67 - 33) + 33));
      stops.push(Math.floor(Math.random() * (100 - 67) + 67));
    } else {
      stops.push(0);
      let randomStop =  100;
      stops.push(randomStop);
    }
    return stops.sort((a, b) => a - b);
  }

  buildGradient() {
    let colors;
    switch (this.count) {
      case 2:
        colors = [pickers_1.start.value, pickers_1.end.value];
        break;
      case 3:
        colors = Object.values(pickers_1).map(c => c.value);
        break;
    }
    const stops = this.generateStops();
    const colorStops = colors.map((c, i) => `${c} ${stops[i]}%`).join(',');
    
    if (this.type === "linear") {
      const degree = Math.floor(Math.random() * 360);
      return `linear-gradient(${degree}deg, ${colorStops})`;
    } else {
      const shape = Math.random() < 0.5 ? "circle" : "ellipse at center";
      return `radial-gradient(${shape}, ${colorStops})`;
    }
  }

  randomBuildGradient() {
    let colors = [];
    const numColors = this.count;

    for (let i = 0; i < numColors; i++) {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      randomColor = randomColor.padStart(6, '0');
      colors.push(`#${randomColor}`);
    }
    
    const stops = this.generateStops();
    const colorStops = colors.map((c, i) => `${c} ${stops[i]}%`).join(',');
    
    if (this.type === "linear") {
      const degree = Math.floor(Math.random() * 360);
      return `linear-gradient(${degree}deg, ${colorStops})`;
    } else {
      const shape = Math.random() < 0.5 ? "circle" : "ellipse at center";
      return `radial-gradient(${shape}, ${colorStops})`;
    }
  }

  applyGradient(gradient) {
    card.style.background = gradient;
    code.innerText = gradient;
  }
}

export class SaveData {
  constructor(gradient, type) {
    this.gradient = gradient;
    this.type = type;
  }

  checkGradientAndSave() {
    const gradients = getStoredGradients();
    const new_gradient = {
      id: generateshortUid(),
      key: this.gradient,
      type: this.type,
      time: Date.now(),
    };

    const filtered_gradients = gradients.filter((grad) => grad.key !== new_gradient.key);
    const updated = [...filtered_gradients, new_gradient];
    localStorage.setItem("gradients", JSON.stringify(updated));
    renderGradientList(updated);
  }
}