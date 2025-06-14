let board = document.querySelector(".board");
let turn = document.getElementById("turn");
let cell = document.querySelectorAll(".cell");
let reset = document.getElementById("reset");
let player1Name = localStorage.getItem("player1name") || "";
let player2Name = localStorage.getItem("player2name") || "";
let gameStarted = false;
let player1 = true;

const winingpattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cell.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (!gameStarted || cell.innerText !== "") return;

        if (player1 === true) {
            cell.innerText = "X";
            turn.innerText = player2Name + "'s turn";
        } else {
            cell.innerText = "O";
            turn.innerText = player1Name + "'s turn";
        }
        player1 = !player1;
        cell.disabled = true;
        document.getElementById("clickSound").play();
        checkwinner();

    });
});

function checkwinner() {
    for (pattern of winingpattern) {
        let posval0 = cell[pattern[0]].innerText;
        let posval1 = cell[pattern[1]].innerText;
        let posval2 = cell[pattern[2]].innerText;

        if (posval0 !== "" && posval1 !== "" && posval2 !== "") {
            let posval0 = cell[pattern[0]].innerText;
            let posval1 = cell[pattern[1]].innerText;
            let posval2 = cell[pattern[2]].innerText;

            if (posval0 !== "" && posval0 === posval1 && posval1 === posval2) {
                cell[pattern[0]].classList.add("win");
                cell[pattern[1]].classList.add("win");
                cell[pattern[2]].classList.add("win");
            }

            if (posval0 === posval1 && posval1 === posval2) {
                if (posval0 === "X") {
                    turn.innerText = player1Name + " wins!";
                    let score = parseInt(localStorage.getItem(player1Name)) || 0;
                    localStorage.setItem(player1Name, score + 1);
                } else {
                    turn.innerText = player2Name + " wins!";
                    let score = parseInt(localStorage.getItem(player2Name)) || 0;
                    localStorage.setItem(player2Name, score + 1);
                }
                cell.forEach((c) => c.disabled = true);
                showScores();
                document.getElementById("winSound").play();
                return;
            }
        }
    }

    let isDraw = true;
    cell.forEach((c) => {
        if (c.innerText === "") isDraw = false;
    });

    if (isDraw) {
        turn.innerText = "It's a draw!";
        cell.forEach((c) => c.disabled = true);
        document.getElementById("drawSound").play();

    }

}

let player1Input = document.getElementById("player1name");
let player2Input = document.getElementById("player2name");
let formOverlay = document.getElementById("formOverlay");

// Start Game

document.getElementById("startGame").addEventListener("click", function () {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    if (player1Name === "" || player2Name === "") {
        alert("Please enter both names");
        return;
    }

    localStorage.setItem("player1name", player1Name);
    localStorage.setItem("player2name", player2Name);

    if (localStorage.getItem(player1Name) === null) {
        localStorage.setItem(player1Name, 0);
    }
    if (localStorage.getItem(player2Name) === null) {
        localStorage.setItem(player2Name, 0);
    }

    formOverlay.style.display = "none";
    gameStarted = true;
    turn.innerText = player1Name + "'s Turn";
    showScores();
});

function showScores() {
    let p1score = localStorage.getItem(player1Name);
    let p2score = localStorage.getItem(player2Name);
    document.getElementById("scoreDisplay").innerText =
        player1Name + " = " + p1score + "\n" +
        player2Name + " = " + p2score;
}

reset.addEventListener("click", () => {
    cell.forEach((c) => {
        c.innerText = "";
        c.disabled = false;
    });
    player1 = true;
    turn.innerText = player1Name + "'s Turn";
});

document.getElementById("clearScores").addEventListener("click", () => {
    localStorage.removeItem(player1Name);
    localStorage.removeItem(player2Name);
    localStorage.removeItem("player1name");
    localStorage.removeItem("player2name");
    location.reload();
});

document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
