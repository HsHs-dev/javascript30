/* Get our elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

/* Build Functionality */
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "▐▐";
  toggle.textContent = icon;
}

function skip() {
  const amount = parseFloat(this.dataset.skip);
  video.currentTime = video.currentTime + amount;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  let percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;

  // update the progress bar while dragging the mouse
  const percentage = (e.offsetX / progress.offsetWidth) * 100;
  progressBar.style.flexBasis = percentage;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
}

/* Add Event Listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((slider) =>
  slider.addEventListener("change", handleRangeUpdate),
);

ranges.forEach((slider) =>
  slider.addEventListener("mousemove", handleRangeUpdate),
);

let isDragging = false;
progress.addEventListener("mousedown", () => (isDragging = true));
progress.addEventListener("mouseup", () => (isDragging = false));

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => isDragging && scrub(e));

fullscreen.addEventListener("click", () => {
  toggleFullscreen();
});
