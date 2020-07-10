'use strict';

class LinkActive {
  constructor({
    menuLinks, 
    targets, 
    activeClass, 
    firstScreen = true
  }) {
    this.menuLinks = document.querySelectorAll(menuLinks);
    this.targets = document.querySelectorAll(targets);
    this.activeClass = activeClass;
    this.firstScreen = firstScreen;
  }

  init() {
    this.scrollWindow();
  }

  addActiveClass() {
    let scroll = window.pageYOffset;

    for (let i = 0; i < this.targets.length; i++) {
      if (scroll >= this.targets[i].getBoundingClientRect().top + scroll - 5) {
        for (let anchor of this.menuLinks) {
          anchor.classList.remove(this.activeClass);
        }

        this.menuLinks[i].classList.add(this.activeClass);
      }
    }

    if (!this.firstScreen) {
      if (scroll < this.targets[0].getBoundingClientRect().top + scroll - 5) {
        this.menuLinks[0].classList.remove(this.activeClass);
      }
    }
  }

  scrollWindow() {
    window.addEventListener('scroll', this.addActiveClass.bind(this));
  }
}

/* 

Usage example:

const activeAnchor = new LinkActive({
  menuLinks: '.menu-bar__link',
  targets: 'section',
  activeClass: 'menu-bar__link_active',
  firstScreen: false
});

activeAnchor.init(); 

*/