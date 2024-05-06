import { getTotal, getFromStorage} from "./cart.js";
import getElement from "./getElement.js";
import { formatPrice, removeAll, totalQuantity } from "../app.js";
// checkout
const summaryList = getElement(".summary-list");
// const checkoutBtn = getElement('.checkout-button')
const summaryTotal = getElement(".summary-total");
const continueBtn = getElement(".continue-btn");
const shippingContainer = getElement(".shipping-total");
const vatContainer = getElement(".vat-total");
const grandTotalContainer = getElement(".grand-total");

const thankYouModal = getElement(".order-section");
const orderItems = getElement(".order-items article");
const orderTotal = getElement(".order-total p");
// const orderQuantity = getElement('.order-quantity')
const backBtn = getElement(".back-btn");
const viewLess = getElement(".quantity-text");

let cart = getFromStorage("cart");

//form validation
const form = getElement("#form");
const name = getElement("#name");
const email = getElement("#email");
const phone = getElement("#phone");
const address = getElement("#address");
const zipCode = getElement("#zip");
const country = getElement("#country");
const city = getElement("#city");
const eMoney = getElement("#e-money");
const eNumber = getElement("#e-number");
const ePin = getElement("#e-pin");
const radioBtns = document.querySelectorAll(".radio");
const cashOnCont = getElement(".cash-on");
const eMoneyCont = getElement(".e-section");
const radioCont = getElement(".radio-input");
// form submit


console.log(eMoney);

// summary calculations
const total = getTotal(cart);
const shipping = 50;
const vat = total * 0.2;
const grandTotal = total + shipping + vat;

const displayCheckout = () => {
  summaryList.innerHTML = cart
    .map((product) => {
      const {
        id,
        name,
        price,
        image: { desktop: img },
        quantity,
      } = product;

      return `<section class="summary-list-item" data-id=${id}>
            <div>
            <img src=${img} alt=${name} class="mark-two">
            <div class="cart-item-info">
              <h5>${name}</h5>
              <p class="cart-price">${price}</p>
            </div>
            </div>
            <div class="summary-item-quantity">
             <h3 class="item-quantity">${quantity}X</h3>
            </div>
          </section>`;
    })
    .join("");
  summaryTotal.textContent = `${formatPrice(total)}`;
  shippingContainer.textContent = `${formatPrice(shipping)}`;
  vatContainer.textContent = `${formatPrice(vat)}`;
  grandTotalContainer.textContent = `${formatPrice(grandTotal)}`;
};

const displayModalCart = () => {
  orderItems.innerHTML = cart
    .map((product) => {
      const {
        name,
        price,
        image: { desktop: img },
        quantity,
      } = product;

      return `<section>
              <img src=${img} alt=${name}>
              <div>
                <h4>${name}</h4>
              <p>$${price}</p>
              </div>
             
              <p>x${quantity}</p> 
            </section>`;
    })
    .join("");

  orderTotal.textContent = `${formatPrice(grandTotal)}`;
  viewLess.innerHTML = `view less`;
};

// show less
viewLess.addEventListener("click", () => {
  if (viewLess.classList.contains("quantity-text")) {
    displayModalCart();
    viewLess.classList.remove("quantity-text");
    viewLess.innerHTML = `view less`;
    // viewLess.innerHTML = ` and ${totalQuantity(cart)} items(s)`;
  } else {
    viewLess.classList.add("quantity-text");
    const {
      name,
      price,
      image: { desktop: img },
      quantity,
    } = getFromStorage("cart")[0];
    orderItems.innerHTML = `<section>
              <img src=${img} alt=${name}>
              <div>
                <h4>${name}</h4>
              <p>$${price}</p>
              </div>
             
              <p>x${quantity}</p> 
            </section>`;
    // viewLess.innerHTML = `view less`;
    viewLess.innerHTML = ` and ${totalQuantity(cart)} items(s)`;
  }
});

// error message
const wrongFormat = (inputField, message) => {
  const parent = inputField.parentElement;
  const errorDiv = parent.querySelector(".err-msg");
  const errLabel = parent.querySelector("label");
  errorDiv.textContent = message;
  errLabel.classList.add("red");
  inputField.classList.add("error-input");
};

const successFormat = (inputField, message) => {
  const parent = inputField.parentElement;
  const errorDiv = parent.querySelector(".err-msg");
  const errLabel = parent.querySelector("label");
  errorDiv.textContent = message;
  errLabel.classList.remove("red");
  inputField.classList.remove("error-input");
};

