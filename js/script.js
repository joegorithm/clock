// Clock ----------------------------
let secondHandMovement = localStorage.getItem('secondHandMovement') || "sweeping"; // Load from localStorage or default to sweeping
let clockInterval = setInterval(setClock, 16);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");
const secondEndHand = document.querySelector("[data-second-end-hand]");

function setClock() {
    const currentDate = new Date();
    let secondsRatio;
    if (secondHandMovement === "sweeping") {
      secondsRatio = (currentDate.getSeconds() + currentDate.getMilliseconds()/1000) / 60;
    } else if (secondHandMovement === "ticking") {
      secondsRatio = currentDate.getSeconds() / 60;
    }
    const minutesRatio = (currentDate.getMinutes() + secondsRatio) / 60;
    const hoursRatio = (currentDate.getHours() + minutesRatio) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
    setRotation(secondEndHand, secondsRatio);

    // Set title of webpage to current time
    document.title = currentDate.getHours().toString() + ":" + currentDate.getMinutes().toString().padStart(2, "0") + ":" + currentDate.getSeconds().toString().padStart(2, "0") + " | clock.jh.codes";
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



// Preferences Modal -----------------
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
  preferencesButton.classList.toggle("active");
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
      preferencesButton.classList.remove("active");
      tooltipText?.classList.remove("active");
      tooltip?.classList.remove("no-hover");
    }
  }
});

// Prevent clicks inside the modal from closing it
preferencesModal.addEventListener("click", (e) => {
  e.stopPropagation();
});



// Second hand visibility ----------------
const secondHandVisibilityCheckbox = document.getElementById("second-hand-visibility");
const completeSecondHand = document.querySelector(".second-hand-shadow");
// Initialize second hand visibility on page load
function initializeSecondHandVisibility() {
  const isVisible = localStorage.getItem("secondHandVisibility") !== "false"; // Default to true if not set
  secondHandVisibilityCheckbox.checked = isVisible;
  completeSecondHand.style.display = isVisible ? "block" : "none";
}
// Call initialization when page loads
initializeSecondHandVisibility();

secondHandVisibilityCheckbox.addEventListener("change", (e) => {
  const isVisible = e.target.checked;
  completeSecondHand.style.display = isVisible ? "block" : "none";
  // Save visibility preference
  localStorage.setItem("secondHandVisibility", isVisible);
  console.log(`Second hand visibility set to: ${isVisible}`);
});



// Second Hand Movement ----------------
const secondHandMovementRadios = document.querySelectorAll('input[name="second-hand-movement"]');

// Initialize second hand movement radio buttons on page load
function initializeSecondHandMovement() {
  const savedMovement = localStorage.getItem("secondHandMovement") || "sweeping";
  const movementRadio = document.getElementById(`second-hand-${savedMovement}`);
  if (movementRadio) {
    movementRadio.checked = true;
  }
}

// Call initialization when page loads
initializeSecondHandMovement();

secondHandMovementRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.checked) {
      secondHandMovement = e.target.value; // ✅ This is correct
      localStorage.setItem("secondHandMovement", e.target.value);
      // But you should also update the visibility localStorage
      localStorage.setItem("secondHandVisibility", true);
      initializeSecondHandVisibility(); // Ensure visibility is set correctly
    }
  });
});



// Theme Selection -------------------
const themes = ['light', 'dark', 'night', 'vintage'];

// Roman numerals mapping
const romanNumerals = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI',
  7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
};

// Function to update clock numbers based on theme
function updateClockNumbers(isVintageTheme) {
  const numbers = document.querySelectorAll('.numeral');
  numbers.forEach((numeral, index) => {
    const number = index + 1;
    numeral.textContent = isVintageTheme ? romanNumerals[number] : number;
  });
}

// Function to update background image based on theme
function updateBackgroundImage(isVintageTheme) {
  const clockElement = document.querySelector(".clock");
  if (isVintageTheme) {
    clockElement.style.backgroundImage = "url('image/oak-wood.jpg')";
    clockElement.style.backgroundSize = "cover";
    clockElement.style.backgroundPosition = "center";
  } else {
    clockElement.style.backgroundImage = "none";
  }
}

// Initialize theme on page load
function initializeTheme() {
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Set the theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update the radio button to match
  const themeRadio = document.getElementById(savedTheme);
  if (themeRadio) {
    themeRadio.checked = true;
  }

  // Update numbers and background for vintage theme
  const isVintageTheme = savedTheme === 'vintage';
  updateClockNumbers(isVintageTheme);
  updateBackgroundImage(isVintageTheme);
}

// Call initialization when page loads
initializeTheme();

themes.forEach(theme => {
  document.getElementById(theme).addEventListener('change', (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', theme);
      // Save theme preference
      localStorage.setItem('theme', theme);

      // Update numbers based on theme
      const isVintageTheme = theme === 'vintage';
      updateClockNumbers(isVintageTheme);
      updateBackgroundImage(isVintageTheme);
    }
  });
});