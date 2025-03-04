const inputNamePlayer = document.getElementById("input-name-player");
const btnAddPlayer = document.getElementById("btn-add-player");
const playersList = document.getElementById("players-list");
const localStoragePlayers =
  JSON.parse(localStorage.getItem("ListPlayers")) || [];
const labelNamePlayer = document.getElementById("label-name-player");
const btnBuildTeams = document.getElementById("btn-build-teams");

const addPlayer = () => {
  btnAddPlayer.addEventListener("click", () => {
    console.log("click en agregar jugador");
    if (inputNamePlayer.value.length > 0) {
      localStoragePlayers.push(inputNamePlayer.value);
      localStorage.setItem("ListPlayers", JSON.stringify(localStoragePlayers));
      inputNamePlayer.value = "";
      showPlayers();
    }
  });
};

const showPlayers = () => {
  playersList.innerHTML = "";
  localStoragePlayers.forEach((jugador) => {
    const elemento = document.createElement("div");
    elemento.classList.add("player-div");
    elemento.innerHTML = `
          <p>${localStoragePlayers.indexOf(jugador) + 1} ${jugador}</p>
          <button class="btn-model-2 delete-player" data-player="${jugador}"><i class="fa-solid fa-trash"></i></button>   
          `;
    playersList.appendChild(elemento);
  });

  const deleteButtons = document.querySelectorAll(".delete-player");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const playerName = button.getAttribute("data-player");
      const index = localStoragePlayers.indexOf(playerName);
      if (index !== -1) {
        localStoragePlayers.splice(index, 1);
        localStorage.setItem(
          "ListPlayers",
          JSON.stringify(localStoragePlayers)
        );
        showPlayers();
      }
    });
  });
};

const builderTeam = () => {
  btnBuildTeams.addEventListener("click", () => {
    const modalTeam = document.createElement("div");
    modalTeam.classList.add("modal-team");
    document.body.appendChild(modalTeam);

    modalTeam.innerHTML = `
            <span id="btn-close-modal" class="btn-close-modal">
          <div class="loader-content">
          <span class="loader"></span>
          </div>
    `;

    setTimeout(() => {
      const teamMezclado = localStoragePlayers.sort(() => Math.random() - 0.5);
      const mitad = Math.floor(localStoragePlayers.length / 2);
      const team1 = teamMezclado.slice(0, mitad);
      const team2 = teamMezclado.slice(mitad);

      modalTeam.innerHTML = `
        <div>
        <span id="btn-close-modal" class="btn-close-modal">
        <i class="fa-solid fa-circle-xmark"></i>
        </span>
        <h3>Equipo 1</h3>
            <p>${team1[0]}</p>
            <p>${team1[1]}</p>
            <p>${team1[2]}</p>
            <p>${team1[3]}</p>
            <p>${team1[4]}</p>
            <p>${team1[5]}</p>
            <p>${team1[6]}</p>
            <p>${team1[7]}</p>           
        </div>
        <div>
        <h3>Equipo 2</h3>
            <p>${team2[0]}</p>
            <p>${team2[1]}</p>
            <p>${team2[2]}</p>
            <p>${team2[3]}</p>
            <p>${team2[4]}</p>
            <p>${team2[5]}</p>
            <p>${team2[6]}</p>
            <p>${team2[7]}</p>
        </div>

        <button onclick="builderTeam">Rearmar</button>
    `;

      document
        .getElementById("btn-close-modal")
        .addEventListener("click", () => {
          modalTeam.remove();
        });
    }, 2000);
  });
};

const init = () => {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Aplicación inicializada");
    showPlayers();
    addPlayer();
    builderTeam();
  });
};

init();