// validate input
const validateInput = () => {
  const nameInput = name.value.trim();
  const emailInput = email.value.trim();
  const phoneInput = phone.value.trim();
  const addressInput = address.value.trim();
  const zipInput = zipCode.value.trim();
  const cityInput = city.value.trim();
  const countryInput = country.value.trim();
  const eNumberInput = eNumber.value.trim();
  const pinInput = ePin.value.trim();

  const nameCheck = /^[a-zA-Z]{3,8}$/gm;
  const emailCheck = /[a-zA-Z0-9_\-\.]+[@][a-z]+[\.]{1}[a-z]{2,3}/gm;
  const phoneCheck = /^[+0-9]{13}$/gm;
  const addressCheck = /^[a-zA-z0-9,\s]+$/gm;
  const zipCheck = /^[0-9]{3,5}$/gm;
  const cityCheck = /^[a-zA-z\s]+$/gm;
  const countryCheck = /^[a-zA-z\s]{4,}$/gm;
  const eNumberCheck = /^[0-9]{8}$/gm;
  const pinCheck = /^[0-9]{4}$/gm;
 
   let allValid; 

  if (nameInput === "" || !nameCheck.test(nameInput)) {
    wrongFormat(name, "enter a valid  name!");
    allValid = false
 
  } else {
    successFormat(name, "");
    allValid = true
  }

  if (emailInput === "" || !emailCheck.test(emailInput)) {
    wrongFormat(email, "enter a valid email!");
     allValid = false;
   
  } else {
    successFormat(email, "");
     allValid = true;
  }

  if (phoneInput === "" || !phoneCheck.test(phoneInput)) {
    wrongFormat(phone, "enter a valid phone number!");
     allValid = false
   
  } else {
    successFormat(phone, "");
     allValid = true
  }

  if (addressInput === "" || !addressCheck.test(addressInput)) {
    wrongFormat(address, "enter a valid address!");
     allValid = false;
   
  } else {
    successFormat(address, "");
     allValid = true;
  }
  if (zipInput === "" || !zipCheck.test(zipInput)) {
    wrongFormat(zipCode, "enter a valid zip code!");
     allValid = false;
   
  } else {
    successFormat(zip, "");
     allValid = true;
  }
  if (cityInput === "" || !cityCheck.test(cityInput)) {
    wrongFormat(city, "enter a valid city!");
     allValid = false;
   
  } else {
    successFormat(city, "");
     allValid = true;
  }
  if (countryInput === "" || !countryCheck.test(countryInput)) {
    wrongFormat(country, "enter a valid country!");
     allValid = false;
    
  } else {
    successFormat(country, "");
     allValid = true;
  }

  if (eMoney.checked) {
    if (eNumberInput === "" || !eNumberCheck.test(eNumberInput)) {
      wrongFormat(eNumber, "enter a valid e-number!");
      allValid = false;
      
    } else {
      successFormat(eNumber, "");
      allValid = true;
    }
    if (pinInput === "" || !pinCheck.test(pinInput)) {
      wrongFormat(ePin, "enter a valid pin!");
      allValid = false;
   
    } else {
      successFormat(ePin, "");
      allValid = true;
    }
  }


  if (allValid === true) {
    thankYouModal.classList.remove("hide");
  }
  
};

// change this to submit !!!!!!!!!
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
});



// radio button
radioBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parent = e.target.parentElement;
    const eMoneyBtn = radioCont.querySelector("#e-money");
    const cashBtn = radioCont.querySelector("#cash");

    // if cash is clicked, hide e-pin section
    if (btn.dataset.id === "cash") {
      cashOnCont.classList.remove("hide");
      eMoneyCont.classList.add("hide");
      

      eMoneyBtn.parentElement.classList.remove("active-color");
      eMoneyBtn.checked = false;

      // add background on click and handle the checked property
      if (!parent.classList.contains("active-color")) {
        parent.classList.add("active-color");
        cashBtn.checked = true;
      } else {
        parent.classList.remove("active-color");
        btn.checked = false;
        cashOnCont.classList.add("hide");
        eMoneyCont.classList.remove("hide");
        eMoneyBtn.checked = false;
      }
    } else if (btn.dataset.id === "e-money") {
      // remove cash on delivery option and add e-money option
      cashOnCont.classList.add("hide");
      eMoneyCont.classList.remove("hide");

      cashBtn.parentElement.classList.remove("active-color");
      cashBtn.checked = false;

      // add background on click and handle the checked property
      if (!parent.classList.contains("active-color")) {
        parent.classList.add("active-color");
        eMoneyBtn.checked = true;
      } else {
        parent.classList.remove("active-color");
        btn.checked = false;
      }
    }
  });
});

// remove items from cart  after checkout

backBtn.addEventListener("click", () => {
  removeAll();
});

displayCheckout();
displayModalCart();
