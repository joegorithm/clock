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
    document.title = currentDate.getHours().toString() + ":" + currentDate.getMinutes().toString().padStart(2, "0") + ":" + currentDate.getSeconds().toString().padStart(2, "0") + " • Clock"; // might use "⏐" in place of dot
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



// Preferences ----------------------

const openPreferencesButton = document.querySelector("[data-open-preferences]");
const preferencesModal = document.querySelector("[data-preferences-modal]");
const closePreferencesButton = document.querySelector("[data-close-preferences]");

// const modal = document.querySelector(".modal");
// const modalPosition = 50;
// function openModal() {
//     modalPosition+=50;
//     modal.style.setProperty("--modal-position", `${modalPosition}px`);
// }

openPreferencesButton.addEventListener("click", function() {
    preferencesModal.showModal();
    // openModal();
});

closePreferencesButton.addEventListener("click", function() {
    preferencesModal.close();
});

preferencesModal.addEventListener("click", e => {
    const modalDimensions = preferencesModal.getBoundingClientRect()
    if (
      e.clientX < modalDimensions.left ||
      e.clientX > modalDimensions.right ||
      e.clientY < modalDimensions.top ||
      e.clientY > modalDimensions.bottom
    ) {
      preferencesModal.close()
    }
  })
