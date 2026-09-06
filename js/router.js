const app = document.getElementById("app");

const BASE_PATH = "/frontend";


// ========================================
// NAVIGATION
// ========================================

function navigate(path) {

  let fullPath;

  if (path === "/") {

    fullPath = `${BASE_PATH}/index.html`;

  } else {

    fullPath = `${BASE_PATH}/index.html${path}`;

  }

  window.history.pushState({}, "", fullPath);

  router();
}


// ========================================
// GET CURRENT ROUTE
// ========================================

function getRoute() {

  let path = window.location.pathname;

  if (path.startsWith(BASE_PATH)) {
    path = path.substring(BASE_PATH.length);
  }

  path = path.replace("/index.html", "");

  if (path === "") {
    path = "/";
  }

  return path;
}


// ========================================
// ROUTER
// ========================================

async function router() {

  const path = getRoute();

  console.log("Current route:", path);


  // HOME
  if (path === "/") {

    app.innerHTML = homePage();

    return;
  }


  // PRODUCTS
  if (path === "/products") {

    app.innerHTML = productsPage();

    await loadProducts();

    return;
  }


  // PRODUCT DETAILS
  if (path.startsWith("/product/")) {

    const id = path.split("/")[2];

    await loadProductDetails(id);

    return;
  }


  // CART
  if (path === "/cart") {

  renderCartPage();
   updateCartCount();

  return;
}
    
  // ========================================
// MY ORDERS
// ========================================

if (path === "/my-orders") {

  await loadMyOrders();

  return;
}


  // LOGIN
  if (path === "/login") {

    app.innerHTML = loginPage();
    setupLogin();
    return;
  }

  // REGISTER
if (path === "/register") {

  app.innerHTML = registerPage();

  setupRegister();

  return;
}

  // 404
  app.innerHTML = `
    <section class="products-section">

      <h1>404</h1>

      <p>
        Page not found.
      </p>

      <button onclick="navigate('/')">
        Go Home
      </button>

    </section>
  `;
}


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

  const productGrid =
    document.getElementById("productGrid");

  if (!productGrid) return;


  productGrid.innerHTML =
    "<p>Loading products...</p>";


  try {

    await fetchProducts();

    displayProducts(products);

    setupProductPage();

  } catch (error) {

    console.error(error);

    productGrid.innerHTML =
      "<p>Unable to load products.</p>";

  }

}


// ========================================
// LOAD PRODUCT DETAILS
// ========================================

async function loadProductDetails(id) {

  try {

    const response =
      await fetch(`${API_URL}/${id}`);


    if (!response.ok) {
      throw new Error("Product not found");
    }


    const data =
      await response.json();


    app.innerHTML =
      productDetailsPage(data.product);


  } catch (error) {

    console.error(error);


    app.innerHTML = `
      <section class="products-section">

        <h1>Product Not Found</h1>

        <p>
          This product does not exist.
        </p>

        <button onclick="navigate('/products')">
          Back to Products
        </button>

      </section>
    `;

  }

}


// ========================================
// HANDLE NAVIGATION LINKS
// ========================================

document.addEventListener("click", event => {

  const link =
    event.target.closest("[data-link]");


  if (!link) return;


  event.preventDefault();


  const path =
    link.getAttribute("href");


  navigate(path);

});


// ========================================
// BACK / FORWARD
// ========================================

window.addEventListener(
  "popstate",
  router
);


// ========================================
// START
// ========================================

router();
updateCartCount();