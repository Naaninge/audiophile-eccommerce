import getElement from "./js/getElement.js";
import {
  getFromStorage,
  getTotal,
  setStorage,
  findQuantity,
} from "./js/cart.js";

const url = "./data.json";
let cart = getFromStorage("cart");

//cart
const cartContainer = getElement(".cart-menu");
const cartBtn = getElement(".nav-cart");
const cartTotal = getElement(".cart-total");
const cartQuantity = getElement(".cart-quantity");
const remove = getElement(".remove-all");
const cartCont = getElement(".cart-list");

// menu
const removeSideMenu = getElement(".remove-menu");
const showMenu = getElement(".menu-btn");
const sideMenu = getElement(".side-menu");

// Change the year to the current year
const yearDOM = getElement(".year");
const date = new Date().getFullYear();
// setting year in footer to current year
yearDOM.textContent = date;

//Open cart
const openCart = () => {
  displayCart();
  cartContainer.classList.remove("hide");
};

// Display cart
function displayCart() {
  // get items from localStorage
  const products = getFromStorage("cart");
  cartCont.innerHTML = `<h2>Cart Empty</h2>`;
  cartTotal.textContent = `$ 0`;

  // check if product exists
  if (products) {
    const cartItems = products
      .map((product) => {
        const {
          id,
          name,
          price,
          image: { desktop: img },
          quantity,
        } = product;
        return `<section class="cart-list-item" data-id = "${id}">
            <div>
            <img src=${img} alt=${name} class="mark-two">
            <div class="cart-item-info">
              <h5>${name}</h5>
              <p class="cart-price">$ ${price}</p>
            </div>
            </div>
            <div class="cart-increase-decrease">
              <button class="btn add-minus-btn">
              <span class="decrease" data-label="decrease">-</span>
              <span class="amount">${quantity}</span>
              <span class="increase"  data-label="increase">+</span>
            </button>
            </div>
          </section>`;
      })
      .join("");

    cartQuantity.textContent = `( ${totalQuantity(products)} )`;
    cartCont.innerHTML = cartItems;
    cartTotal.textContent = `${formatPrice(getTotal(products))}`;

    //Selecting
    const decreaseBtns = document.querySelectorAll(".decrease");
    const increaseBtns = document.querySelectorAll(".increase");

    let count;

    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id =
          e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
        count = findQuantity(id);
        // find index of item in cart
        const index = cart.findIndex((item) => {
          return item.id == id;
        });
        if (index !== -1) {
          count--;
          if (count > 0) {
            // replace quantity with count
            cart[index].quantity = count;

            setStorage(cart);
          } else {
            //remove element from cart
            const newCart = getFromStorage("cart").filter(
              (product) => product.id != id
            );
            cart = newCart;
            setStorage(newCart);
          }
        }
        displayCart();
      });
    });

    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id =
          e.currentTarget.parentElement.parentElement.parentElement.dataset.id;
        // update quantity
        count = findQuantity(id);
        // count += 1
        // find index of item in cart
        const index = cart.findIndex((item) => {
          return item.id == id;
        });
        if (index !== -1) {
          count++;
          if (count && count <= 20) {
            cart[index].quantity = count;
            setStorage(cart);
          }
        }
        displayCart();
      });
    });
  }
}

//toggle cart
cartBtn.addEventListener("click", () => {
  // displayCart();
  cartContainer.classList.toggle("hide");
});

const removeAll = () => {
  setStorage([]);
  displayCart();
};

// Remove Item
remove.addEventListener("click", removeAll);

function formatPrice(price) {
  let usDollars = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return usDollars.format(price);
}

// show and hide side menu

showMenu.addEventListener("click", () => {
  sideMenu.classList.remove("hide");
});

removeSideMenu.addEventListener("click", () => {
  sideMenu.classList.add("hide");
});

function totalQuantity(products) {
  const totalQty = products.reduce((totalQty, product) => {
    return totalQty + product.quantity;
  }, 0);

  return totalQty;
}

window.addEventListener("DOMContentLoaded", () => {
  displayCart();
});

export { url, cartContainer, openCart, formatPrice, removeAll, totalQuantity };
