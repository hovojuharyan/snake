import Cube from "./cube.js";
import props from "./properties.js";

const cellsInGrid = props.dom.cellsInGrid;

export let playing;         // true if the game is moving, false otherwise
let pendingDirectionX;      // pending direction on X axis to move next
let pendingDirectionY;      // pending direction on Y axis to move next
let head;                   // snakes head cube
let tail;                   // snakes tail cube (initially same as head)
let difficultyLevel = 0;    // the chosen level of difficulty (index for difficulties array)
let snakeLen;               // the count of cubes of snake's body
let applesEaten;            // how many apples have been eaten so far

function addKeyBoardEvents() {
    document.addEventListener("keydown", keydownListener);
}

function keydownListener(e) {
    e.preventDefault();
    const key = e.key;
    if (key == "ArrowLeft" && head.directionX == 0) {
        pendingDirectionX = -1;
        pendingDirectionY = 0;
        playing = true;
    } else if (key == "ArrowRight" && head.directionX == 0) {
        pendingDirectionX = 1;
        pendingDirectionY = 0;
        playing = true;
    } else if (key == "ArrowDown" && head.directionY == 0) {
        pendingDirectionX = 0;
        pendingDirectionY = -1;
        playing = true;
    } else if (key == "ArrowUp" && head.directionY == 0) {
        pendingDirectionX = 0;
        pendingDirectionY = 1;
        playing = true;
    }
}

export function startTheGame() {
    playing = false;
    addKeyBoardEvents();
    for (let cell of cellsInGrid) {
        cell.style.backgroundColor = props.colors.blankColor;
    }
    snakeLen = 1;
    applesEaten = 0;
    head = new Cube(Math.ceil(props.stats.rowCount / 2), Math.ceil(props.stats.colCount / 2), 0, 0, null);
    tail = head;
    difficultyLevel = props.dom.difficultySelect.value;
    placeHeadInitial();
    placeAnApple();
}

export function move() {
    setTimeout(() => {
        if (playing) {
            head.directionX = pendingDirectionX;
            head.directionY = pendingDirectionY;
            moveAStep();
            shiftDirections();
        }
        move();
    }, props.difficulties[difficultyLevel].speed);
}

function moveAStep() {
    let cube = head;
    while (playing && cube) {
        let crashed = false;
        if (cube == head) {
            let nextR = cube.nextR();
            let nextC = cube.nextC();
            crashed = isThereBodyPartAt(idx(nextR, nextC));
            if (crashed) {
                onCrashed();
            } else if (isThereAppleAt(idx(nextR, nextC))) {
                onAppleEaten();
            }
        }
        if (!crashed) {
            changeColorOfCube(cube, props.colors.blankColor);
            cube.move();
            changeColorOfCube(cube, props.colors.snakeColor);
        }
        cube = cube.next;
    }
}

function onCrashed() {
    playing = false;
    document.removeEventListener("keydown", keydownListener);
    pendingDirectionX = 0;
    pendingDirectionY = 0;
    let cube = head;
    while (cube) {
        changeColorOfCube(cube, props.colors.crashColor);
        cube = cube.next;
    }
    setTimeout(() => {
        startTheGame();
    }, 1000);
}

function onAppleEaten() {
    applesEaten++;
    increaseInSize();
    placeAnApple();
    updateBestScore();
}

function increaseInSize() {
    let newR = Cube.normalizePosition(tail.r + tail.directionY, props.stats.rowCount);
    let newC = Cube.normalizePosition(tail.c - tail.directionX, props.stats.colCount);
    tail.next = new Cube(newR, newC, tail.directionY, tail.directionX, null);
    tail = tail.next;
    snakeLen++;
}

function shiftDirections() {
    shiftToRightNeighbour(head, head.directionX, head.directionY);
}

function shiftToRightNeighbour(cube, newDirectionX, newDirectionY) {
    if (cube.next) {
        shiftToRightNeighbour(cube.next, cube.directionX, cube.directionY);
    }
    if (playing) {
        if (newDirectionX !== 0) {
            cube.changeDirectionX(newDirectionX);
        }
        if (newDirectionY !== 0) {
            cube.changeDirectionY(newDirectionY);
        }
    }
}

function updateBestScore() {
    props.dom.bestScore.innerText = Math.max(applesEaten, Number(props.dom.bestScore.innerText));
}

function placeHeadInitial() {
    changeColorOfCube(head, props.colors.snakeColor);
}

function isThereBodyPartAt(idx) {
    return cellsInGrid[idx].style.backgroundColor == props.colors.snakeColor;
}

function isThereAppleAt(idx) {
    return cellsInGrid[idx].style.backgroundColor == props.colors.appleColor;
}

function placeAnApple() {
    let randomIdx = Math.floor(Math.random() * (cellsInGrid.length - 1));
    while (randomIdx == idx(head.nextR(), head.nextC()) || isThereBodyPartAt(randomIdx)) {
        randomIdx = Math.floor(Math.random() * (cellsInGrid.length - 1));
    }
    changeColorByIdx(randomIdx, props.colors.appleColor);
}

function changeColorOfCube(cube, color) {
    changeColorByIdx(idx(cube.r, cube.c), color);
}

function changeColorByIdx(idx, color) {
    cellsInGrid[idx].style.backgroundColor = color;
}

function idx(row, col) {
    return props.stats.rowCount * (row - 1) + col - 1;
}
