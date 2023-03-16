// SELECT ELEMENTS
const add = document.querySelectorAll('.add');
const subtotal = document.querySelector('.subtotal');
const tax = document.querySelector('.tax');
const price = document.querySelector('.price');
const total = document.querySelector('.totalSum');
const cartSummary = document.querySelector('.cart-summary');
const empty = document.querySelector('.empty');

const menuItems = [
  {
    name: 'French Fries with Ketchup',
    price: 223,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 0,
  },
  {
    name: 'Salmon and Vegetables',
    price: 512,
    image: 'plate__salmon-vegetables.png',
    alt: 'Salmon and Vegetables',
    count: 0,
  },
  {
    name: 'Spaghetti Meat Sauce',
    price: 782,
    image: 'plate__spaghetti-meat-sauce.png',
    alt: 'Spaghetti with Meat Sauce',
    count: 0,
  },
  {
    name: 'Bacon, Eggs, and Toast',
    price: 599,
    image: 'plate__bacon-eggs.png',
    alt: 'Bacon, Eggs, and Toast',
    count: 0,
  },
  {
    name: 'Chicken Salad with Parmesan',
    price: 698,
    image: 'plate__chicken-salad.png',
    alt: 'Chicken Salad with Parmesan',
    count: 0,
  },
  {
    name: 'Fish Sticks and Fries',
    price: 634,
    image: 'plate__fish-sticks-fries.png',
    alt: 'Fish Sticks and Fries',
    count: 0,
  },
];

let subtotalNum, taxNum, totalNum;

// CART ARRAY
let cart = JSON.parse(localStorage.getItem('CART')) || [];
updateCart();

cart.forEach((item) => {
  for (btn of add) {
    if (btn.id === item.id) {
      inCart(btn);
    }
  }
});

//ADD TO CART
function addToCart(e) {
  let id = e.target.id;
  menuItems[id].count++;
  inCart(e.target);

  cart.push({
    ...menuItems[id],
    id: id,
  });

  updateCart();
}

//DISABLE BUTTONS
function inCart(button) {
  button.classList.remove('add');
  button.classList.add('in-cart');
  button.innerHTML = '<img src="images/check.svg" alt="Check" /> In Cart';
}

//RENDER cART ITEMS
function renderCart() {
  empty.innerHTML = '<h1>Your Cart</h1>';

  cartSummary.innerHTML = '';

  cart.forEach((item) => {
    let menuItem = document.createElement('div');

    let price = +item.price / 100;

    menuItem.innerHTML = `
  <li>
          <div class="plate">
            <img src="images/${item.image}" alt="${item.name}" class="plate" />
            <div class="quantity" data-item = "${item.id}">${item.count}</div>
          </div>
          <div class="content">
            <p class="menu-item">${item.name}</p>
            <p class="price">$${price}</p>
          </div>
          <div class="quantity__wrapper">
            <button class="decrease" data-item = "${item.id}">
              <img src="images/chevron.svg" />
            </button>
            <div class="quantity" data-item = "${item.id}">${item.count}</div>
            <button class="increase" data-item = "${item.id}" >
              <img src="images/chevron.svg" />
            </button>
          </div>
          <div class="subtotal">
          $${price}
          </div>
        </li>
  `;

    const increase = menuItem.querySelector('.increase');
    const decrease = menuItem.querySelector('.decrease');

    increase.addEventListener('click', changeCount);
    decrease.addEventListener('click', changeCount);

    cartSummary.appendChild(menuItem);
  });
}

//CHANGE NUMBER OF UNITS
function changeCount(e) {
  let elementClicked = e.currentTarget;
  let id = elementClicked.dataset.item;

  const quantity = document.querySelectorAll('.quantity');
  cart.forEach((item) => {
    if (item.id === id && elementClicked.classList.contains('increase')) {
      item.count++;
    }
    if (item.id === id && elementClicked.classList.contains('decrease')) {
      item.count--;
    }

    if (item.count === 0) {
      cart = cart.filter((item) => item.id !== id);
      alert('Menu item will be removed from the cart');

      menuItems[id].count = 0;

      const inCart = document.querySelectorAll('.in-cart');
      inCart.forEach((btn) => {
        if (btn.id === item.id) {
          btn.classList.add('add');
          btn.classList.remove('in-cart');
          btn.innerHTML = 'Add to Cart';
          btn.addEventListener('click', addToCart);
        }
      });
    }

    //Update quantity
    quantity.forEach((arrow) => {
      if (arrow.dataset.item === item.id) {
        arrow.innerHTML = `${item.count}`;
      }
    });
  });

  updateCart();
}

//UPDATE CART
function updateCart() {
  renderCart();
  countTotals();

  // save cart to local storage
  localStorage.setItem('CART', JSON.stringify(cart));
}

//CALCULATE TOTALS
function countTotals() {
  subtotalNum = 0;
  taxNum = 0;
  cart.forEach((item) => {
    subtotalNum = subtotalNum + (item.count * item.price) / 100;
  });

  taxNum = taxNum + subtotalNum * 0.0975;
  totalNum = taxNum + subtotalNum;

  subtotal.innerHTML = `$${subtotalNum.toFixed(2)}`;
  tax.innerHTML = `$${taxNum.toFixed(2)}`;
  total.innerHTML = `$${totalNum.toFixed(2)}`;
}

//EVENT LISTENERS
add.forEach((btn) => {
  btn.addEventListener('click', addToCart);
});
