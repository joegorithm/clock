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
}

function setRotation(element, rotationRatio) {
    element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();