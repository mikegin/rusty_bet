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

const updateBets = () => {
  console.log("updating bets...")
  const bets = document.getElementById("bets");
  const betMatches = document.getElementsByClassName('bets-match');

  for(let i = 0; i < betMatches.length; i++) {
    const betMatch = betMatches.item(i);
    console.log("betMatch", betMatch)
    console.log("betMatch.id", betMatch.id)
    players.forEach((player) => {
      console.log("player", player)
      console.log("player.bets && player.bets[betMatch.id]", player.bets && player.bets[betMatch.id])
      if (player.bets && player.bets[betMatch.id]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} - ${player.bets[betMatch.id]}`;
        betMatch.appendChild(li);
      }
    });
  }

  console.log("players", players)
  console.log("betMatches", betMatches)
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


  // //add matches to bets selection
  const bets = document.getElementById("bets");
  const h4 = document.createElement("h4");
  h4.textContent = `Match ${index + 1}`;
  const p3 = document.createElement("p");
  p3.textContent = match.name;
  const p4 = document.createElement("p");
  p4.textContent = `Date: ${match.date}`;
  const p5 = document.createElement("p");
  p5.textContent = `Bets: `;
  const _li = document.createElement("li");
  _li.id = `bets-match-${match.id}`;
  _li.classList.add('bets-match');
  _li.appendChild(h4);
  _li.appendChild(p3);
  _li.appendChild(p4);
  _li.appendChild(p5);
  bets.appendChild(_li);


});

bettingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log("placed bet!>>")

  const playerName = document.getElementById("player-select").value;
  const player = players.find((player) => player.name === playerName);
  if (!player) {
    return
  }

  console.log("player", player)

  const matchName = document.getElementById("match-select").value;
  const match = matches.find((match) => match.name === matchName);
  if (!match) {
    return
  }

  console.log("match", match)

  if (player.bets && player.bets[match.id]) { //don't allow rebetting
    return
  }

  const teamName = document.getElementById("team-select").value;
  const team = match.teams.find((team) => team === teamName);
  console.log("match.teams")
  console.log("teamName", teamName)
  if (!team) {
    return
  }

  console.log('team', team)

  if (!player.bets) {
    player.bets = {}
    player.bets[match.id] = team;
  }

  updateBets()
  
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