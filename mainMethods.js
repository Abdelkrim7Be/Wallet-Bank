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

export const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  fractionalSecondDigits: 3,
});

export const formatToISOString = date => {
  const parts = formatter.formatToParts(new Date(date));
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  const hour = parts.find(p => p.type === 'hour').value;
  const minute = parts.find(p => p.type === 'minute').value;
  const second = parts.find(p => p.type === 'second').value;
  const fractionalSecond = parts.find(p => p.type === 'fractionalSecond').value;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${fractionalSecond}Z`;
};

export const formatCurrency = (value, locale, currency) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);

let initialAccount = account1;
const movements = initialAccount.movements;

initialAccount.movementsDates = initialAccount.movementsDates.map(date =>
  formatToISOString(date)
);

export const formatMovementsDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

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

    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formatMovement = formatCurrency(movement, acc.locale, acc.currency);

    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatMovement}</div>
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
  const formatBalance = formatCurrency(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formatBalance;
  // Label is something we wanna put a text in it
  // we use in it oftently textContent f label
};

export const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const formatIncome = formatCurrency(incomes, acc.locale, acc.currency);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatIncome;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formatOuts = formatCurrency(out, acc.locale, acc.currency);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCurrency(out, acc.locale, acc.currency);

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr); //[2.4, 5.4, 36, 0.84, 15.6]
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCurrency(
    interests,
    acc.locale,
    acc.currency
  );
};

export const updateUI = function (acc) {
  displayMovements(acc);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

createUsernames(accounts);
