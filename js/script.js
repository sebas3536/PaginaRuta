/********************************************* */
class Accordion{
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('.faq-content');
    this.expandIcon = this.summary.querySelector('.expand-icon')
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute('src', 'img/plus.svg');
      return this.onAnimationFinish(false);
    }
    this.animation.oncancel = () => {
      this.expandIcon.setAttribute('src', 'img/plus.svg');
      return this.isClosing = false;
    }
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + 
                         this.content.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 350,
      easing: 'ease-out'
    });

    this.animation.onfinish = () => {
      this.expandIcon.setAttribute(
          'src',
          'img/minus.svg'
      );
      return this.onAnimationFinish(true);
    }
    this.animation.oncancel = () => {
      this.expandIcon.setAttribute(
          'src',
          'assets/minus.svg'
      );
      return this.isExpanding = false;
    }
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});
/********************************************/
"use strict";
// common idea: https://dribbble.com/shots/20364660-Nibble-Health-Identity-Social-Posting
// carousel animation: https://codepen.io/aija/details/xvXWoK
let CHECKED = false;
document.addEventListener("pointerdown", (e) => {
    CHECKED = !CHECKED;
    document.documentElement.style.setProperty("--light", CHECKED ? 1 : 0);
});
/******************************************* */
const toggleMenuOpen = () => document.body.classList.toggle("open");
/******************************************************/ 
const toggleMenu = () => {
  const navigation = document.querySelector('.navigation');


  const burgerMenu = document.querySelector(".menu-icon");
  const src = burgerMenu.getAttribute('src');

  const isBurger = src === 'img/burger-menu.svg';

  const iconName = isBurger ?
      'img/close.svg'
      :
      'img/burger-menu.svg"';


  burgerMenu.setAttribute(
      'src',
      iconName
  );

  if (!isBurger) {
      navigation.classList.add("navigation--mobile--fadeout");
      setTimeout(() => {
          navigation.classList.toggle(
              'navigation--mobile'
          );
      }, 300)
  } else {
      navigation.classList.remove("navigation--mobile--fadeout");
      navigation.classList.toggle(
          'navigation--mobile'
      );
  }
};