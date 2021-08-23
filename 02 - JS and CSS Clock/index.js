// TIming function

const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hrHand = document.querySelector(".hour-hand");
/**
 *
 *
 * @param {Date} dateOb
 * @return {{fnseconds : number,fnmins: number,fnhours:number}} {fnseconds,fnmins,fnhours}
 */
function getDate(dateOb) {
  let fnseconds = dateOb.getSeconds() !== 0 ? dateOb.getSeconds() : 60;
  let fnsecondsAngled = 90 + (fnseconds / 60) * 360;
  secondHand.style.transform = `rotate(${fnsecondsAngled}deg)`;

  let fnmins = dateOb.getMinutes();
  fnmins = fnmins !== 0 ? fnmins + fnseconds / 60 : 60;
  let fnminsAngled = 90 + (fnmins / 60) * 360;
  minHand.style.transform = `rotate(${fnminsAngled}deg)`;

  let fnhours = dateOb.getHours();
  fnhours = fnhours !== 0 ? (fnhours % 12) + fnmins / 60 : 12;
  let fnhoursAngled = 90 + (fnhours / 12) * 360;
  hrHand.style.transform = `rotate(${fnhoursAngled}deg)`;

  return {
    timed: { fnseconds, fnmins, fnhours },
    angled: { fnsecondsAngled, fnminsAngled, fnhoursAngled },
  };
}

setInterval(() => console.log({ timeNow: getDate(new Date()) }), 1000);
