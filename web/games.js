let games = [];
let libraryContainer = document.getElementById("library-container");

eel.get_games()(function (value) {
  games = value;
  let index = 0;
  for (game of games) {
    let card = document.createElement("div");
    let text = document.createElement("p");
    card.classList.add("game-card");

    card.onclick = function () {
      clickGame(this);
    };
    if (game["illustration"] !== undefined) {
      let img = document.createElement("img");
      img.src = game["illustration"];
      card.appendChild(img);
    }
    text.innerText = game["name"];
    card.appendChild(text);
    libraryContainer.appendChild(card);
    index += 1;
  }
});
