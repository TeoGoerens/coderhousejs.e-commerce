const cartContainer = document.querySelector("#cart__container");

let cartProducts = localStorage.getItem("cartProducts");
if (cartProducts) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
} else {
  cartProducts = [];
}

let reduceItemButton;
let increaseItemButton;

const emptyCartButton = document.querySelector("#button__emptyCart");
let cartTotalAmount = document.querySelector("#cart__total");

const emptyCartInnerText = `
  <h4 class="emptyCart__message">
    Your cart is currently empty. Go check <a href="/index.html">our products</a>
  </h4>
`;

function displayCart() {
  cartContainer.innerHTML = "";

  if (cartProducts.length === 0) {
    const cartProductsCard = document.createElement("div");
    cartProductsCard.innerHTML = emptyCartInnerText;
    cartContainer.append(cartProductsCard);
    calculateTotalCartAmount(cartProducts);
  } else {
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
      <img src="${product.image}" class="cartProducts__card__image" alt="${product.name}"/>
      <h3 class="cartProducts__card__title">${product.name}</h3>
      <p class="cartProducts__card__price">Price: $${cartProductPriceFormatted}</p>
      <div class="cartProducts__quantity__container">
          <button class="cartProducts__quantity__reducebutton" id="${product.id}">-</button>
          <p class="cartProducts__card__quantity">${product.quantity}</p>
          <button class="cartProducts__quantity__increasebutton" id="${product.id}">+</button>
      </div>
      <p class="cartProducts__card__total">Total: $${totalPerProduct}</p>`;

      /* Each newly created div with the corresponding information & style should now be included in the HTML in the cart's container */
      cartContainer.append(cartProductsCard);
      calculateTotalCartAmount(cartProducts);

      /* Update increase & reduce items' buttons */
      reduceItemButton = document.querySelectorAll(
        ".cartProducts__quantity__reducebutton"
      );
      increaseItemButton = document.querySelectorAll(
        ".cartProducts__quantity__increasebutton"
      );

      increaseItemButton.forEach((button) => {
        button.addEventListener("click", increaseItem);
      });
      reduceItemButton.forEach((button) => {
        button.addEventListener("click", reduceItem);
      });
    });
  }
}

displayCart();

/* Function increase & reduce item */

function increaseItem(event) {
  const cartProductIndex = cartProducts.findIndex(
    (product) => product.id == event.currentTarget.id
  );
  cartProducts[cartProductIndex].quantity++;

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  displayCart();
}

function reduceItem(event) {
  const cartProductIndex = cartProducts.findIndex(
    (product) => product.id == event.currentTarget.id
  );
  if (cartProducts[cartProductIndex].quantity === 1) {
    /* Notification after product has been removed from cart */
    Toastify({
      text: "Product removed from cart",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      style: {
        background:
          "linear-gradient(to right, rgb(246, 43, 43), rgb(243, 161, 8))",
        fontWeight: "200",
        borderRadius: "5rem",
        fontSize: "0.75rem",
      },
      offset: {
        x: "2rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: "9rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    cartProducts.splice(cartProductIndex, 1);
  } else {
    cartProducts[cartProductIndex].quantity--;
  }

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  displayCart();
}

/* Empty Cart event listener */

emptyCartButton.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure you want to delete all your products?",
    icon: "warning",
    customClass: {
      title: "sweetalert__title",
      confirmButton: "sweetalert__content",
      cancelButton: "sweetalert__content",
    },
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete them!",
    cancelButtonText: "No, let's keep them!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cartProducts");
      cartContainer.innerHTML = "";
      cartProducts = [];
      const cartProductsCard = document.createElement("div");
      cartProductsCard.innerHTML = emptyCartInnerText;
      cartContainer.append(cartProductsCard);

      calculateTotalCartAmount(cartProducts);

      Swal.fire({
        title: "Done!",
        text: "Your cart has been emptied!",
        icon: "success",
        customClass: {
          title: "sweetalert__title",
          htmlContainer: "sweetalert__content",
          confirmButton: "sweetalert__content",
        },
      });
    }
  });
});

function calculateTotalCartAmount(cartProducts) {
  let total = cartProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  let totalFormatted = new Intl.NumberFormat("de-DE").format(total);

  cartTotalAmount.innerHTML = `Total Cart: $${totalFormatted}`;
}
