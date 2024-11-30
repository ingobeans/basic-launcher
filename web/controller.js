let axesThreshold = 0.8;
let selectionIndex = null;
let windowHasFocus = true;

window.addEventListener("blur", () => {
  windowHasFocus = false;
});

window.addEventListener("focus", () => {
  windowHasFocus = true;
});

window.addEventListener("gamepadconnected", (event) => {
  console.log("Gamepad connected:", event.gamepad);
  monitorGamepad(event.gamepad.index);
});

window.addEventListener("mousedown", function (event) {
  selectionIndex = null;
});

window.addEventListener("keydown", handleKeypress);

function handleKeypress(event) {
  switch (event.key) {
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "Enter":
      selectGame(selectionIndex);
      break;

    default:
      break;
  }
}

function handleAxesMovement(axes, previousAxesState) {
  // left/right
  if (axes[0] <= -axesThreshold && previousAxesState[0] > -axesThreshold) {
    moveLeft();
  } else if (axes[0] >= axesThreshold && previousAxesState[0] < axesThreshold) {
    moveRight();
  }
  previousAxesState[0] = axes[0];

  // up/down
  if (axes[1] <= -axesThreshold && previousAxesState[1] > -axesThreshold) {
    moveUp();
  } else if (axes[1] >= axesThreshold && previousAxesState[1] < axesThreshold) {
    moveDown();
  }
  previousAxesState[1] = axes[1];
}

function clickGame(gameElement) {
  let index = 0;
  for (gameCard of document.getElementsByClassName("game-card")) {
    if (gameCard == gameElement) {
      break;
    }
    index += 1;
  }
  selectGame(index);
}

function handleButtons(buttons, previousButtonStates) {
  buttons.forEach((button, i) => {
    // only care about the button if it is mapped to an action
    if (button.pressed === true && previousButtonStates[i] !== true) {
      selectGame(selectionIndex);
    }
    previousButtonStates[i] = button.pressed;
  });
}

function selectGame(gameIndex) {
  if (!windowHasFocus) {
    return;
  }
  eel.run_game(games[gameIndex]["id"]);
  console.log("launch game ", gameIndex);
}

function monitorGamepad(index) {
  let previousButtonStates = {};
  let previousAxesState = {
    0: 0,
    1: 0,
  };

  function checkGamepad() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[index];

    if (gamepad) {
      handleButtons(gamepad.buttons, previousButtonStates);
      handleAxesMovement(gamepad.axes, previousAxesState);
    }

    requestAnimationFrame(checkGamepad);
  }

  checkGamepad();
}

function renderSelectionUpdate() {
  refreshHighlightedSelection();

  requestAnimationFrame(renderSelectionUpdate);
}

renderSelectionUpdate();

function calculateHorizontalCardsCapacity() {
  return Math.trunc(
    libraryContainer.getBoundingClientRect().width / (150 + 15)
  );
}

function refreshHighlightedSelection() {
  let cards = document.getElementsByClassName("game-card");
  let index = 0;
  for (card of cards) {
    if (selectionIndex == index) {
      card.classList.add("highlight");
      if (!card.classList.contains("highlight")) {
      }
    } else {
      card.classList.remove("highlight");
      if (card.classList.contains("highlight")) {
      }
    }
    index += 1;
  }
}

function startSelection() {
  if (selectionIndex == null) {
    selectionIndex = 0;
    return true;
  }
  return false;
}

function keepSelectionInBounds() {
  if (selectionIndex < 0) {
    selectionIndex = games.length - 1;
  } else if (selectionIndex >= games.length) {
    selectionIndex = 0;
  }
}

function scrollGameIntoView() {
  let cards = document.getElementsByClassName("game-card");
  cards[selectionIndex].scrollIntoView({
    behavior: "smooth",
    block: "nearest", // make sure it scrolls only the amount needed
    inline: "nearest",
  });
}

function moveLeft() {
  if (!windowHasFocus) {
    return;
  }
  if (startSelection()) {
    return;
  }
  selectionIndex -= 1;
  keepSelectionInBounds();
  scrollGameIntoView();
}
function moveRight() {
  if (!windowHasFocus) {
    return;
  }
  if (startSelection()) {
    return;
  }
  selectionIndex += 1;
  keepSelectionInBounds();
  scrollGameIntoView();
}
function moveUp() {
  if (!windowHasFocus) {
    return;
  }
  if (startSelection()) {
    return;
  }
  selectionIndex -= calculateHorizontalCardsCapacity();

  // moving up / down shouldn't have the same wrap around behaviour as moving left / right
  // instead, it should, if under/overflown, move to the first/last game
  if (selectionIndex < 0) {
    selectionIndex = 0;
  }
  scrollGameIntoView();
}
function moveDown() {
  if (!windowHasFocus) {
    return;
  }
  if (startSelection()) {
    return;
  }
  selectionIndex += calculateHorizontalCardsCapacity();

  // moving up / down shouldn't have the same wrap around behaviour as moving left / right
  // instead, it should, if under/overflown, move to the first/last game
  if (selectionIndex >= games.length) {
    selectionIndex = games.length - 1;
  }
  scrollGameIntoView();
}
