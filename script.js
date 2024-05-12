'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// VaultWise APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Abdelkrim Bellagnech',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// VaultWise APP

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displayMovements = function (movements, sort = false) {
  // But we should empty the entire continer , and only then, we should start adding new elements :
  containerMovements.innerHTML = '';
  // textContent = 0;
  // innerHTML is like textContent, the differenece is textContent returns the text inside the wanted element
  // and innerHTML returns you everythings including the html

  // sorting the array of movements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${movement.toFixed(2)}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

console.log(containerMovements.innerHTML);
/**<div class="movements__row">
          <div class="movements__type movements__type--deposit">8 deposit</div>
          <div class="movements__value">1300</div>
        </div> */

/**So with beforeend, the order of the movements would be inverted. And that's because each new element would 
simply be added after the previous one. So at the end of the container, right?
And so that's after all the child elements that are already in there.
And that's why I wanted it to be the other way around
because like this (using 'afterbegin'), it will always be basically appended
to all the other children. So any new child element will appear before all the other child elements
that were already there. */

const createUsernames = function (accs) {
  // to mutate the original array => forEach()
  // to return a new array without modifying the new one => map()
  accs.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = balance + "";
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
  // Label is something we wanna put a text in it
  // we use in it oftently textContent f label
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr); //[2.4, 5.4, 36, 0.84, 15.6]
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  /**.reduce((acc, int) => {
      if (int >= 1) {
        return acc + int;
      } else {
        return acc;
      }
    }, 0); */
  labelSumInterest.textContent = `${interests.toFixed(2)}€`;
};

createUsernames(accounts);
accounts.forEach(acc => {
  console.log(acc.username);
});
// js
// jd
// stw
// ss
// That is for displaying the balance of the account that logged in


//////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// The find() method

// find() method is to retrieve one element from the array based on an condition
// the find() method also loops over an array and execute its callback function in every iteration of it

// find() method returns the FIRST element that satisty the condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// So now, with the help of the find() method , we can find the account based on a property of it
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
// Object { owner: "Jessica Davis", movements: (8) […], interestRate: 1.5, pin: 2222, username: "jd" }

// Using the FOR OF loop
let acct = {};
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    acct = acc;
  }
}
console.log(acct);
// Object { owner: "Jessica Davis", movements: (8) […], interestRate: 1.5, pin: 2222, username: "jd" }

// Implementing the login

// Event Handelers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // console.log("LOGIN"); //it gives us this clg and it reloads
  // the button in html is for reloading the page

  //This will prevent this form from submitting
  e.preventDefault();
  console.log('LOGIN');
  // The cool thing about forms , is that when you are on focus on some input and u click enter
  // it submits, which is cool

  // username is a property created with help of the function createUsernames()
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // in case of 'js', it gives me :
  // { owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js' }
  // 7.20

  // to check if currentAccount exists, (in some cases, the login username is wrong so we get an erreur for the currentAccount being undefined and then the pin give us an error)

  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
  if (currentAccount?.pin === +inputLoginPin.value) {
    // (inputLoginPin.value) is always be a string

    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Clear input fields, and lose the focus on them
    inputLoginPin.value = inputLoginUsername.value = ''; //because the reading and assignment is from the right
    inputLoginPin.blur();

    updateUI(currentAccount);

    console.log('Login');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    updateUI(currentAccount);
    // displayMovements(currentAccount.movements);
    // calcDisplayBalance(currentAccount);
    // calcDisplaySummary(currentAccount);
  }
});



btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const closingUsername = inputCloseUsername.value;
  const closingPin = +inputClosePin.value;
  if (
    closingPin === currentAccount.pin &&
    closingUsername === currentAccount.username
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // the findIndex() method will return the index of the first element that matches the condition, it is like the indexOf()
    // method but indexOf just verifies if a certain element exists in the  array or not but the findIndex() method verifies
    //  a complex boolean expression to find the index and return it

    // the splie() method actually mutates the actual array , so we dont have to sauvegarde the result

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
    // console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});


// SOME method------------------------------

// EQUALITY
console.log(movements.includes(-130));
// CONDITION
console.log(movements.some(mov => mov === -130));

// CONDITION
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// if the 'any' word matches the logic of ur work, u should use the 'some' method then
// Requesting LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  // const amount = +inputLoanAmount.value;
  // we are gonna round down the loan value cuz its weird to have it decimal
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add the movement
    currentAccount.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);

    // Clear the input field
  }
  inputLoanAmount.value = '';
});

