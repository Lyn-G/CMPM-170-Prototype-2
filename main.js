title = "Crush-tastic";
description = `
  Munch 
  of blues,

  Don't munch 
  on reds.`;
characters = [];
options = {};

let chomp1;
let chomp2;
let chomp1Y;
let chomp2Y;
const chompTime = 20;
let chomp;
let coin;
let createCoin = false;
let randColor;
let coinColor;

function update() {
  if (!ticks) {
    chomp = 1;
    chomp1Y = -40;
    chomp2Y = 60;
    coin = [];
    randColor = 0;
    coinColor = 0;
    score = 0;
  }

  // chompers
  chomp1 = rect(30, chomp1Y, 40, 70);
  chomp2 = rect(30, chomp2Y, 40, 70);

  // only creates the coin if there isn't a coin on-screen
  if (!createCoin) {
    coin.push({
      pos: vec(-5, 45),
      vel: vec(difficulty, 0),
      size: 5,
    });
    createCoin = true;
  }

  // randomly choose two colors for the coin
  coinColor = randColor < 50 ? "blue" : "red";
  color(coinColor);
  console.log(coinColor);
  console.log(randColor);

  // when the function return true, it removes the coin
  remove(coin, (b) => {
    // this ensure that the coins move across the screen
    b.pos.add(b.vel);

    // check if the boxes are colliding
    if (
      box(b.pos, b.size).isColliding.rect.green ||
      box(b.pos, b.size).isColliding.rect.light_green
    ) {
      // crush blue, do not crush red
      if (coinColor == "red") {
        createCoin = false;
        end();
      } else {
        colorAndScore(1);
      }

      return true;
    }

    // leaving blue coins behind subtracts points
    if (offscreen(b) && coinColor == "blue") {
      colorAndScore(-1);
    } else if (offscreen(b) && coinColor == "red") {
      colorAndScore(0);
    }

    return offscreen(b);
  });

  // check if the user has pressed anything
  if (input.isJustPressed) {
    chomp = -1;
  }

  if (score < 0) end();

  // these move the chompers up and down to touch the middle piece
  if (chomp < 0) {
    color("light_green");
    chomp1Y += 4;
    chomp2Y -= 4;

    if (chomp1Y > -20 || chomp2Y < 40) {
      chomp1Y -= chompTime;
      chomp2Y += chompTime;

      chomp = 1;
    }
  } else {
    color("green");
  }
}

function colorAndScore(score) {
  createCoin = false;
  colorChange();
  addScore(score);
}

function colorChange() {
  randColor = rnd(0, 100);
}

function offscreen(box) {
  return box.pos.x > 110;
}

// trying to see if page will deploy
