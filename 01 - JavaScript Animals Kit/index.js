function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return;

  clearTimeout(audio.stopTimeout);

  audio.currentTime = 0;
  audio.play();

  key.classList.add("playing");

  audio.stopTimeout = setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 1000);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing"); // this is the key, try console.log(this)
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);

// const play = (element_id) => {
//   const ele = document.getElementById(element_id);
//   ele.play();
// };
