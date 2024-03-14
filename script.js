let xp = 0;
let health = 100;
let gold = 50;
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
    name: 'town square',
    'button text': ['Go store', 'Go cave', 'Fight dragon'],
    'button functions': [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
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
  button1.innerText = location['button text'][0];
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  text.innerText = location['text'];
}
function goTown() {
  update(locations[1]);
  // button1.innerText = 'Go store';
  // button2.innerText = 'Go cave';
  // button3.innerText = 'Fight dragon';
  // button1.onclick = goStore;
  // button2.onclick = goCave;
  // button3.onclick = fightDragon;
  // text.innerText =
  //   'You enter the storeYou are in the town square. You see a sign that says "Store".';
}

function goStore() {
  update(locations[0]);
}

function goCave() {
  console.log('Going to cave.');
}

function fightDragon() {
  console.log('Fighting dragon.');
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

function buyWeapon() {
  if (gold >= 30) {
    gold -= 30;
    currentWeapon++;
    let newWeapon = weapons[currentWeapon].name;
    goldText.innerText = gold;
    text.innerText = 'You now have a ' + newWeapon + '.';
  } else {
    console.log('you no have enough money');
  }
}
