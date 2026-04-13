let pontuacaoPlayer = localStorage.getItem("pontuacaoPlayer");
let pontuacaoComputador = localStorage.getItem("pontuacaoComputador");
let empates = localStorage.getItem("empates");

document.querySelectorAll(".btn-selection").forEach((button) => {
  button.addEventListener("click", () => {
    const jogadaComputador = Math.floor(Math.random() * 3) + 1;
    const jogadaJogador = parseInt(button.id);
    let resultado;

    if (jogadaJogador === jogadaComputador) {
      resultado = 1;
    } else if (
      (jogadaJogador === 1 && jogadaComputador === 3) ||
      (jogadaJogador === 2 && jogadaComputador === 1) ||
      (jogadaJogador === 3 && jogadaComputador === 2)
    ) {
      resultado = 2;
    } else {
      resultado = 0;
    }

    joquempo(resultado, jogadaJogador, jogadaComputador);
  });
});

function joquempo(resultado, jogadaPlayer, jogadaComputer) {
  let emojis = ["✊", "✋", "✌️"];
  let emojisPlayers = document.querySelectorAll(".emoji");
  let emojiPlayer = document.getElementById("player-emoji");
  let emojiComputer = document.getElementById("computer-emoji");

  document.querySelector(".container-game-selection").style.display = "none";

  emojisPlayers.forEach((emoji) => {
    emoji.classList.add("emoji-playing");
  });

  setTimeout(() => {
    emojisPlayers.forEach((emoji) => {
      emoji.classList.remove("emoji-playing");
      emoji.style.transform = "rotate(-90deg)";
    });

    emojiPlayer.textContent = emojis[jogadaPlayer - 1];
    emojiComputer.textContent = emojis[jogadaComputer - 1];

    document.querySelector(".end-game").style.display = "flex";
    let resultadoText = document.querySelector(".result");
    if (resultado == 1) {
      resultadoText.textContent = "Empate!";
      empates++;
      localStorage.setItem("empates", empates);
    } else if (resultado == 2) {
      resultadoText.textContent = "Você venceu!";
      pontuacaoPlayer++;
      localStorage.setItem("pontuacaoPlayer", pontuacaoPlayer);
    } else {
      resultadoText.textContent = "Você perdeu!";
      pontuacaoComputador++;
      localStorage.setItem("pontuacaoComputador", pontuacaoComputador);
    }

    document.getElementById("score-player").textContent = pontuacaoPlayer || 0;
    document.getElementById("score-computer").textContent =
      pontuacaoComputador || 0;
    document.getElementById("score-ties").textContent = empates || 0;
  }, 2950);
}

document.getElementById("restart-btn").addEventListener("click", () => {
  location.reload();
});

document.getElementById("ver-placar").addEventListener("click", () => {
  document.querySelector(".placar").style.display = "flex";
  pontuacaoPlayer = localStorage.getItem("pontuacaoPlayer");
  pontuacaoComputador = localStorage.getItem("pontuacaoComputador");
  empates = localStorage.getItem("empates");

  document.getElementById("score-player").textContent = pontuacaoPlayer || 0;
  document.getElementById("score-computer").textContent =
    pontuacaoComputador || 0;
  document.getElementById("score-ties").textContent = empates || 0;
});

document.getElementById("close-score").addEventListener("click", () => {
  document.querySelector(".placar").style.display = "none";
});

document.getElementById("reset-score").addEventListener("click", () => {
  localStorage.setItem("pontuacaoPlayer", 0);
  localStorage.setItem("pontuacaoComputador", 0);
  localStorage.setItem("empates", 0);
  document.getElementById("score-player").textContent = 0;
  document.getElementById("score-computer").textContent = 0;
  document.getElementById("score-ties").textContent = 0;
});
