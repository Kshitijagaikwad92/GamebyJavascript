function checkChoice() {
    const choices = ["stoneChoice", "paperChoice", "scissorChoice"];
    const comChoice = choices[Math.floor(Math.random() * choices.length)];

    const selectedChoiceElement = document.querySelector('input[name="selectedChoice"]:checked');
    const gameArea = document.getElementById("gameArea");
    const selectionArea = document.getElementById("selectionArea");

    if (!selectedChoiceElement) {
        alert("Please select a choice!");
        return;
    }

    const selectedChoice = selectedChoiceElement.value;
    let result = "";
    let resultClass = "";
    let resultText = "";

    if (selectedChoice === comChoice) {
        result = "It's a tie!";
        resultClass = "tie-card";
        resultText = "It's a tie!";
    } else if (
        (selectedChoice === "stoneChoice" && comChoice === "scissorChoice") ||
        (selectedChoice === "scissorChoice" && comChoice === "paperChoice") ||
        (selectedChoice === "paperChoice" && comChoice === "stoneChoice")
    ) {
        result = "win";
        resultClass = "win-card";
        resultText = "You win!";
        createConfetti(); // Trigger confetti only when the user wins
    } else {
        result = "lose";
        resultClass = "lose-card";
        resultText = "You lose!";
    }

    selectionArea.classList.add("hidden");
    gameArea.classList.remove("hidden");

    gameArea.innerHTML = `
        <div class="result-card ${resultClass}">
            <h3>${resultText}</h3>
            <p>Your choice: ${selectedChoice.replace("Choice", "")}</p>
            <p>Computer's choice: ${comChoice.replace("Choice", "")}</p>
            <button onclick="retryGame()">Retry</button>
        </div>
    `;
}



function retryGame() {
    document.getElementById("selectionArea").classList.remove("hidden");
    document.getElementById("gameArea").classList.add("hidden");
}

window.addEventListener("load", () => {
    const container = document.getElementById("confetti-container");
});

function createConfetti() {
    const container = document.createElement("div");
    container.classList.add("confetti-container");
    document.body.appendChild(container);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.setProperty("--hue", Math.random() * 360);
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;

        container.appendChild(confetti);
    }

    // Remove the confetti after the animation
    setTimeout(() => {
        container.remove();
    }, 3000);
}