// EVERY : if only all the elements in the array verifies the condition in the callback function, then , the 'every' method returns true

console.log(movements.every(mov => mov > 0)); //false
console.log(account2.movements.every(mov => mov > 0)); //true

// -------------------------------- Cool : tip (DRY PRINCIPAL)---------------------------
// Separate callback

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// FLAT AND FLATMAP METHODS

const arr = [[1, 2, 3], 4, [5, 6], 7, 8];
console.log(arr.flat());
// [1, 2, 3, 4, 5, 6, 7, 8];

const arrDeep = [[[1, 2], 3, [4, 5]], 6, 7, 8];
console.log(arrDeep.flat());
// [[1, 2], 3, [4, 5], 6, 7, 8];
// That's because the flat method goes only one level deep
// to fix that , we need to add the 'Depth' argument
// usually , flat() === flat(1), it means it flatting based on one level

console.log(arrDeep.flat(2));
// [1, 2, 3, 4, 5, 6, 7, 8];

// flat
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance); //17840

// flatmap
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2); //17840

// But , if u needed to go more than one level deeper , you still need to use the flat(x)
// method, because, flatmap() goes only one level deep

// Sorting arrays

// Strings
const owners = ['Abdelkrim', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners); //sort() mutates the original array ,soo u should be careful

//Numbers
console.log(movements);
// [-130, -400, -650, 1300, 200, 3000, 450, 70];
console.log(movements.sort());
// [-130, -400, -650, 1300, 200, 3000, 450, 70];

// the sort() method does the sorting based on Strings , that's why we got thsi weird result

// return <0,  A,B
// return >0, B,A

// Ascending order

// a and b are basically the currenrt and the next elements
movements.sort((a, b) => {
  if (a > b) return 1; //it means 'switch order of a and b'
  if (a < b) return -1; //it means 'keep the order'
});
console.log(movements);

// Descending order

// a and b are basically the current and the next elements
movements.sort((a, b) => {
  if (a > b) return -1; //it means 'switch order of a and b'
  if (a < b) return 1; //it means 'keep the order'
});
console.log(movements);

// In a smart way hhhh :

// Ascending order
movements.sort((a, b) => a - b);
console.log(movements);

// Descending order
movements.sort((a, b) => b - a);
console.log(movements);

let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

// whenever we click on the sort button its either gonna sort the moevements after not being sorted, or it is gonna non-sort them after being sorted , that's why we used the state sortedState to track the changes

console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty array + fill method
const x = new Array(7);
console.log(x);
// (7) [vide × 7]
// length: 7
// it sa bit weir d, because we can't even fill it up using the map() method

// So :
//x.fill(1);//mutates the underline array
console.log(x);
// [1, 1, 1, 1, 1, 1, 1];

// x.fill(1, 3);
console.log(x);
// [null, null, null, 1, 1, 1, 1];

x.fill(1, 3, 5);
console.log(x);
// [null, null, null, 1, 1, null, null];

// not-empty array + fill method
const arrrr = [1, 2, 3, 4, 5, 6, 7];
arrrr.fill(99, 2, 6);
console.log(arrrr);
// [1, 2, 99, 99, 99, 99, 7];
// it mutated the underline array

// Array.from (a way nicier method)
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
// [1, 1, 1, 1, 1, 1, 1];

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
// [1, 2, 3, 4, 5, 6, 7];
// _ reffers to cur which means current element

const rnd = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(rnd);

////////////////////
// Array Methods Practice

// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((mov, cur) => mov + cur, 0);

console.log(bankDepositSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

// Reduce is good to count also
const numDeposits1000_2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur > 1000 ? ++count : count), 0);

console.log(numDeposits1000_2);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, Math.abs(withdrawals));

// 4.
// this is a nice title -> This Is a nice Title

const converttitlecase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = [
    'a',
    'an',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    ',',
    '.',
    'and',
  ];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');

  return capitalize(titleCase);
};
console.log(converttitlecase('this is a nice title'));
console.log(converttitlecase('this is a LONG tiTle but not too long'));
console.log(converttitlecase('and HEre is another title with an EXAMPLE'));

