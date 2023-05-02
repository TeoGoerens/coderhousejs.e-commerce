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

/* I need to define a variable containing the empty div in the HTML whose id is #products */
const productsContainer = document.querySelector("#products");

function displayProducts() {
  products.forEach((product) => {
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
          <button class="products__card__button" id="${product.id}">Add to cart</button>`;

    /* Each newly created div with the corresponding information & style should now be included in the HTML in the products' container whose id is #products */
    productsContainer.append(productsCard);
  });
}

/* I call the displayProducts() function to make sure that the whole information from the PRODUCTS' array is displayed in the HTML */
displayProducts();

/* Now that the whole products are displayed in the HTML, I save in a new variable all the ADD TO CART buttons to make sure I will be able to add an event listener to them */
const addToCartButtons = document.querySelectorAll(".products__card__button");

function addToCart() {
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", pushToCart);
  });
}

const cart = [];
function pushToCart(e) {
  const id = e.currentTarget.id;
  console.log(id);
}
