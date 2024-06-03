'use strict';

// VaultWise APP

import { account1, account2, accounts } from './data.js';

import {
  labelWelcome,
  labelDate,
  labelBalance,
  labelSumIn,
  labelSumOut,
  labelSumInterest,
  labelTimer,
  containerApp,
  containerMovements,
  btnLogin,
  btnTransfer,
  btnLoan,
  btnClose,
  btnSort,
  inputLoginUsername,
  inputLoginPin,
  inputTransferTo,
  inputTransferAmount,
  inputLoanAmount,
  inputCloseUsername,
  inputClosePin,
} from './elements.js';

// Find Method
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

// SOME method------------------------------

// EQUALITY
console.log(movements.includes(-130));
// CONDITION
console.log(movements.some(mov => mov === -130));

// CONDITION
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// if the 'any' word matches the logic of ur work, u should use the 'some' method then

// EVERY : if only all the elements in the array verifies the condition in the callback function, then , the 'every' method returns true

console.log(movements.every(mov => mov > 0)); //false
console.log(account2.movements.every(mov => mov > 0)); //true

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

/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:

// FLAT
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

console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty array + fill method
const x = new Array(7);
console.log(x);
// (7) [vide × 7]
// length: 7
// it sa bit weird, because we can't even fill it up using the map() method

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

/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:

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

// 3.  COOOOOOOOOOLLLLLLLLLLLLLL
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

/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:

// Numbers
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

  return titleCase;
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
// in this process, the string must begin with a number

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
// random() gives us a random value between 1 and 6
console.log(Math.trunc(Math.random() * 6) + 1); //previous project exeample

// Rounding Integers

console.log(Math.trunc(23.3)); //this removes any decimal parts always :23

// Round() rounds the number to the nearest integer
console.log(Math.round(23.5)); //23
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

/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:

// BigInts :

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

/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:

//Creating  Dates :
//Fundamentals

// Creating a Date :
const noww = new Date();
console.log(noww); //Wed Dec 06 2023 06:43:48 GMT+0100 (UTC+01:00)

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

console.log(Date.noww()); //1701846747982

future.setFullYear(2040);
console.log(future); //Mon Nov 19 2040 15:23:00 GMT+0100 (UTC)
future.setMonth(10);
future.setDate(10);
future.setMinutes(10);
future.setHours(10);
future.setSeconds(10);
console.log(future); //Sat Nov 10 2040 10:10:10 GMT+0100 (UTC)

/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:
/////////////////////////////////////////////////////////////////////////////////:

