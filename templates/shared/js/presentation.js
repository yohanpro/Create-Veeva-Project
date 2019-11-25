$(document).ready(function () {});

class MobileMenu {
  constructor() {
    this.menuIcon = $(".icon-hamburger-menu");
    this.slideMenu = $(".navbar__slideMenu");
    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleTheMenu.bind(this));
  }

  toggleTheMenu() {
    this.menuIcon.toggleClass("icon-hamburger-menu--close-x");
    this.slideMenu.toggleClass("slidemenu--expanded");
  }
}
new MobileMenu();