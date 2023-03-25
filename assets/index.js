let matches = [{
  id: 1,
  name: "Team A vs Team B",
  teams: ["Team A", "Team B"],
  date: "2020-01-01T00:00:00.000Z",
}, {
  id: 2,
  name: "Team C vs Team D",
  teams: ["Team C", "Team D"],
  date: "2021-01-01T00:00:00.000Z",
}];
const players = [];

const playerForm = document.getElementById("player-form");
const bettingForm = document.getElementById('betting-form');
const pointDisplay = document.getElementById('points');
const playerList = document.getElementById("player-list");
const matchesList = document.getElementById("matches-list");

console.log("document", document)
console.log("playerForm", playerForm)
console.log("bettingForm", bettingForm)

let point = 0;

const addTeamSelect = (matchName) => {
  const bettingTeamSelect = document.getElementById("team-select");
    bettingTeamSelect.innerHTML = "";
    const match = matches.find((match) => match.name === matchName);
    match.teams.forEach((team) => {
      const option = document.createElement("option");
      option.textContent = team;
      option.value = team;
      bettingTeamSelect.appendChild(option);
    });
}

matches.forEach((match, index) => {
  //show matches
  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  h3.textContent = `Match ${index + 1}`;
  const p1 = document.createElement("p");
  p1.textContent = match.name;
  const p2 = document.createElement("p");
  p2.textContent = `Date: ${match.date}`;
  li.appendChild(h3);
  li.appendChild(p1);
  li.appendChild(p2);
  matchesList.appendChild(li);

  //add matches to betting selection
  const option = document.createElement("option");
  option.textContent = match.name;
  option.value = match.name;
  const bettingMatchSelect = document.getElementById("match-select");
  bettingMatchSelect.appendChild(option);
  
  if(index === 0) {
    addTeamSelect(match.name)
  }

  bettingMatchSelect.addEventListener('change', (event) => {
    addTeamSelect(event.target.value)
  })

});

bettingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const playerName = playerList.value;
  const player = players.find((player) => player.name === playerName);
  
});

// console.log(getEventListeners(form));

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log("here>>>")
  const input = document.getElementById("player-name");
  const name = input.value.trim();

  if (name !== "" && !players.find((player) => player.name === name)) {
    players.push({ name, points: 0 });
    input.value = "";
    const li = document.createElement("li");
    li.textContent = name;
    playerList.appendChild(li);
  }

  updatePlayerSelect();
})

updatePlayerSelect = () => {
  const playerSelect = document.getElementById("player-select");
  playerSelect.innerHTML = "";
  players.forEach((player) => {
    const option = document.createElement("option");
    option.textContent = player.name;
    option.value = player.name;
    playerSelect.appendChild(option);
  });
}