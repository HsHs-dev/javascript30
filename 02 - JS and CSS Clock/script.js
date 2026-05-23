// second = 6deg
// minute = 6deg
// hour = 30deg
// after every seconds, move second 6deg, minutes seconds/60, hour minute/60

const secs = document.getElementsByClassName("second-hand")[0];
const mins = document.getElementsByClassName("min-hand")[0];
const hrs = document.getElementsByClassName("hour-hand")[0];

const secs_degrees = 6;
const mins_degrees = 6;
const hours_degrees = 30;
function setTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  let secs_rotate = seconds * secs_degrees;

  const minutes = now.getMinutes();
  let mins_rotate = minutes * mins_degrees + seconds * 0.1;

  const hours = now.getHours();
  let hours_rotate = (hours % 12) * 30 + minutes * 0.5 + seconds * (0.5 / 60);

  secs.style.transform = `rotate(${secs_rotate}deg)`;
  mins.style.transform = `rotate(${mins_rotate}deg)`;
  hrs.style.transform = `rotate(${hours_rotate}deg)`;
}

const timerId = setInterval(setTime, 1000);