/////////////////////////////////////////////////////////////////////////////7
// All numbers in JS are represented as floating numbers no matter what , even if you specified that they are integers.
// Prouf :
console.log(23 === 23.0); //true

// conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
// Parsing a number from a string
console.log(Number.parseInt('30px')); //30
// in this proces, the string must begin with a number

// we add the base as a second argument
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('e23', 10)); //NaN
console.log(Number.parseInt('30px', 2)); //NaN

console.log(Number.parseInt('2.5rem')); //2
console.log(Number.parseFloat('2.5rem')); //2.5
console.log(Number.parseFloat('    2.5rem ')); //2.5

// these are called global functions
console.log(parseFloat('2.5rem')); //2.5

// Check if the value is a NaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false
console.log(Number.isNaN(+'20')); //false
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); //false : infinity

// The best way to check if the value is a number is :
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20X')); //false
console.log(Number.isFinite(23 / 0)); //false

console.log(Number.isInteger(20)); //true
console.log(Number.isInteger(20.0)); //true
console.log(Number.isInteger(20.3)); //false

/////////////////////////// MATHS OPERATIONS /////////////////////////////////////
//// SQRT  /////
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //other way of square root : 5

//// MAX ////
console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
// parsing doesnt work
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

//// MIN ////
console.log(Math.min(4, 7, 8, -1, 10)); //-1

//// PI ////
console.log(Math.PI * Number.parseFloat('10px') ** 2); //314.1592653589793

//// RANDOM ////
// random() gives us a random value between 0 and 1
console.log(Math.trunc(Math.random() * 6) + 1); //previous project exeample

const randomInt = (min, max) =>
  // Math.trunc(Math.random() * (max - min) + 1) + min;
  Math.floor(Math.random() * (max - min) + 1) + min;
//0......1 => 0......(max - min) => min......(max - min + min) <=> min......max

console.log(randomInt(10, 20));

// Rounding Integers

console.log(Math.trunc(23.3)); //this removes any decimal parts always :23

// Round() rounds the number to the nearest integer
console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

// ceil() rounds UP the number
console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

// floor() rounds DOWN the number
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23

// all these methods do Type coercion
// we see clearly that the floor() & the trunc() methods do the same thing
// that is for the positive numbers, but for the negative numbers, its another story
console.log(Math.trunc(-23.3)); //-23 : it simply just removed the decimal part
console.log(Math.floor(-23.3)); //-24 : it rounds down the number to the inferieur one
// OPINION : floor() is a little bit better than trunc because its useful when dealing with positive and negative numbers

// Rounding decimals
console.log((2.7).toFixed(0)); //3   : which is of type of string , always remember that
console.log((2.7).toFixed(3)); //2.700
console.log((2.345).toFixed(2)); //2.35
console.log(+(2.345).toFixed(2)); //2.35

// thsese decimal numbers are primitives(dont have methods) and they get methods called on them,
//  so what JS do is that it do 'boxing' behind the scenes => transform this primitive to a
// number object and apply the method on them, and after retransform them to primtives once again

//// REMINDER OPERATOR ////
// every Nth time, we pense to use the Reminder operator
console.log(5 % 2); // 1
console.log(8 % 3); // 2

const isEven = number => number % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //false
console.log(isEven(514)); //true

// labelBalance.addEventListener('click', (event) => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// })

// Numeric SEPARATORS //////////
const diameter = 287_452_183_569; // a thousand separator
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents); //34599

const transferFee1 = 15_00;
const transferFee2 = 1_500;
// 15_00 and 1_500 are the same but the underscore gave them different readings

const PI = 3.14_15; //no prob : 3.1415

// dont place 2 _ concecutivly

// Convert a number
console.log(Number('230000')); //230000
console.log(Number('230_000')); //NaN,be careful, especially when u use data from an API for ex

// bigint

// The biggest number that javascript can safely represent
console.log(2 ** 53 - 1); //9007199254740991
// It is also stored as :
console.log(Number.MAX_SAFE_INTEGER);
// Any integer bigger than this is not safely correct
console.log(2 ** 53 + 1); //9007199254740992

// Sometimes we really need some 60 bits bigNumbers specially when we deal with real IDs in really big projects,
// (Getting a big number from an API)

