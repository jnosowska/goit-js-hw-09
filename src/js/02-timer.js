import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const timerDay= document.querySelector('[data-days]');
const timerHours= document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');


btnStart.setAttribute("disabled", "");

let actualDate;
let remaingTime = 0;
let mainInterval;

const addLeadingZero = (value) => value.toString().padStart(2, "0");

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      actualDate = new Date();
      
      if (selectedDates[0] < actualDate) {
        Notiflix.Notify.failure("Please choose a date in the future");
      } else {      
        if (mainInterval) {
          clearInterval(mainInterval);
          timerDay.innerHTML = addLeadingZero(0);
          timerHours.innerHTML = addLeadingZero(0);
          timerMinutes.innerHTML = addLeadingZero(0);
          timerSeconds.innerHTML = addLeadingZero(0);
        }     
        btnStart.removeAttribute("disabled");
        remaingTime = (selectedDates[0].getTime() - actualDate.getTime()); 
      }
  },
};

const countDownTime = (time) => { 
  
  mainInterval = setInterval(() => {
    
    if (time-1000 > 0) {
      time -= 1000; 
      let timerInner = convertMs(time);
      timerDay.innerHTML = addLeadingZero(timerInner.days);
      timerHours.innerHTML = addLeadingZero(timerInner.hours);
      timerMinutes.innerHTML = addLeadingZero(timerInner.minutes);
      timerSeconds.innerHTML = addLeadingZero(timerInner.seconds);
    } else {
      clearInterval(mainInterval);
    }
  },1000)  
}

const fp = flatpickr("#datetime-picker", options);

btnStart.addEventListener("click", () => {
  countDownTime(remaingTime);
  btnStart.setAttribute("disabled", "");
});


