let games = [];
let mainContainer = document.getElementById("main-container");

eel.get_games()(function (value) {
  games = value;
  let index = 0;
  for (game of games) {
    let card = document.createElement("div");
    let text = document.createElement("p");
    card.classList.add("game-card");
    console.log(index);
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
    mainContainer.appendChild(card);
    index += 1;
  }
});
