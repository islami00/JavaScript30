// smarter approach.
// use the dom, not the element array
const boxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let previouslySelected;

function handleCheck(e) {
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    boxes.forEach((checkbox) => {
      if (checkbox === this || checkbox === previouslySelected) {
        // no need to worry about range, our range setter is inBetween, which we are flipping after defaulting it to false
        return (inBetween = !inBetween);
        //  Its all about memory. On each click, our init is false.
        // then we traverse and flip each time this condition is satisfied. Amazing
        // finally: do the thing
      }

      //   This will run for all boxes after the above has executed
      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }
  previouslySelected = this;
}
boxes.forEach((checkbox) => checkbox.addEventListener('click', handleCheck));
