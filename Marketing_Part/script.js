'use strict';

////////////////////////////////////////////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const h1 = document.querySelector('h1');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');
const section1 = document.querySelector('#section--1');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const allNavLinks = document.querySelectorAll('.nav__link');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it!</button>';
// header.before(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  // Element.getBoundingClientRect() retourne un objet DOMRect fournissant des informations sur la taille d'un
  //  élément et sa position relative par rapport à la zone d'affichage.
  const s1coords = section1.getBoundingClientRect();
  // Scrolling
  // The modern way
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Page navigation

// Event Delegation (2 steps)
// 1.Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // I need now a matching strategy : to target only the element that i'm interested in , not some kind of border hhh
  // Matching strategy (a pretty hard technic)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Building a Tabbed component
// ===> Use the even Delegation
tabsContainer.addEventListener('click', function (e) {
  // The matching part
  const clicked = e.target.closest('.operations__tab');
  /**So basiclly here, the problem was when we had e.target , it returns us sometimes the span inside the button ,
   * not the button itself , and when we did : e.target.parentElement, it returns us the parent of the button (container)
   * when we click on the button , and since, the closest() method is benefic in event Delegation , we'll use it
   */
  console.log(clicked);

  // A Guard Clause (more modern than if(clicked))
  if (!clicked) return;

  // Removing active classes (usual stuff)
  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(tc => {
    tc.classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');

  // Activate content Area
  /**The trick here is in tabes, there is a property which is : data-tab = x, so based on that x , we will compare
   * and choose the appropriate content to show based on the class opperations__content--x
   */
  // dataset.tab ==> the part after data- is tab

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  /**The trick in css is this :
   * .operations__content {
   *  display: none;
   * font-size: 1.7rem;
   * padding: 2.5rem 7rem 6.5rem 7rem;
   * }
   * .operations__content--active {
   * display: grid;
   * grid-template-columns: 7rem 1fr;
   * column-gap: 3rem;
   * row-gap: 0.5rem;
   * }
   */
});
