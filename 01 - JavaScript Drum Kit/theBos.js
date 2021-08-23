function toggleNPlay(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //The power of css selectors
  if (!audio) {
    return;
  } //stop function if no audio
  //for rengoku, rewwind
  audio.currentTime = 0; //rewind to start to avoid case of non-repeating plays
  audio.play();
  key.classList.add("playing");
}
window.addEventListener("keydown", toggleNPlay); //Tyding up the add event

//Now to deal with the flicker
const keys = document.querySelectorAll(".key");
function removeTransition(e) {
  //The transitioned event fires for all as we are transitioning every property

  if (e.propertyName !== "transform") {
    return;
  } //Do nothing
  //Oh yeah, so from here on out we only working with e.propertyname is transform.
  //Now, we use this
  //Yay, functions!
  this.classList.remove("playing");
  //They all resolve eventually, no glitch
}
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
