const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let mainInterval;

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.setAttribute("disabled", "");

btnStart.addEventListener("click", () => {
    mainInterval = setInterval(() => document.body.style.backgroundColor = getRandomHexColor(), 1000);
    btnStart.setAttribute("disabled", "");
    btnStop.removeAttribute("disabled");
})

btnStop.addEventListener("click", () => {
    clearInterval(mainInterval);
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "");
})



