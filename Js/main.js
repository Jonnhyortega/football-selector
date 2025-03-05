const inputNamePlayer = document.getElementById("input-name-player");
const btnAddPlayer = document.getElementById("btn-add-player");
const playersList = document.getElementById("players-list");
const localStoragePlayers =
  JSON.parse(localStorage.getItem("ListPlayers")) || [];
const labelNamePlayer = document.getElementById("label-name-player");
const btnBuildTeams = document.getElementById("btn-build-teams");
const errorContent = document.getElementById("error-input");
const addPlayer = () => {
  btnAddPlayer.addEventListener("click", () => {
    const regex = /\d/;

    if (!regex.test(inputNamePlayer.value)) {
      if (
        inputNamePlayer.value.length > 0 &&
        inputNamePlayer.value.length <= 8
      ) {
        localStoragePlayers.push(inputNamePlayer.value);
        localStorage.setItem(
          "ListPlayers",
          JSON.stringify(localStoragePlayers)
        );
        inputNamePlayer.value = "";
        showPlayers();
      } else {
        errorContent.textContent = "Maximo 8 letras porfavor";
        setTimeout(() => {
          inputNamePlayer.value = "";
          errorContent.textContent = "";
        }, 1500);
      }
    } else {
      errorContent.textContent = "ingrese solo letras";
      setTimeout(() => {
        inputNamePlayer.value = "";
        errorContent.textContent = "";
      }, 1500);
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
    if (localStoragePlayers.length >= 4) {
      const modalTeam = document.createElement("div");
      modalTeam.classList.add("modal-team");
      modalTeam.classList.add("animate__animated");
      modalTeam.classList.add("animate__rotateIn");
      document.body.appendChild(modalTeam);

      modalTeam.innerHTML = `
      <span id="btn-close-modal" class="btn-close-modal">
        <div class="loader-content">
          <span class="loader"></span>
        </div>
      </span>
    `;

      setTimeout(() => {
        const teamMezclado = localStoragePlayers.sort(
          () => Math.random() - 0.5
        );
        const mitad = Math.floor(localStoragePlayers.length / 2);
        const team1 = teamMezclado.slice(0, mitad);
        const team2 = teamMezclado.slice(mitad);

        modalTeam.innerHTML = `       
        <i id="btn-close-modal" class="fa-solid fa-circle-xmark btn-close-modal"></i>

        <div id="content-team-builder1" class="content-team-builder">
          <h3>Equipo 1</h3>
        </div>

        <div id="content-team-builder2" class="content-team-builder">
          <h3>Equipo 2</h3>
        </div>

      `;

        const team1Content = document.getElementById("content-team-builder1");
        team1.forEach((player) => {
          const playerP = document.createElement("p");
          playerP.classList.add("animate__animated");
          playerP.classList.add("animate__lightSpeedInRight");
          playerP.innerHTML = `${
            Number(team1.indexOf(player)) + 1
          } ${player} <i class="fa-solid fa-user"></i>`;
          team1Content.appendChild(playerP);
        });

        const team2Content = document.getElementById("content-team-builder2");
        team2.forEach((player) => {
          const playerP = document.createElement("p");
          playerP.classList.add("animate__animated");
          playerP.classList.add("animate__lightSpeedInRight");
          playerP.innerHTML = `${
            Number(team2.indexOf(player)) + 1
          } ${player} <i class="fa-solid fa-user"></i>`;
          team2Content.appendChild(playerP);
        });

        document
          .getElementById("btn-close-modal")
          .addEventListener("click", () => {
            modalTeam.remove();
          });
      }, 1500);
    } else {
      errorContent.textContent =
        "El numero de participantes debe ser mayor o igual a 4";
      setTimeout(() => {
        errorContent.textContent = "";
      }, 2000);
    }
  });
};

const init = () => {
  document.addEventListener("DOMContentLoaded", () => {
    showPlayers();
    addPlayer();
    builderTeam();
  });
};

init();
