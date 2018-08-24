const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "❚❚";
  toggle.textContent = icon;
}

function skip() {
  const secondsToSkip = parseInt(this.dataset.skip, 10);
  const newTime = video.currentTime + secondsToSkip;
  video.currentTime = Math.min(video.duration, Math.max(0, newTime));
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

let mouseDown = false;
function handleProgressBarUpdate(e) {
  const ratio = e.offsetX / progress.offsetWidth;
  video.currentTime = ratio * video.duration;
}

progressBar.style.flexBasis = '0%';

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener("click", skip));
ranges.forEach(range => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});
progress.addEventListener('mousedown', () => {mouseDown = true;});
progress.addEventListener('mouseup', () => {mouseDown = false;});
progress.addEventListener('click', handleProgressBarUpdate);
progress.addEventListener('mousemove', e => mouseDown && handleProgressBarUpdate(e));
