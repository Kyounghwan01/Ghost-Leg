const stageOne = document.querySelector(".stage-one");
const num = document.querySelector("#sel-num-submit");
const ghostNum = document.querySelector("#sel-num");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const front = document.querySelector(".front");
const backgroundColor = ['green','blue','red','yellow','purple'];
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let y = 30;
let yArray = [[], [], [], []];
let isReady = false;
let state;
let realState;
let ex;
let ex1 = 50;
let ex2 = 50 + canvasWidth / 5;
let ex3 = 50 + (canvasWidth / 5) * 2;
let ex4 = 50 + (canvasWidth / 5) * 3;
let ex5 = 50 + (canvasWidth / 5) * 4;

num.addEventListener("click", function() {
  stageOne.classList.add("dis-none");
  for (let i = 0; i < ghostNum.value; i++) {
    ctx.beginPath();
    ctx.moveTo(50 + (canvasWidth / 5) * i, 0);
    ctx.lineTo(50 + (canvasWidth / 5) * i, canvasHeight);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
    let box = document.createElement("div");
    box.setAttribute("type", "text");
    box.classList.add("text");
    box.style.backgroundColor = backgroundColor[i];
    box.dataset.id = i + 1;
    front.appendChild(box);
    ctx.fillStyle = "grey";
    ctx.fillRect(50 + (canvasWidth / 5) * i - 45, 655, 90, 45);
  }
  leg();
});
function leg() {
  y += 10;
  for (let i = 0; i < ghostNum.value - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(50 + (canvasWidth / 5) * i, y);
    if (Math.random(0, 1) * 100 > 90) {
      ctx.lineTo(50 + (canvasWidth / 5) * i + canvasWidth / 5, y);
      if (i === 0) {
        yArray[[0]].push(y);
      } else if (i === 1) {
        yArray[[1]].push(y);
      } else if (i === 2) {
        yArray[[2]].push(y);
      } else {
        yArray[[3]].push(y);
      }
      i++;
    }
    ctx.stroke();
  }
  line = requestAnimationFrame(leg);
  if (y > canvasHeight - 80) {
    isReady = true;
    ctx.closePath();
    cancelAnimationFrame(line);
  }
}

front.addEventListener("click", function(e) {
  if (isReady) {
    isReady = false;
    state = Number(e.target.dataset.id);
    realState = Number(e.target.dataset.id);
    y = 0;
    ctx.beginPath();
    if (state === 1) {
      ctx.moveTo(ex1, y);
      ex = ex1;
      ctx.strokeStyle = "green";
      goPath();
    } else if (state === 2) {
      ctx.moveTo(ex2, y);
      ex = ex2;
      ctx.strokeStyle = "blue";
      goPath();
    } else if (state === 3) {
      ctx.moveTo(ex3, y);
      ex = ex3;
      ctx.strokeStyle = "red";
      goPath();
    } else if (state === 4) {
      ctx.moveTo(ex4, y);
      ex = ex4;
      ctx.strokeStyle = "yellow";
      goPath();
    } else if (state === 5) {
      ctx.moveTo(ex5, y);
      ex = ex5;
      ctx.strokeStyle = "purple";
      goPath();
    } else {
      isReady = true;
    }
  }
});

function goPath() {
  for (let i = 0; i < 30; i++) {
    if (state === 1 && y === yArray[0][i]) {
      ex = 50 + canvasWidth / 5;
      state = 2;
    } else if (state === 2 && y === yArray[0][i]) {
      ex = 50;
      state = 1;
    } else if (state === 2 && y === yArray[1][i]) {
      ex = 50 + (canvasWidth / 5) * 2;
      state = 3;
    } else if (state === 3 && y === yArray[1][i]) {
      ex = 50 + canvasWidth / 5;
      state = 2;
    } else if (state === 3 && y === yArray[2][i]) {
      ex = 50 + (canvasWidth / 5) * 3;
      state = 4;
    } else if (state === 4 && y === yArray[2][i]) {
      ex = 50 + (canvasWidth / 5) * 2;
      state = 3;
    } else if (state === 4 && y === yArray[3][i]) {
      ex = 50 + (canvasWidth / 5) * 4;
      state = 5;
    } else if (state === 5 && y === yArray[3][i]) {
      ex = 50 + (canvasWidth / 5) * 3;
      state = 4;
    }
  }
  ctx.lineTo(ex, y + 0.2);
  ctx.stroke();
  y += 1;
  fun = setInterval(goPath,100);
  if (y === 655) {
    clearInterval(fun);
    if (realState === 1) {
      ctx.fillStyle = "green";
      ctx.fillRect(ex - 45, 655, 90, 45);
    } else if (realState === 2) {
      ctx.fillStyle = "blue";
      ctx.fillRect(ex - 45, 655, 90, 45);
    } else if (realState === 3) {
      ctx.fillStyle = "red";
      ctx.fillRect(ex - 45, 655, 90, 45);
    } else if (realState === 4) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(ex - 45, 655, 90, 45);
    } else if (realState === 5) {
      ctx.fillStyle = "purple";
      ctx.fillRect(ex - 45, 655, 90, 45);
    }
    isReady = true;
    return;
  }
}
