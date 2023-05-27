/* -------------------- USEFUL ARRAYS -------------------- */

const categories = [
  { id: "champagnes", name: "Champagnes" },
  { id: "sparklingWines", name: "Sparkling Wines" },
  { id: "stillWines", name: "Still Wines" },
  { id: "spirits", name: "Spirits" },
];

/* -------------------- USEFUL VARIABLES -------------------- */

let products;
fetch("./json/products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    /* I call the displayProducts() function for the first time to make sure that the products are all loaded when the page is refreshed */
    displayProducts(products);
  });

/* I need to define a variable containing the empty div in the HTML whose id is #products */
const productsContainer = document.querySelector("#products");
const buttonCategories = document.querySelectorAll(".button__categories");

let addToCartButtons = document.querySelectorAll(".products__card__button");
let cartProducts = localStorage.getItem("cartProducts");
if (cartProducts) {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
} else {
  cartProducts = [];
}

/* -------------------- USEFUL FUNCTIONS -------------------- */

function updateCartButtons() {
  addToCartButtons = document.querySelectorAll(".products__card__button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", pushToCart);
  });
}

function displayProducts(filteredProducts) {
  productsContainer.innerHTML = "";
  filteredProducts.forEach((product) => {
    /* For each product in the PRODUCTS' array I will be creating a new div to add all the necessary information*/
    const productsCard = document.createElement("div");
    /* For each newly created div, I will assign the corresponding class to make sure that the CSS properties are assigned */
    productsCard.classList.add("products__card");
    const productPriceFormatted = new Intl.NumberFormat("de-DE").format(
      product.price
    );
    const productStockFormatted = new Intl.NumberFormat("de-DE").format(
      product.stock
    );
    /* Within each newly created div, I will add all the necessary information to be displayed in the card */
    productsCard.innerHTML = `
          <h3 class="products__card__title">${product.name}</h3>
          <img src="${product.image}" class="products__card__image" alt="${product.name}" />
          <p class="products__card__description">${product.description}</p>
          <p class="products__card__price">Price: $${productPriceFormatted}</p>
          <p class="products__card__stock">Available stock: ${productStockFormatted}</p>
          <button class="products__card__button" id="${product.id}_${product.name}">Add to cart</button>`;

    /* Each newly created div with the corresponding information & style should now be included in the HTML in the products' container whose id is #products */
    productsContainer.append(productsCard);
  });
  updateCartButtons();
}

/* -------------------- USEFUL EVENT LISTENERS -------------------- */

buttonCategories.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.currentTarget.id != "allProducts") {
      const productsFilteredByCategory = products.filter(
        (product) =>
          e.currentTarget.id ===
          categories.filter((category) => category.name === product.category)[0]
            .id
      );
      displayProducts(productsFilteredByCategory);
    } else {
      displayProducts(products);
    }
  });
});

function pushToCart(e) {
  const idButton = e.currentTarget.id;
  const addToCartProduct = products.find(
    (product) => product.id + "_" + product.name === idButton
  );

  if (addToCartProduct != undefined && addToCartProduct.stock > 0) {
    /* Notification after product has been added to cart */
    Toastify({
      text: "Product added to cart",
      duration: 3000,
      destination: "../cart.html",
      newWindow: false,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
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

    if (
      cartProducts.some((product) => product.name === addToCartProduct.name)
    ) {
      const repeatedProductIndex = cartProducts.findIndex(
        (product) => product.name === addToCartProduct.name
      );
      cartProducts[repeatedProductIndex].quantity++;
    } else {
      addToCartProduct.quantity = 1;
      cartProducts.push(addToCartProduct);
    }
  }

  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}
