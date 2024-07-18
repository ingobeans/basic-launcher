let gamesAmount = 0;
let mainContainer = document.getElementById("main-container");

eel.get_games()(function (games) {
  console.log(games);
  gamesAmount = games.length;
  for (game of games) {
    let card = document.createElement("div");
    let text = document.createElement("p");
    card.classList.add("game-card");
    if (game["illustration"] !== undefined) {
      let img = document.createElement("img");
      img.src = game["illustration"];
      card.appendChild(img);
    }
    text.innerText = game["name"];
    card.appendChild(text);
    mainContainer.appendChild(card);
  }
});
