// qselector won't take another 'this' value, so what if i'm selecting from another?? sha. ... attr: https://stackoverflow.com/a/12637169/16071410
// my selector was initially .item input, but I see why he did this. To avoid chaining down
const boxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let previouslySelected = { prev: null, index: 0 };
const arrBoxes = Array.from(boxes);
function handleCheckClick(e, i) {
  // IE6-8 with e.srcElement
  // Also, click fire3s with keyboard. Amazing
  let { prev, index: prevIndex } = previouslySelected;
  // this checks the interval (previous,currentlyClicked)
  if (prev && prev.checked && e.shiftKey) {
    const start = prevIndex > i ? i : prevIndex;
    const end = prevIndex > i ? prevIndex : i;
    arrBoxes.slice(start + 1, end).forEach((filteredBox) => {
      filteredBox.checked = true;
    });
  }
  prev = e.target || e.srcElement;
  prevIndex = i;
  previouslySelected = { prev, index: prevIndex };
}
for (let i = 0; i < arrBoxes.length; i += 1) {
  const box = arrBoxes[i];

  box.addEventListener('click', (e) => handleCheckClick(e, i));
}
