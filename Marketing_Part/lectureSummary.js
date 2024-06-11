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
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message is already stored in that variable , no need to select it again
    message.remove();
    // message.parentElement.removeChild(message);
  });

//STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.height) ==>  nothing
console.log(message.style.backgroundColor); //rgb(55, 56, 61)
/**So basically here, we set styles in an inline form, and when we try to read the style , we could only read the inline
 * ones , not the ones in the files
 * BUT :
 */

// It could show all the computed style of an element in our application ,
//  but u should specify the property to make it short
console.log(getComputedStyle(message).color);

// Change the height of the message (we parse the number because it is a string '485.23px')
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// It is imperative to use setProperties when dealing with costumed properties
document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
// Only for standard properties
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt); //Beautiful minimalist logo

// Non standard
console.log(logo.designer); //not working
console.log(logo.getAttribute('designer')); //Not working

logo.setAttribute('company', 'VaultWise'); //company="VaultWise"

// Absolute vs relative
console.log(logo.src, logo.getAttribute('src')); //http://127.0.0.1:5500/img/logo.png     img/logo.png

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //127.0.0.1:5500/index.html#
console.log(link.getAttribute('href')); // #

// Data Attributes
// data-version-number="3.0"
console.log(logo.dataset.versionNumber); //camel case for he version number
// 3.0

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use
logo.className = 'classkk'; // it will override all the classes of this element

// Knowing the coordinates of an element en relation with the border
console.log(e.target.getBoundingClientRect());
/**DOMRect {x: 30, y: 528.375, width: 110, height: 27.600000381469727, top: 528.375, …}
bottom
: 
555.9750003814697
height
: 
27.600000381469727
left
: 
30
right
: 
140
top
: 
528.375
width
: 
110
x
: 
30
y
: 
528.375
[[Prototype]]
: 
DOMRect */

console.log(s1coords);
// DOMRect {x: 0, y: 672.7999877929688, width: 914.4000244140625, height: 1652.5, top: 672.7999877929688, …}
console.log(
  'height/width viewport',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);

console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); //the distance between the current
// position (the view port ) and the top of the page

// Current position + current scroll
window.scrollTo(
  s1coords.left + window.pageXOffset,
  s1coords.top + window.pageYOffset
);
// The reason why when you click the second time on the button to go to the desired position it won't work
// it is because the top and left positions are relative to the viewport , when you are already there ,there is no point
// to go again when you are already there hhhhh


// (Current position + current scroll)

  // The old way
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

