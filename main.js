const menuEmail = document.querySelector(".navbar-email");
const menuHamIcom = document.querySelector(".menu");
const navbar_shopping_cart = document.querySelector(".navbar-shopping-cart");

const mobile_menu = document.querySelector(".mobile-menu");
const shoppingCartContainer = document.querySelector("#shoppingCartContainer");
const desktop_menu = document.querySelector(".desktop-menu");

var cards_container = document.querySelector(".cards-container");
const productDetailContainer = document.querySelector("#productDetail");
const productDetailCloseIcon = document.querySelector(".product-detail-close");

menuEmail.addEventListener("click", toggleDeskTopMenu);
menuHamIcom.addEventListener("click", toggleMobileMenu);
navbar_shopping_cart.addEventListener("click", toggleCarrAside);
productDetailCloseIcon.addEventListener("click", closeProductDetailAside);

window.addEventListener("load", renderProducts);

function toggleDeskTopMenu() {
  desktop_menu.classList.toggle("inactive");
}

function toggleMobileMenu() {
  let isAsideClosed = shoppingCartContainer.classList.contains("inactive");

  if (!isAsideClosed) {
    shoppingCartContainer.classList.add("inactive");
  }

  mobile_menu.classList.toggle("inactive");
  closeProductDetailAside();
}

function toggleCarrAside() {
  let isMobileMenuClosed = mobile_menu.classList.contains("inactive");
  let isProductoDetailContainer =
    productDetailContainer.classList.contains("inactive");

  if (!isMobileMenuClosed) {
    mobile_menu.classList.add("inactive");
  }

  if (!isProductoDetailContainer) {
    productDetailContainer.classList.add("inactive");
  }

  shoppingCartContainer.classList.toggle("inactive");
}

function openProductDetailAside() {
  let isAsideClosed = shoppingCartContainer.classList.contains("inactive");

  if (!isAsideClosed) {
    shoppingCartContainer.classList.add("inactive");
  }

  productDetailContainer.classList.remove("inactive");
}

function closeProductDetailAside() {
  productDetailContainer.classList.add("inactive");
}

function renderProducts() {
  fetch("./products.json")
    .then((response) => response.json())
    .then((products) => {
      const product_card = products.map((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        const img = document.createElement("img");
        img.setAttribute("src", product.img);
        img.addEventListener("click", openProductDetailAside);

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const productInfoDiv = document.createElement("div");
        const productPrice = document.createElement("p");
        productPrice.textContent = "$" + product.precio;
        const productName = document.createElement("p");
        productName.textContent = product.producto;

        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productName);

        const productInfoFigure = document.createElement("figure");
        const productImgCart = document.createElement("img");
        productImgCart.setAttribute("src", "./icons/bt_add_to_cart.svg");

        productInfoFigure.appendChild(productImgCart);

        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);

        productCard.appendChild(img);
        productCard.appendChild(productInfo);

        cards_container.appendChild(productCard);
      });
    });
}
