let xp = 0;
let health = 2000;
let gold = 1000;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick'];

// get element Button
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');

//get text
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');

//get div element
const monsterStats = document.querySelector('#monsterStats');
const monsterName = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
// create object location set initialize
const locations = [
  {
    // 0
    name: 'store',
    'button text': [
      'Buy 10 health (10 gold)',
      'Buy weapon (30 gold)',
      'Go to town square',
    ],
    'button functions': [buyHealth, buyWeapon, goTown],
    text: 'You enter the store.',
  },
  {
    // 1
    name: 'town square',
    'button text': ['Go store', 'Go cave', 'Fight dragon'],
    'button functions': [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    //2
    name: 'cave',
    'button text': ['Fight slime', 'Fight fanged beast', 'Go to town square'],
    'button functions': [fightSlime, fightBeast, goTown],
    text: 'You enter the cave. You see some monsters.',
  },
  {
    // 3
    name: 'fight',
    'button text': ['Attack', 'Dodge', 'Run'],
    'button functions': [acttack, dodge, run],
    text: 'You are fighting a monster.',
  },
  {
    // 4
    name: 'kill monster',
    'button text': ['Easter Egg', 'Go to town square', 'Go to town square'],
    'button functions': [easterEgg, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    // 5 lose
    name: 'lose game',
    'button text': ['REPLAY', 'REPLAY', 'REPLAY'],
    'button functions': [reStart, reStart, reStart],
    text: 'You die. &#x2620;',
  },
  {
    // 6 win
    name: 'win game',
    'button text': ['REPLAY', 'REPLAY', 'REPLAY'],
    'button functions': [reStart, reStart, reStart],
    text: 'You defeat the dragon! YOU WIN THE GAME! &#x1F389;',
  },
  {
    // 7
    name: 'easter egg',
    'button text': ['2', '8', 'Go Town'],
    'button functions': [pickTwo, pickEight, goTown],
    text: 'Easster egg',
  },
];
// console.log(locations[0]['button functions'][0]);
// create arr onject monsters
const monsters = [
  {
    name: 'Slime',
    level: 2,
    health: 15,
  },
  {
    name: 'Fanged Beast',
    level: 8,
    health: 60,
  },
  {
    name: 'Dragon',
    level: 20,
    health: 300,
  },
];
// create object weapon
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 },
];

function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location['button text'][0]; // locations[...]['button functions'][0]
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  text.innerHTML = location['text'];
}

function goStore() {
  update(locations[0]);
}
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = 'You do not have enough gold to buy health.';
  }
  console.log('Buy health');
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = 'You sold a ' + currentWeapon + '.';
    text.innerText += ' Inventory you have:' + inventory;
  } else {
    text.innerText = 'You can not sell only weapon.';
    text.innerText += ' Inventory you have: ' + inventory;
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      goldText.innerText = gold;
      text.innerText = 'You now have a ' + newWeapon + '.';
      inventory.push(newWeapon);
      text.innerText += ' In your inventory you have: ' + inventory;
    } else {
      text.innerText = 'You no have enough money!';
    }
  } else {
    text.innerText = 'You already have the most powerful weapon!';
    button2.innerText = 'Sell weapon for 15 gold';
    button2.onclick = sellWeapon;
  }
}
// Go Cave and action
function goCave() {
  update(locations[2]);
}
function fightSlime() {
  fighting = 0; // xac dinh dau voi quai vat ten Slime đặt cột đánh dấu
  // update(locations[3]); // lap lai hanh dong fight
  // monsterStats.style.display = 'block';
  // monsterName.innerText = monsters[fighting].name; // ten ko bao h thay doi co the monsterName.innerText = ...
  // monsterHealth = monsters[fighting].health; // health se thay doi nen gan gia tri nhu
  // monsterHealthText.innerText = monsterHealth;
  // console.log('Fight Slime');
  goFight();
}
function fightBeast() {
  // update(locations[3]); // lap lai hanh dong fight
  fighting = 1; // Beast
  goFight();
  console.log('Fight Beast');
}
function fightDragon() {
  fighting = 2;
  // update(locations[3]); // lap lai hanh dong fight
  goFight();
  // console.log('Fighting dragon.');
}

// action fighting
function acttack() {
  text.innerText = 'The ' + monsters[fighting].name + ' attacks.';
  text.innerText +=
    ' Your attack it with your ' + weapons[currentWeapon].name + '.';
  health -= damageMonsters(monsters[fighting].level); // hp main bi tru di mau quai vat
  if (hitFromMain()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp + 1); // hp monster tru di power weapon
  } else {
    text.innerText =
      'The ' +
      monsters[fighting].name +
      ' attacks. You attack it with your ' +
      weapons[currentWeapon].name +
      '. You miss.';
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  // if (monsterHealth <= 0) {
  //   if (fighting == 2) {
  //     win();
  //   } else {
  //     defeatMonster();
  //   }
  // } else if (health <= 0) {
  //   lose();
  // }

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += ' Your ' + inventory.pop() + ' breaks.';
    currentWeapon--;
  }
}

// HIt Monster don danhc quai vat vao main
function damageMonsters(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp); // level xp cang cao thi dme nhan vao cang it
  return hit > 0 ? hit : 1; // hit la so am thi dame nhan dc luon luon la 1
}

// Hit main don danh cua main gay ra cho quai
function hitFromMain() {
  return Math.random() > 0.2 || health < 20; // neu ti le ra dong lon hon 0.2 thi danh hoac mau duoi 20 thi danh
}

damageMonsters(2);
// defeat monster
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
// win and lose
function lose() {
  update(locations[5]);
}
function win() {
  update(locations[6]);
}

function reStart() {
  xp = 0;
  health = 100;
  currentWeapon = 0;
  gold = 100;
  inventory = ['stick'];
  xpText.innerText = xp;
  goldText.innerText = gold;
  healthText.innerText = health;
  goTown();
}
function dodge() {
  console.log('dodge');
}
function run() {
  update(locations[2]);
}

function goFight() {
  update(locations[3]); // lap lai hanh dong fight
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name; // ten ko bao h thay doi co the monsterName.innerText = ...
  monsterHealth = monsters[fighting].health; // health se thay doi nen gan gia tri nhu
  monsterHealthText.innerText = monsterHealth;
  // console.log('Fight Slime');
}
// Go Town
function goTown() {
  update(locations[1]); // locations[1]['button functions'][0]
  // button1.innerText = 'Go store';
  // button2.innerText = 'Go cave';
  // button3.innerText = 'Fight dragon';
  // button1.onclick = goStore;
  // button2.onclick = goCave;
  // button3.onclick = fightDragon;
  // text.innerText =
  //   'You enter the storeYou are in the town square. You see a sign that says "Store".';
}

function easterEgg() {
  update(locations[7]);
}
function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = 'You pick ' + guess + ' here are number: \n';
  for (let i = 0; i < numbers.length; i++) {
    text.innerText += numbers[i] + '\n';
  }
  if (numbers.includes(guess)) {
    text.innerText += 'Right! You win 20 gold!';
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += 'Wrong! You lose 10 health!';
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
const s = 'javascriptloops';
const arr = [];
const vow = 'aiueo';
for (var i = 0; i <= s.length; i++) {
  if (vow.includes(s[i])) {
    arr.push(s[i]);
    console.log(arr + '\n');
  }
}
