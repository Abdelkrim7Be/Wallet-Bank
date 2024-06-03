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

let initialAccount = account1;
const movements = initialAccount.movements;

export const displayMovements = function (acc, sort = false) {
  // But we should empty the entire container , and only then, we should start adding new elements :
  containerMovements.innerHTML = '';
  // innerHTML is like textContent, the differenece is textContent returns the text inside the wanted element
  // and innerHTML returns you everythings including the html

  // sorting the array of movements
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

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
  /**So with beforeend, the order of the movements would be inverted. And that's because each new element
   * would simply be added after the previous one. So at the end of the container, right?
   * And so that's after all the child elements that are already in there.
   * And that's why I wanted it to be the other way around
   * because like this (using 'afterbegin'), it will always be basically appended
   * to all the other children. So any new child element will appear before all the other child elements
   * that were already there. */
};

export const createUsernames = function (accs) {
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

export const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = balance + "";
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`;
  // Label is something we wanna put a text in it
  // we use in it oftently textContent f label
};

export const calcDisplaySummary = function (acc) {
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
      //console.log(arr); //[2.4, 5.4, 36, 0.84, 15.6]
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interests.toFixed(2)}€`;
};

export const updateUI = function (acc) {
  displayMovements(acc);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

createUsernames(accounts);
