// проверка поддержки webp, добавление класса webp или no-webp для html
export function isWebp() {
    function testWebP(callback) { // проверка поддержки webp
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    // добавление класса _webp или _no_webp для html    
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

const body = document.body
const menu = document.querySelector('.header__nav')
const mobileClose = document.querySelector('.nav__close')
const burger = document.querySelector('.nav__burger')

if (burger) {
  burger.addEventListener('click', () => {
      menu.classList.toggle('show')
      body.classList.toggle('stop-scroll')
  })
}

if (mobileClose) {
  mobileClose.addEventListener('click', () => {
      menu.classList.toggle('show')
      body.classList.toggle('stop-scroll')
  })
}
