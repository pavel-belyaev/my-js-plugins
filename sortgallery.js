'use strict';

function sortGallery(params) {
  const navList = document.querySelectorAll(params.nav);
  const wrapper = document.querySelector(params.wrap);
  const elements = document.querySelectorAll(params.elem);
  const timer = params.time;

  let pos = 0;

  const doSorting = (navElem, index) => {
    wrapper.style.display = 'flex';

    const doOpacity = () => {
      setTimeout( () => wrapper.style.opacity = 1, timer );
    };

    navElem.addEventListener('click', function() {
      if (pos == index) return;

      pos = index;
      wrapper.style.opacity = 0;

      for (let i = 0; i < navList.length; i++) {
        navList[i].classList.remove(params.activeClass);
      }

      for (let i = 0; i < elements.length; i++) {
        elements[i].style.order = 0;
      }

      if (index == 0) {
        this.classList.add(params.activeClass);

        setTimeout( () => {
          for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
          }
        }, timer - 50);

        doOpacity();
      }

      if (index > 0) {
        this.classList.add(params.activeClass);
        setTimeout(() => {
        
          for (let i = 0; i < elements.length; i++) {
            if ( +(elements[i].dataset.index) != index ) {
              elements[i].style.order = 100;
              elements[i].style.display = 'none';
            }

            if (elements[i].dataset.index == index) {
              elements[i].style.display = 'block';
              elements[i].style.order = i;
            }
          }
        }, timer - 50);

        doOpacity();
      }
    });
  };

  for (let i = 0; i < navList.length; i++) {
    doSorting(navList[i], i);
  }
}

/* 

Usage example:

sortGallery({
  nav: '.vietnam__places-item',
  activeClass: 'active-gallery-item',
  wrap: '.vietnam__places-wrapper',
  elem: '.all',
  time: 500
});

*/