// get els
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');
let init = true;
// build fnx
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateBtn() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;

  if (init) {
    ranges.forEach((range) => {
      this[range.name] = range.value;
    });
    init = false;
  }
}

function skip() {
  // data
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function handleRangeUpdate() {
  video[this.name] = parseFloat(this.value);
}

function scrubber(e) {
  // e.offsetx ... how far in x of the element you clicked

  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}
// ev listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);
// progress can be used to show buffer
// timeupdate for acc slider
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((btn) => btn.addEventListener('click', skip));
ranges.forEach((range) => {
  range.addEventListener('input', handleRangeUpdate);
});
// scrubber
let mouseDown = false;
progress.addEventListener('click', (e) => scrubber(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));
progress.addEventListener('mousemove', (e) => mouseDown && scrubber(e));

// full
let fullscreened = false;
fullscreen.addEventListener('click', (e) => {
  if (!fullscreened) {
    player.requestFullscreen().then((done) => (fullscreened = true));
  } else {
    document.exitFullscreen(player).then((done) => (fullscreened = false));
  }
});
