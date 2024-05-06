
// Get localStorage
function getFromStorage(cart) {
  try {
    const myCart = localStorage.getItem(cart)
    if (myCart) {
      return JSON.parse(myCart)
    }else {
     return []
    }
  } catch (error) {
    console.error("Error parsing JSON from  storage: ", error);
    return []
  }
  
}


// Set localStorage
const setStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};



//Count Total
function getTotal(cart) {
  const cartItemsTotal = cart.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  return cartItemsTotal;
}




// find Quantity
function findQuantity(productID) {
  const product = getFromStorage("cart").find(
    (item) => item.id === parseInt(productID)
  );
  if (product) {
    
    return product.quantity;
  }


}



export {getFromStorage, setStorage,getTotal,findQuantity};
