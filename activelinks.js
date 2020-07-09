'use strict';

class LinkActive {
  constructor({
    menuLinks, 
    targets, 
    activeClass, 
    offset = 0, 
    firstScreen = true
  }) {
    this.menuLinks = document.querySelectorAll(menuLinks);
    this.targets = document.querySelectorAll(targets);
    this.activeClass = activeClass;
    this.offset = offset;
    this.firstScreen = firstScreen;
  }

  init() {
    this.scrollWindow();
  }

  addActiveClass() {
    let scroll = window.pageYOffset;

    for (let i = 0; i < this.targets.length; i++) {
      if (scroll >= this.targets[i].offsetTop - this.offset) {
        for (let anchor of this.menuLinks) {
          anchor.classList.remove(this.activeClass);
        }

        this.menuLinks[i].classList.add(this.activeClass);
      }
    }

    if (!this.firstScreen) {
      if (scroll < this.targets[0].offsetTop) {
        this.menuLinks[0].classList.remove(this.activeClass);
      }
    }
  }

  scrollWindow() {
    window.addEventListener('scroll', this.addActiveClass.bind(this));
  }
}