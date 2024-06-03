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

import {
  displayMovements,
  createUsernames,
  calcDisplayBalance,
  calcDisplaySummary,
  updateUI,
} from './mainMethods.js';

let initialAccount = account1;
const movements = initialAccount.movements;

// Event Handelers

let currentAccount;

// Login
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and a welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // Clear input fields, and lose the focus on them
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Transfering money
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
  }
});

// Closing an account
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

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

// Requesting LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // we are gonna round down the loan value cuz its weird to have it decimal
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add the movement
    currentAccount.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
  // Clear the input field
  inputLoanAmount.value = '';
});

// Sort mechanism
let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

// whenever we click on the sort button its either gonna sort the moevements after not being sorted,
// or it is gonna non - sort them after being sorted, that's why we used the state sortedState
// to track the changes

// labelBalance.addEventListener('click', (event) => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// })
