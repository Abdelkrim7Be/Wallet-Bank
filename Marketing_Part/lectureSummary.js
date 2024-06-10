'use strict';

// SELECTING
// Selecting the document element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); //Returning a Node list
console.log(allSections);

document.getElementById('section--1');
//Returns all the buttons
const allButtons = document.getElementsByTagName('button'); //Returns HTMLCollection
// HTMLCollection is basically like a live collection that changes immediatly when a change occurs on the DOM even tho
// it is stored in a variable before the action is taken
// however, NodeList doesnt update live when some action is taken on The DOM
console.log(allButtons);

console.log(document.getElementsByClassName('btn')); // returns HTMLCollection

// CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it!</button>';
header.prepend(message); //prepending adds this as the first child of the header
header.append(message); //prepending adds this as the lasst child of the header
//==>the reason why just one elemnt is displayed is that t is a live elemnt in the dom so , it cannot be in multiple places
// at the same time
header.append(message.cloneNode(true)); // This lets you make a clone of this DOM element as well as
//  its children(due to true passed)

// Insert as a sibling to the header
header.before(message);
header.after(message);


// DELETING ELEMENTS
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    // message is already stored in that variable , no need to select it again
    message.remove();
    // message.parentElement.removeChild(message);
})



