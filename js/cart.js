const cartContainer = document.querySelector("#cart__container");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
const emptyCartButton = document.querySelector("#button__emptyCart");
let cartTotalAmount = document.querySelector("#cart__total");

function displayCart() {
  cartContainer.innerHTML = "";
  cartProducts.forEach((product) => {
    const cartProductsCard = document.createElement("div");
    /* For each newly created div, I will assign the corresponding class to make sure that the CSS properties are assigned */
    cartProductsCard.classList.add("cartProducts__card");
    /* Within each newly created div, I will add all the necessary information to be displayed in the card */
    let totalPerProduct = new Intl.NumberFormat("de-DE").format(
      product.price * product.quantity
    );
    let cartProductPriceFormatted = new Intl.NumberFormat("de-DE").format(
      product.price
    );
    cartProductsCard.innerHTML = `
        <img src="${product.image}" class="cartProducts__card__image" alt="${product.name}" />              
        <h3 class="cartProducts__card__title">${product.name}</h3>
        <p class="cartProducts__card__price">Price: $${cartProductPriceFormatted}</p>
        <p class="cartProducts__card__quantity">Quantity: ${product.quantity}</p>
        <p class="cartProducts__card__total">Total: $${totalPerProduct}</p>`;

    /* Each newly created div with the corresponding information & style should now be included in the HTML in the cart's container */
    cartContainer.append(cartProductsCard);

    calculateTotalCartAmount(cartProducts);
  });
}

displayCart();

/* Empty Cart event listener */

emptyCartButton.addEventListener("click", () => {
  localStorage.removeItem("cartProducts");
  cartContainer.innerHTML = "";
});

function calculateTotalCartAmount(cartProducts) {
  let total = cartProducts.reduce(
    (acc, producto) => acc + producto.quantity * producto.price,
    0
  );
  let totalFormatted = new Intl.NumberFormat("de-DE").format(total);
  console.log(totalFormatted);

  cartTotalAmount.innerHTML = `Total Cart: $${totalFormatted}`;
}
