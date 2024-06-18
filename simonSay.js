let gameSeq = [];
let userSeq = [];
let btn = ['c1', 'c2', 'c3', 'c4'];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let maxscore = document.querySelector("h3");
let highlevel = localStorage.getItem('highlevel') ? parseInt(localStorage.getItem('highlevel')) : 0;

maxscore.innerText = `Highest score: ${highlevel}`;

function startGame() {
    if (!started) {
        started = true;
        levelup();
    }
}

document.addEventListener("keypress", startGame);
document.addEventListener("touchstart", startGame);

function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 150);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIndx = Math.floor(Math.random() * 4);
    let randcolor = btn[randIndx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    flash(randbtn);
}

function checkans(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (gameSeq.length === userSeq.length) {
            setTimeout(levelup, 500);
        }
    } else {
        h2.innerHTML = `Game over! Your score is ${level} <br> Press any key or tap to start again.`;
        document.querySelector("body").style.backgroundColor = "#FF204E";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "bisque";
        }, 300);
        highscore(level);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    let btnpress = btn.getAttribute("id");
    userSeq.push(btnpress);
    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btns of allbtns) {
    btns.addEventListener("click", btnPress);
}

function highscore(level) {
    highlevel = Math.max(level, highlevel);
    localStorage.setItem('highlevel', highlevel);
    maxscore.innerText = `Highest score: ${highlevel}`;
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    document.addEventListener("keypress", startGame);
    document.addEventListener("touchstart", startGame);
}
