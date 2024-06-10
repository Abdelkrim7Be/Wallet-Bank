'use strict';

let initialAccount = account1;
const movements = initialAccount.movements;

// 1

// console.log("LOGIN"); //it gives us this clg and it reloads
// the button in html is for reloading the page

//This will prevent this form from submitting
e.preventDefault();
console.log('LOGIN');
// The cool thing about forms , is that when you are on focus on some input and u click enter
// it submits, which is cool

// 2
// inputs have values
// labels have textContents
// inputs will always be strings

// 3
const index = accounts.findIndex(
  acc => acc.username === currentAccount.username
);
// console.log(index);
// the findIndex() method will return the index of the first element that matches the condition,
// it is like the indexOf() method but indexOf just verifies if a certain element exists in the array
//  or not but the findIndex() method verifies a complex boolean expression to find the index
//  and return it

// 4
// the splice() method actually mutates the actual array , so we dont have to sauvegarde the result

// 5
/*to removefocus: 
inputCloseUsername.value = inputClosePin.value = '';
inputClosePin.blur();*/

// 6
const capitalize = str => str[0].toUpperCase() + str.slice(1);
// All numbers in JS are represented as floating numbers no matter what , even if you specified that they are integers.

// 7 (random number betwenn 1 et 6)
console.log(Math.trunc(Math.random() * 6) + 1); //previous project exeample

// 8
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
//0......1 => 0......(max - min) => min......(max - min + min) <=> min......max

// 9
console.log((2.345).toFixed(2)); //2.35
console.log(+(2.345).toFixed(2)); //2.35

// thsese decimal numbers are primitives(dont have methods) and they get methods called on them,
//  so what JS do is that it do 'boxing' behind the scenes => transform this primitive to a
// number object and apply the method on them, and after retransform them to primtives once again