// thats why we use bigInts
console.log(6154331965496799845665637565433246657969676n);
// 6154331965496799845665637565433246657969676n
console.log(BigInt(64545129)); //64545129n

// Operations :
console.log(10000n + 10000n); //20000n
console.log(135613578649813544798441659449876316919n * 100000n);
// 13561357864981354479844165944987631691900000n

// What is impossible is to mix BigInts with regular Numbers
const huge = 31985479416516374984631n;
const num = 23;
// console.log(huge * num);
//Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
// Solution :
console.log(huge * BigInt(num)); //735666026579876624646513n

console.log(20n > 15); //true

console.log(20n == 20); //true
console.log(20n === 20); //false, because javascript here don't do type coercion here
//Test :
console.log(typeof 20n, typeof 20); //bigint number

console.log(huge + ' is REALLY big!!!');
//31985479416516374984631 is REALLY big!!!
// The BigInt here has really changed into a string

// Note : We can't use Operations of Math. on BigInts
// console.log(Math.sqrt(huge)); //Uncaught TypeError: Cannot convert a BigInt value to a number

// Divisions :
console.log(10n / 3n); //it returns the closest BigInt : 3n
console.log(11n / 3n); //it basically cuts off the decimal part : 3n
console.log(10 / 3); //3.3333333333333335

//Creating  Dates :
//Fundamentals

// Creating a Date :
const now = new Date();
console.log(now); //Wed Dec 06 2023 06:43:48 GMT+0100 (UTC+01:00)

console.log(new Date('Wed Dec 06 2023 06:43:48'));
// Wed Dec 06 2023 06:43:48 GMT+0100 (UTC+01:00)
// Javascript here is basically parsing the date based on the string

console.log(new Date('December 24, 2015'));
// Thu Dec 24 2015 00:00:00 GMT+0000 (UTC)
// So javascript is basically smart in doing this , smart with dates ofc
// It is unreliable tho to use this

console.log(new Date(account1.movementsDates[0]));
// Mon Nov 18 2019 22:31:17 GMT+0100 (UTC+01:00)

console.log(new Date(2037, 10, 19, 15, 23, 5));
// Thu Nov 19 2037 15:23:05 GMT+0100 (UTC+01:00)
// You might notice that the month that we wrote is october (10) , and JS wrote us 11
// The things is that JAVASCRIPT IS 0 BASED IN MONTHS

// Javascript auto-corrects the dates
console.log(new Date(2037, 10, 31));
// Tue Dec 01 2037 00:00:00 GMT+0100 (UTC+01:00)
console.log(new Date(2037, 10, 33));
// Thu Dec 03 2037 00:00:00 GMT+0100 (UTC+01:00)

// The initial unix time where (0 miliseconds)
console.log(new Date(0)); //Thu Jan 01 1970 00:00:00 GMT+0000 (UTC)

//Convert from days to miliseconds : (3 days later)
console.log(new Date(3 * 24 * 60 * 60 * 1000));
// Sun Jan 04 1970 00:00:00 GMT+0000 (UTC)

// When u type this operation : 3 * 24 * 60 * 60 * 1000 in the console, it gives you
// the actual timestamp : 259200000 (IMPORTANT!!!)

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear()); //don't use getYear() cuz it is considered as a mistake
// 2037
console.log(future.getMonth()); //10
console.log(future.getDate()); //19
// we use getDate() instead of getDay() because it returns the Day of the week in number
console.log(future.getDay()); //4 : meaning thursday (0 === Sunday)

console.log(future.getHours()); //15
console.log(future.getMinutes()); //23
console.log(future.getSeconds()); //0

// We can get a nice formatted string :
console.log(future.toISOString());
// 2037-11-19T14:23:00.000Z : it follows an international standard

// Generate the timestamp of the date :
console.log(future.getTime()); //2142253380000
// the timesTAMP IS FROM 1970

// We can reverse this(from timestamp to date)
console.log(new Date(2142253380000)); //Thu Nov 19 2037 15:23:00 GMT+0100 (UTC+01:00)

// Getting the current timestamp

console.log(Date.now()); //1701846747982

future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:00 GMT+0100 (UTC)
future.setMonth(10);
future.setDate(10);
future.setMinutes(10);
future.setHours(10);
future.setSeconds(10);
console.log(future); //Sat Nov 10 2040 10:10:10 GMT+0100 (UTC)
