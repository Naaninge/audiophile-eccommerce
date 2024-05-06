import getElement from "./js/getElement.js";
import { displayCart } from "./js/cart.js";
import fetchData from "./js/fetchProducts.js";

const url = './data.json';


// Change the year to the current year
const yearDOM = getElement('.year');
const date = new Date().getFullYear();
const radioBtns = document.querySelectorAll('.radio')
//cart 
const cartContainer = getElement(".cart-menu");
const cartBtn = getElement(".nav-cart");



// setting year in footer to current year
yearDOM.textContent = date;

//toggle cart
cartBtn.addEventListener("click", () => {
    displayCart();
    cartContainer.classList.toggle("hide");
});

// add to cart


// Checkout







// const speakerURL = './'

// console.log(window.location.search);

// const displayHome = (products) => {

//     const allProducts = [...products]

//     // allProducts.forEach(product => {
//     //     console.log(product);
//     // })
// }

// const util = async () => {
//     const data = await fetchData(url)
//     displayHome(data)
//     displayCart()
   
    
// }

// util(url)


radioBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const parent = e.target.parentElement
        parent.classList.toggle('active-color')
        const paymentType = e.target.dataset.id
        
    });
})


// Checkout


export {
    url,
    cartContainer
}
