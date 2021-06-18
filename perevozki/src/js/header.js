const pageBody = document.querySelector('body');
const startScreen = document.querySelector('.start-screen');
const header = document.querySelector('.header');
const headerBurger = header.querySelector('.burger-menu');
const headerMenu = header.querySelector('.header__menu');
const footer = document.querySelector('.footer');

const menuLinksDropDown = header.querySelectorAll('.menu__link_dropdown');
const menuListsDropDown = header.querySelectorAll('.menu__list_dropdown');
const menuLinkIcons = header.querySelectorAll('.menu__link-icon');


window.onscroll = function () {
  fixedHeader();
};

const fixedHeader = function () {
  let headerHeight = header.offsetHeight;

  if (window.pageYOffset > 100) {
    header.classList.add('header_fixed');
    pageBody.style.paddingTop = headerHeight + 'px';
  } else {
    header.classList.remove('header_fixed');
    pageBody.style.paddingTop = '0';
  }
}

const openHeaderMenu = function () {
  headerBurger.classList.toggle('burger-menu_opened');
  headerMenu.classList.toggle('header__menu_opened');
  pageBody.classList.toggle('no-scroll');
};

headerBurger.addEventListener('click', function () {
  openHeaderMenu();
});


//openMenuList

const getClickedLink = function () {
  let menuLinkDropDown;
  let menuListDropDown;

  const onMenuListEscPress = function (evt) {
    if (evt.key === 'Escape') {
      hideMenuList();
    }
  };

  const onMenuListClick = function (evt) {
    const target = evt.target;
    if (target !== menuListDropDown || target !== menuListDropDown) {
      hideMenuList();
    }
  };

  const showMenuList = function () {
    menuListDropDown.classList.toggle('menu__list_show');
    menuLinkIcon.classList.toggle('menu__link-icon_rotate');
    document.addEventListener('keydown', onMenuListEscPress);
    document.addEventListener('click', onMenuListClick);
  };

  const hideMenuList = function () {
    menuListDropDown.classList.remove('menu__list_show');
    menuLinkIcon.classList.remove('menu__link-icon_rotate');
    document.removeEventListener('keydown', onMenuListEscPress);
    document.removeEventListener('click', onMenuListClick);
  };


  for (let i = 0; i < menuLinksDropDown.length; i++) {
    menuLinkDropDown = menuLinksDropDown[i];
    menuListDropDown = menuListsDropDown[i];
    menuLinkIcon = menuLinkIcons[i];

    menuLinkDropDown.addEventListener('click', function (evt) {
      evt.stopPropagation();
      showMenuList();
    });
  }
}

getClickedLink();














