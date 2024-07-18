let axesThreshold = 0.8;
let selectionIndex = null;

window.addEventListener("gamepadconnected", (event) => {
  console.log("Gamepad connected:", event.gamepad);
  monitorGamepad(event.gamepad.index);
});

function monitorGamepad(index) {
  const axesThreshold = 0.5; // Adjust this threshold as needed

  let previousAxesState = {
    0: 0,
    1: 0,
  };

  function checkGamepad() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[index];

    if (gamepad) {
      // Check axis 0 (left-right movement)
      if (
        gamepad.axes[0] <= -axesThreshold &&
        previousAxesState[0] > -axesThreshold
      ) {
        moveLeft();
      } else if (
        gamepad.axes[0] >= axesThreshold &&
        previousAxesState[0] < axesThreshold
      ) {
        moveRight();
      }
      previousAxesState[0] = gamepad.axes[0];

      // Check axis 1 (up-down movement)
      if (
        gamepad.axes[1] <= -axesThreshold &&
        previousAxesState[1] > -axesThreshold
      ) {
        moveUp();
      } else if (
        gamepad.axes[1] >= axesThreshold &&
        previousAxesState[1] < axesThreshold
      ) {
        moveDown();
      }
      previousAxesState[1] = gamepad.axes[1];
    }

    refreshHighlightedSelection();

    requestAnimationFrame(checkGamepad);
  }

  checkGamepad();
}

function calculateHorizontalCardsCapacity() {
  return Math.trunc(mainContainer.clientWidth / (150 + 15));
}

function refreshHighlightedSelection() {
  //document.getElementById("header").innerText =
  //  calculateHorizontalCardsCapacity();
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
    selectionIndex = gamesAmount - 1;
  } else if (selectionIndex >= gamesAmount) {
    selectionIndex = 0;
  }
}

function moveLeft() {
  if (startSelection()) {
    return;
  }
  selectionIndex -= 1;
  keepSelectionInBounds();
}
function moveRight() {
  if (startSelection()) {
    return;
  }
  selectionIndex += 1;
  keepSelectionInBounds();
}
function moveUp() {
  if (startSelection()) {
    return;
  }
  selectionIndex -= calculateHorizontalCardsCapacity();
  keepSelectionInBounds();
}
function moveDown() {
  if (startSelection()) {
    return;
  }
  selectionIndex += calculateHorizontalCardsCapacity();
  keepSelectionInBounds();
}
