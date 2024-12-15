// Clock ----------------------------

setInterval(setClock, 16);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const secondEndHand = document.querySelector("[data-second-end-hand]");

function setClock() {
    const currentDate = new Date();
    const secondsRatio = (currentDate.getSeconds() + currentDate.getMilliseconds()/1000) / 60;
    const minutesRatio = (currentDate.getMinutes() + secondsRatio) / 60;
    const hoursRatio = (currentDate.getHours() + minutesRatio) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
    setRotation(secondEndHand, secondsRatio);

    // Set title of webpage to current time
    document.title = currentDate.getHours().toString() + ":" + currentDate.getMinutes().toString().padStart(2, "0") + ":" + currentDate.getSeconds().toString().padStart(2, "0") + " | Clock | JH.codes";
}

function setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();



// Tick Marks -----------------------

const clock = document.querySelector(".clock");

for (let i = 0; i < 60; i++) {
  const tick = document.createElement("div");
  tick.classList.add("tick");
  tick.style.setProperty("--i", i);
  clock.appendChild(tick);
}



const preferencesButton = document.getElementById("preferences-button");
const preferencesModal = document.getElementById("preferences-modal");
const closePreferencesButton = document.getElementById("close-preferences-button");
const preferencesSymbol = document.getElementById("preferences-symbol");
const exitSymbol = document.getElementById("exit-symbol");
const tooltipText = document.querySelector(".tooltiptext");
const tooltip = document.querySelector(".tooltip");

preferencesButton.addEventListener("click", () => {
  preferencesModal.classList.toggle("active"); // Opens the modal
  preferencesSymbol.classList.toggle("active");
  exitSymbol.classList.toggle("active");
  tooltipText?.classList.toggle("active");
  tooltip?.classList.toggle("no-hover");
});

// Closes the modal when clicking outside of it
document.addEventListener("click", (e) => {
  const modalDimensions = preferencesModal.getBoundingClientRect();
  if (
    !(
      e.clientX >= modalDimensions.left &&
      e.clientX <= modalDimensions.right &&
      e.clientY >= modalDimensions.top &&
      e.clientY <= modalDimensions.bottom
    )
  ) {
    if (preferencesModal.classList.contains("active")) {
      preferencesModal.classList.remove("active");
      preferencesSymbol.classList.remove("active");
      exitSymbol.classList.remove("active");
      tooltipText?.classList.remove("active");
      tooltip?.classList.remove("no-hover");
    }
  }
});

// Prevent clicks inside the modal from closing it
preferencesModal.addEventListener("click", (e) => {
  e.stopPropagation();
});
