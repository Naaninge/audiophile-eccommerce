import getElement from "./getElement.js";
import fetchData from "./fetchProducts.js";
import { setStorage, getFromStorage } from "./cart.js";
import { url ,openCart} from "../app.js";



// add to cart on page product
const addBtn = getElement(".add");
const increase = getElement(".page-product .increase");
const decrease = getElement(".page-product .decrease");
const showQuantity = getElement(".page-product .amount");

// increase , decrease btns for products
let myCount = 1

increase.addEventListener("click", (e) => {
  myCount += 1;
  showQuantity.textContent = myCount;
});

decrease.addEventListener("click", (e) => {
  myCount -= 1;
  if (myCount > 0) {
    showQuantity.textContent = myCount;
  }
});


addBtn.addEventListener("click", async (e) => {
  const id = e.currentTarget.dataset.id;
  // fetch products from data.json
  const products = await fetchData(url);
  // find item based on id
  let cartItem = findProduct(products, id)
  
  const quantity = parseInt(showQuantity.textContent)

  
  // check if item already in cart
  let cart = getFromStorage("cart")
  const findCartItem = findProduct(cart, id)
  console.log(findCartItem);
  if (findCartItem) {
    console.log('item in cart');
  } else {
    if (!isNaN(quantity) && quantity > 0) {
      cartItem = { ...cartItem, quantity: quantity };
      cart.push(cartItem);
      setStorage(cart);
      
      console.log('Item added to the cart');
    }
  }
  // show cart
  openCart();
});


function findProduct(products,id) {
  return products.find((product) => product.id == id);
}