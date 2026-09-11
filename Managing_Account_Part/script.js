'use strict';

import { accounts } from './data.js';

import {
  labelWelcome,
  labelDate,
  labelBalance,
  labelSumIn,
  labelSumOut,
  labelSumInterest,
  labelTimer,
  labelFeedback,
  containerApp,
  containerMovements,
  loginForm,
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
  calcDisplayBalance,
  calcDisplaySummary,
  updateUI,
  startLogoutTimer,
} from './mainMethods.js';

let currentAccount, timer;
const setFeedback = (message, state = 'error') => {
  labelFeedback.textContent = message;
  labelFeedback.className = `login__feedback login__feedback--${state}`;
};

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    setFeedback('Account ready.', 'success');

    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAccount);
    return;
  }

  currentAccount = undefined;
  containerApp.style.opacity = 0;
  setFeedback('We could not match that username and PIN. Try ab / 1111.');
  inputLoginPin.select();
});


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  if (!currentAccount) {
    setFeedback('Log in before making a transfer.');
    return;
  }

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

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date());

    updateUI(currentAccount);

    clearInterval(timer);
    timer = startLogoutTimer();
    setFeedback('Transfer completed.', 'success');
    return;
  }

  setFeedback('Check the recipient, amount, and available balance.');
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (!currentAccount) {
    setFeedback('Log in before closing your account.');
    return;
  }

  const closingUsername = inputCloseUsername.value;
  const closingPin = +inputClosePin.value;

  if (
    closingPin === currentAccount.pin &&
    closingUsername === currentAccount.username
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
    setFeedback('Account closed.', 'success');
    currentAccount = undefined;
    clearInterval(timer);
    return;
  }

  setFeedback('The confirmation details do not match this account.');
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  if (!currentAccount) {
    setFeedback('Log in before requesting a loan.');
    return;
  }

  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setFeedback('Reviewing your request…', 'success');
    setTimeout(function () {
      currentAccount.movements.push(amount);

      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogoutTimer();
      setFeedback('Loan approved and added to your balance.', 'success');
    }, 2500);
  } else {
    setFeedback('Enter an eligible loan amount.');
  }
  inputLoanAmount.value = '';

});

let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  if (!currentAccount) {
    setFeedback('Log in to sort your movements.');
    return;
  }

  displayMovements(currentAccount, !sortedState);
  sortedState = !sortedState;
});
