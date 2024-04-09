const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

let isError = false;
function addEntry() {
  //   const targetId = '#' + entryDropdown.value;
  const targetInputContainer = document.querySelector(
    // element cua inut nhap
    `#${entryDropdown.value} .input-container`
  );
  // tu element truy cap them 2 input vao trong node element do
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length;
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}
function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    '#breakfast input[type=number]'
  );
  const lunchNumberInputs = document.querySelectorAll(
    '#lunch input[type=number]'
  );
  const dinnerNumberInputs = document.querySelectorAll(
    '#dinner input[type=number]'
  );
  const snacksNumberInputs = document.querySelectorAll(
    '#snacks input[type=number]'
  );
  const exerciseNumberInputs = document.querySelectorAll(
    '#exercise input[type=number]'
  );
  // truy cap lay node tu node ta lay ra gia tri cua phan tu va luu vao bien
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    // kiem tra va lam sach gia tri dau vao
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  // node tuong tu 1 arr nhung ko phai array
  // de lay ra va chuyen arr dung Arr.from
  const inputContainers = Array.from(
    document.querySelectorAll('.input-container')
  );

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

function cleanInputString(str) {
  // luu y tach thanh mang con
  //   const strArray1 = str.split(' '); // tach ky tu khi gap khoang cach
  //   const strArra2 = str.split(' ', 1); // gioi han limit parameter tren mang con h
  //   const strArray = str.split(''); // tach tung ky tu ke ca khoach cach
  //   const cleanStrArray = []; // mang con luu gia tri cua strArray

  //   for (let i = 0; i < strArray.length; i++) {
  //     if (!['+', '-', ' '].includes(strArray[i])) {
  //       cleanStrArray.push(strArray[i]);
  //     }
  //   } ko tao vi se ton nhiu bo nho
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
  // ham se tra xoa khoang trang + - trong input nhap ten
}
function isInvalidInput(str) {
  // /i ko phan biet ky tu hoa
  // \d bat ky chu so nao
  const regex = /\d+e\d+/i;
  return str.match(regex);
}
const breakfastNumberInputs = document.querySelectorAll(
  '#breakfast input[type=number]'
);
/*
    The split() method splits a string into an array of substrings.

    The split() method returns the new array.

    The split() method does not change the original string.

    If (" ") is used as separator, the string is split between words.
*/

// function test() {
//   const inputString = 'Hello World';
//   const charArray = inputString.split('');
//   const consonantArray = [];

//   for (let i = 0; i < charArray.length; i++) {
//     if (!['a', 'e', 'i', 'o', 'u'].includes(charArray[i])) {
//       // includes tra ve true neu ki tu trung vs chuoi
//       consonantArray.push(charArray[i]);
//     }
//   }
//   console.log(consonantArray);
// }
// test();

addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);
clearButton.addEventListener('click', clearForm);
