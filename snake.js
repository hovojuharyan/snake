import { move, startTheGame, setPlaying } from "./game.js"
import props from "./properties.js";

document.addEventListener("DOMContentLoaded", () => {
    createFieldGrid();
    createPauseEvent();
    fillDifficulyOptions();
    createNewGameEvent();
    move();
});

function createFieldGrid() {
    for (let i = 0; i < props.stats.cellCount; i++) {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("gridCell");
        props.dom.field.appendChild(cellDiv);
    }
}

function createNewGameEvent() {
    props.dom.newGameBtn.addEventListener("click", () => {
        startTheGame();
    });
}

function createPauseEvent() {
    props.dom.pauseBtn.addEventListener("click", () => {
        setPlaying(false);
    });
}

function fillDifficulyOptions() {
    for (let i = 0; i < props.difficulties.length; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerText = props.difficulties[i].name;
        props.dom.difficultySelect.appendChild(option);
    }
}
