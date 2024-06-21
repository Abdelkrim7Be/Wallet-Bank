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

// Menu fade animation
// Passing Aguments to event handelers
// Again , using event Delegation

/**there is no such difference between mouseover(opposite is : mouseout) and mouseenter(opposite is : mouseleave),
 * the tiny difference is that mouseeneter doesn't bubble
 */
const nav = document.querySelector('.nav'); // we wanted to deal with the logo too that's why we went up to the nav

const handleHover = function (e, opacity) {
  // We didn't use closest() method here is simply because we don't have any child element of the link that we
  // could accidently click on
  console.log(e.currentTarget);
  console.log(this); //the opacity
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

/**The problem is that the 'addEventListener' expects a function passed in it , not a call of a function,
 * That's why we thought of calling aour function inside a function , which will be called immediatly after the 1st one
 */
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5)
// });

// to remove the fade-out effect after we remove the cursor of the navbar
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// other way of doing it
//We use the bind() method to pass an argument in a handler function
// A handler function can only have 1 argument ONLY
nav.addEventListener('mouseover', handleHover.bind(0.5));

// to remove the fade-out effect after we remove the cursor of the navbar
nav.addEventListener('mouseout', handleHover.bind(1));

// The intersection Observer API

const headerr = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  // like entries[0]
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // A box of x pixels that will be applied outside the target
  rootMargin: `-${navHeight}px`, //The navigation will be triggered 90px before the threshold reaches
});
headerObserver.observe(headerr);

// Reveal sections
// These params , u can give them any name
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // Unobserve
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, ///viewport
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading Images

/**In my img folder, each picture has 2 variaties : one normal one lazy , as we scroll to
 * the targeted section , we replace the lazy picture which is too small and ambigue to the
 * original one by removing the class 'lazy-img" (filter of blur)
 * : src="..../x-lazy.jpg" data-src="...../x.jpg"
 */

const imgTargets = document.querySelectorAll('img[data-src]'); //selecting imgs having
// as a property : data-src="....."
// console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  // replace the source attribute with the data-src attribute
  entry.target.src = entry.target.dataset.src; //dataset is where our special dta properties are stored
  // Remove the filter
  // entry.target.classList.remove('lazy-img'); ====> won't work , because:
  /**It's tricky here, thsi replacing of the source happens behind the scenes , JS finds the
   * image that shoudl load and diplay behind the scenes , and once it finished loading
   * it would EMIT the load event (that we can listen for it)
   */
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // We need to load the imgs a little befire we reach them , so that it doesn't appear
  // we are doing the lazy loading
  rootMargin: '+200px',
});

imgTargets.forEach(img => imgObserver.observe(img));



// Slider
// To not pollute the global namespace
const slider = function () {
  // Variables
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const maxSlide = slides.length; //nodeList
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
      // data-slide="${i}" so that we could move exactly to that slide
    });
  };

  const activateDot = function (slide) {
    // you should jkeep it here, otherwise it won't work due to the fact that the selection
    // of the dots happens AFTER the creation of the dots and not before it
    const allDots = document.querySelectorAll('.dots__dot');
    allDots.forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  /**N.B : Its the slides that move , not the button or the viewport Lol */

  // Next Slide
  /** intial state : 0% 100% 200 % 300%
   * after a right click : -100% 0% 100% 200%
   * after a right click : -200% -100% 0% 100%
   * so on....
   */
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      ++currentSlide;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Previous Slide
  /** intial state : 0% 100% 200 % 300%
   * after a left click : -300% -200% -100% 0%
   * after a left click : -200% -100% 0% 100%
   * so on....
   */
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      --currentSlide;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    activateDot(0); //when we reload the page , the dot is white on the first slide
    goToSlide(0); //0% 100% 200% 300% : Because each of them is 100% width , so we move by 100
  };

  init();

  // Event Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    // Using short circuiting Lol
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // const { slide } = e.target.dataset.slide; both 'slide' are the same => destructuring
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();