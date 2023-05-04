/* -------------------- USEFUL ARRAYS -------------------- */

const products = [
  {
    id: 1,
    name: "Dom Perignon",
    price: 100000,
    category: "Champagnes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/domperignon.jpg",
    stock: 500,
  },
  {
    id: 2,
    name: "Baron B",
    price: 5000,
    category: "Sparkling Wines",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/baronb.jpg",
    stock: 10000,
  },
  {
    id: 3,
    name: "Chandon",
    price: 2500,
    category: "Sparkling Wines",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/chandon.jpg",
    stock: 50000,
  },
  {
    id: 4,
    name: "Latitud 33",
    price: 1500,
    category: "Still Wines",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/latitud.jpg",
    stock: 25000,
  },
  {
    id: 5,
    name: "Terrazas Reserva",
    price: 2500,
    category: "Still Wines",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/terrazasreserva.jpg",
    stock: 15000,
  },
  {
    id: 6,
    name: "Hennessy",
    price: 12000,
    category: "Spirits",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/hennessy.jpg",
    stock: 50,
  },
  {
    id: 7,
    name: "Belvedere",
    price: 15000,
    category: "Spirits",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur!",
    image: "imgs/belvedere.jpg",
    stock: 10,
  },
];

const categories = [
  { id: "champagnes", name: "Champagnes" },
  { id: "sparklingWines", name: "Sparkling Wines" },
  { id: "stillWines", name: "Still Wines" },
  { id: "spirits", name: "Spirits" },
];

/* -------------------- USEFUL VARIABLES -------------------- */

/* I need to define a variable containing the empty div in the HTML whose id is #products */
const productsContainer = document.querySelector("#products");
const buttonCategories = document.querySelectorAll(".button__categories");
const cartContainer = document.querySelector("#cart__container");
let addToCartButtons = document.querySelectorAll(".products__card__button");
let cartProducts = [];

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
    /* Within each newly created div, I will add all the necessary information to be displayed in the card */
    productsCard.innerHTML = `
          <h3 class="products__card__title">${product.name}</h3>
          <p class="products__card__price">Price: ${product.price}</p>
          <p class="products__card__description">${product.description}</p>
          <p class="products__card__stock">Available stock: ${product.stock}</p>
          <button class="products__card__button" id="${product.id}_${product.name}">Add to cart</button>`;

    /* Each newly created div with the corresponding information & style should now be included in the HTML in the products' container whose id is #products */
    productsContainer.append(productsCard);
  });
  updateCartButtons();
}

function displayCart(cartProducts) {
  cartContainer.innerHTML = "";
  cartProducts.forEach((product) => {
    const cartProductsCard = document.createElement("div");
    /* For each newly created div, I will assign the corresponding class to make sure that the CSS properties are assigned */
    cartProductsCard.classList.add("cartProducts__card");
    /* Within each newly created div, I will add all the necessary information to be displayed in the card */
    cartProductsCard.innerHTML = `
                <h3 class="products__card__title">${product.name}</h3>
                <p class="products__card__price">Price: ${product.price}</p>
                <p class="products__card__quantity">${product.quantity}</p>`;

    /* Each newly created div with the corresponding information & style should now be included in the HTML in the cart's container */
    cartContainer.append(cartProductsCard);
  });
}

/* I call the displayProducts() function for the first time to make sure that the products are all loaded when the page is refreshed */

displayProducts(products);

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
  displayCart(cartProducts);
}

/* Empty Cart event listener */
const emptyCartButton = document.querySelector("#button__emptyCart");
emptyCartButton.addEventListener("click", () => {
  cartProducts = [];
  cartContainer.innerHTML = "";
});
