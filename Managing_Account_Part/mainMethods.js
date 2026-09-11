'use strict';

import { account1, accounts } from './data.js';

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

account1.movementsDates = account1.movementsDates.map(date =>
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
  containerMovements.innerHTML = '';

  const movs = acc.movements.map((movement, index) => ({
    movement,
    date: acc.movementsDates[index],
  }));
  if (sort) movs.sort((a, b) => a.movement - b.movement);

  movs.forEach(function ({ movement, date }, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const displayDate = formatMovementsDate(new Date(date), acc.locale);

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
  /* Rendering with afterbegin keeps the newest movement at the top. */
};

export const createUsernames = function (accs) {
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
  const formatBalance = formatCurrency(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formatBalance;
};

export const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const formatIncome = formatCurrency(incomes, acc.locale, acc.currency);
  labelSumIn.textContent = formatIncome;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formatOuts = formatCurrency(out, acc.locale, acc.currency);
  labelSumOut.textContent = formatCurrency(out, acc.locale, acc.currency);

  const interests = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
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

export const startLogoutTimer = function () {
  let time = 600;

  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log In To Get Started!`;
      containerApp.style.opacity = 0;
    }

    --time;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

createUsernames(accounts);
