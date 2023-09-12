let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highscore = 0;
let currscore = 0;

let h2 = document.querySelector('h2');
let p = document.querySelector('p');

document.addEventListener('keypress', function() {
    if (started == false) {
        console.log("game is started")
        started = true;

        levelUp();
    }
}); 

function gameFlash(btn) {
    btn.classList.add("gameFlash");
    setTimeout(function() {
        btn.classList.remove("gameFlash");
    }, 1000);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log("gameSeq = ",gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over!<br> Your Score is ${level}.<br><br> Press any key to START`;

        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"
        }, 150);

        currscore = level;
        if (currscore > highscore) {
            highscore = currscore;
            p.innerText = `Your Highest Score is = ${currscore}`;
        }

        gameOver();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColer = btn.getAttribute("id");
    userSeq.push(userColer);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function gameOver() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    currscore = 0;
    console.log("Game Over")
}