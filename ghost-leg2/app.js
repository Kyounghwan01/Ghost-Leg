const countCon = document.querySelector(".count-con");
const minusBtn = document.querySelector(".minus-btn");
const plueBtn = document.querySelector(".plus-btn");
const ladderCount = document.querySelector(".ladder-count");
const startBtn = document.querySelector(".start-btn");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const gap = 100;
const drawCon = document.querySelector(".draw-con");
const topCon = drawCon.querySelector(".top-con");
const botCon = drawCon.querySelector(".bot-con");
const nextCon = drawCon.querySelector(".next-btn");
const resultBtn = drawCon.querySelector(".result-btn");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let count = 2;
let users;
let y = 10;
let isReady = false;
let yArray = [[], [], [], [], [], [], [], [], [], []];

ladderCount.textContent = count;

minusBtn.addEventListener("click", function() {
  if (count > 2) count--;
  else alert("최소 2개 이상 가능");
  ladderCount.textContent = count;
});

plueBtn.addEventListener("click", function() {
  if (count < 10) count++;
  else alert("최대 10개 까지 가능");
  ladderCount.textContent = count;
});

startBtn.addEventListener("click", function() {
  let dis = document.querySelector(".con-dis");
  dis.classList.remove("con-dis");
  countCon.classList.add("con-dis");
  startPoint = (canvasWidth - (count - 1) * gap) / 2;
  for (let i = 0; i < count; i++) {
    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.classList.add("text-top");
    topCon.appendChild(userInput);

    const caseInput = document.createElement("input");
    caseInput.setAttribute("type", "text");
    caseInput.classList.add("text-bot");
    botCon.appendChild(caseInput);

    ctx.beginPath();
    ctx.moveTo(startPoint + gap * i, 0);
    ctx.lineTo(startPoint + gap * i, canvasHeight);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "grey";
    ctx.stroke();
    ctx.closePath();
  }
  users = document.querySelectorAll(".text-top");
  cases = document.querySelectorAll(".text-bot");
});

nextCon.addEventListener("click", function() {
  //   for (let i = 0; i < users.length; i++) {
  //     if (users[i].value === "" || cases[i].value === "") {
  //       alert("빈칸을 기입해주세요");
  //       return;
  //     }
  //   }
  nextCon.classList.add("con-dis");
  let dis = document.querySelectorAll(".con-dis");
  dis[2].classList.remove("con-dis");
  //정보날리기
  leg();
  //   console.log(users[0].value);
});

resultBtn.addEventListener("click", function() {
  if (isReady) {
    //foreach 써서 각 텍스트에 합당한 박스를 연결한다. 
  }
});

function leg() {
  y += 10;
  for (let i = 0; i < count - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(startPoint + gap * i, y);
    if (Math.random(0, 1) * 100 > 80) {
      ctx.lineTo(startPoint + gap * i + 100, y);
      i++;
    }
    ctx.stroke();
  }
  line = requestAnimationFrame(leg);
  if (y > canvasHeight - 30) {
    isReady = true;
    ctx.closePath();
    cancelAnimationFrame(line);
  }
}
