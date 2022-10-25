const headerMenu = document.querySelector(".header-menu");

const menuIcon = document.querySelector(".header-menu-icon");

let isMenuOpen = false;

let mobileMenuDom;

const createMobileMenu = () => {
  mobileMenuDom = document.createElement("div");
  console.log(mobileMenuDom);
  mobileMenuDom.classList.add("mobile-menu");
  mobileMenuDom.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  mobileMenuDom.append(headerMenu.querySelector("ul").cloneNode(true));
  headerMenu.append(mobileMenuDom);
};

const openMenu = () => {
  if (!mobileMenuDom) {
    createMobileMenu();
  }
  mobileMenuDom.classList.add("open");
};

const closeMenu = () => {
  mobileMenuDom.classList.remove("open");
};

const toggleMobileMenu = (event) => {
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
  isMenuOpen = !isMenuOpen;
};

menuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

// Nous récupérons les clics sur window pour fermer le menu.
window.addEventListener("click", () => {
  if (isMenuOpen) {
    toggleMobileMenu();
  }
});

window.addEventListener("resize", (event) => {
  if (window.innerWidth > 480 && isMenuOpen) {
    toggleMobileMenu();
  }
});
