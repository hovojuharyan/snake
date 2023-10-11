const props = {
    // sizes of the field
    stats: {
        cellSizePx: 20,
        fieldSizePx: 500,
        get rowCount() {
            return this.fieldSizePx / this.cellSizePx
        },
        get colCount() {
            return this.rowCount
        },
        get cellCount() {
            return this.rowCount * this.colCount
        }
    },
    // DOM elements
    dom: {
        field: document.getElementById("field"),
        cellsInGrid: document.getElementsByClassName("gridCell"),
        bestScore: document.getElementById("bestScoreLbl"),
        newGameBtn: document.getElementById("newGameBtn"),
        pauseBtn: document.getElementById("pauseBtn"),
        difficultySelect: document.getElementById("difficultySelect")
    },
    // difficulty levels
    difficulties: [
        {
            speed: 300,
            name: "easy"
        },
        {
            speed: 240,
            name: "easyish"
        },
        {
            speed: 180,
            name: "normal"
        },
        {
            speed: 120,
            name: "hardish"
        },
        {
            speed: 60,
            name: "hard"
        },
    ],
    // used colors
    colors: {
        snakeColor: "black",
        appleColor: "lime",
        crashColor: "red",
        blankColor: "white"
    }
}

export default props;
