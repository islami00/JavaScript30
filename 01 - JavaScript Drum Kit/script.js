window.addEventListener("keydown", (event) => {
  const keys = document.getElementsByClassName("key");
  let audio = document.querySelectorAll("audio");
  console.log(audio);
  const neededKey = Array.from(keys).find((element, index) => {
   const keyCharacter = element.childNodes[1].innerText.toLowerCase();
    return event.key.toLowerCase() === keyCharacter;
  });

  if (neededKey) {
    let keyCode = neededKey.attributes["data-key"].value;
    const neededAudio = Array.from(audio).find((element, index) => {
      const audioKey = element.dataset.key;
      return keyCode === audioKey;
    });
    neededAudio.play();
    neededKey.classList.toggle("playing");
    setTimeout(() => {
      neededKey.classList.toggle("playing");
    }, 70);
  }
});
