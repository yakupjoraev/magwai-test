// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu();


// cards more load

function loadCards() {
  const cardList = document.querySelector('#cardList');
  const loadMoreBtn = document.querySelector('#loadMoreBtn');

  /* Заголовки начало  */
  const titles = ['bridge', 'Water', 'nature', '']

  function getRandomTitle() {
    const randomIndex = Math.floor(Math.random() * titles.length)
    return titles[randomIndex];
  }
  /* Заголовки конец  */

  /* картинки начало */
  const imageCount = 10;

  function getRandomImageIndex() {
    return Math.floor(Math.random() * imageCount) + 1;
  }

  /* картинки конец */

  const defaultCards = 10;
  const loadCards = 5;
  let startCards = 0;
  let maxCards = 30;

  async function load() {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/?_start=${startCards}&_limit=${startCards === 0 ? defaultCards : loadCards}`);
      const json = await response.json()
      const data = await json
      // .then((response) => response.json())
      // .then((json) => console.log(json))

      if (startCards < maxCards) {
        data.forEach(post => {
          const cardItem = document.createElement('li');
          cardItem.className = 'cards__item card';
          cardItem.innerHTML = `
              <div class="card__picture">
              <img class="card__pic" width="320" height="185" loading="lazy" src="./img/coins/${getRandomImageIndex()}.jpg" alt="coin pic">
              </div>
               <div class="card__info">
                 <h4 class="card__label">${getRandomTitle()}</h4>
                 <p class="card__text">Sed ut perspiciatis unde omnis iste natus error sit voluptatem santium doloremque laudantium, totam rem sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolo…</p>
                 <p class="card__text">Posted by <b>User</b>, on July  24, 2019</p>
               </div>
               <a class="card__btn second-btn" href="#">Continue reading</a>
             `;

          cardList.appendChild(cardItem);
          startCards++;

          if (startCards >= maxCards) {
            loadMoreBtn.style.display = 'none';
          }
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  loadMoreBtn.addEventListener('click', load)
  load();
}

loadCards();