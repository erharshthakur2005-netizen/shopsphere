const adminToken =
  localStorage.getItem("shopSphereToken");

console.log("Admin token:", adminToken);
let products = [];

const API_URL = "http://localhost:5000/api/products";


// ========================================
// FETCH PRODUCTS
// ========================================

async function fetchProducts() {

  try {

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    products = data.products;

    return products;

  } catch (error) {

    console.error("API Error:", error);

    return [];

  }
}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productList) {

  const productGrid =
    document.getElementById("productGrid");

  if (!productGrid) return;

  productGrid.innerHTML = "";


  if (productList.length === 0) {

    productGrid.innerHTML =
      "<p>No products found.</p>";

    return;
  }


  productList.forEach(product => {

    const card =
      document.createElement("div");

    card.className = "product-card";


    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.title}"
        class="product-image"
        loading="lazy"
      >

      <div class="product-info">

        <p class="product-category">
          ${product.category}
        </p>

        <h3 class="product-title">
          ${product.title}
        </h3>

        <p class="product-rating">
          ⭐ ${product.rating}
        </p>

        <p class="product-price">
          ₹${product.price}
        </p>

       <div class="product-buttons">

  <button
    onclick="navigate('/product/${product.id}')"
  >
    View Details
  </button>

  <button
    onclick="addToCart('${product._id || product.id}')"
  >
    🛒 Add to Cart
  </button>

</div>
      </div>
    `;


    productGrid.appendChild(card);

  });

}


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts() {

  const categoryFilter =
    document.getElementById("categoryFilter");

  const searchInput =
    document.getElementById("searchInput");


  if (!categoryFilter) return;


  const category =
    categoryFilter.value;


  const search =
    searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";


  let filtered = [...products];


  // Category filter
  if (category !== "all") {

    filtered = filtered.filter(
      product =>
        product.category === category
    );

  }


  // Search
  if (search !== "") {

    filtered = filtered.filter(
      product =>
        product.title
          .toLowerCase()
          .includes(search)
    );

  }


  displayProducts(filtered);

}


// ========================================
// SETUP PRODUCT PAGE
// ========================================

function setupProductPage() {

  const categoryFilter =
    document.getElementById("categoryFilter");

  const searchBtn =
    document.getElementById("searchBtn");

  const searchInput =
    document.getElementById("searchInput");


  if (categoryFilter) {

    categoryFilter.addEventListener(
      "change",
      filterProducts
    );

  }


  if (searchBtn) {

    searchBtn.addEventListener(
      "click",
      filterProducts
    );

  }


  if (searchInput) {

    searchInput.addEventListener(
      "keyup",
      event => {

        if (event.key === "Enter") {
          filterProducts();
        }

      }
    );

  }

}


// ========================================
// LOAD PRODUCTS PAGE
// ========================================

async function loadProducts() {

  const productGrid =
    document.getElementById("productGrid");


  if (!productGrid) return;


  productGrid.innerHTML =
    "<p>Loading products...</p>";


  await fetchProducts();

  displayProducts(products);

  setupProductPage();

}
function addToCart(productId) {

  const product = products.find(
    item =>
      String(item._id || item.id) === String(productId)
  );

  if (!product) {

    console.error(
      "Product not found:",
      productId,
      products
    );

    alert("Product not found");

    return;
  }


  let cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  const productIdValue =
    String(product._id || product.id);


  const existingProduct =
    cart.find(
      item =>
        String(item.id) === productIdValue
    );


  if (existingProduct) {

    existingProduct.quantity =
      (Number(existingProduct.quantity) || 1) + 1;

  } else {

    cart.push({

      id: productIdValue,

      _id: product._id,

      title: product.title,

      category: product.category,

      price: product.price,

      rating: product.rating,

      image: product.image,

      description: product.description,

      stock: product.stock,

      quantity: 1

    });

  }


  localStorage.setItem(
    "shopSphereCart",
    JSON.stringify(cart)
  );


  alert(
    `${product.title} added to cart 🛒`
  );


  updateCartCount();

}
function updateCartCount() {

  const cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const cartLink =
    document.querySelector(
      '[data-link="/cart"]'
    );


  if (cartLink) {

    cartLink.textContent =
      `Cart 🛒 (${count})`;

  }

}
function renderCartPage() {

  const cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  // EMPTY CART
  if (cart.length === 0) {

    app.innerHTML = `

      <section class="products-section cart-page">

        <div class="section-header">

          <div>

            <p class="section-small">
              SHOPPING CART
            </p>

            <h2>
              Your Cart 🛒
            </h2>

          </div>

        </div>


        <div class="cart-empty">

          <h3>
            Your cart is empty 🛒
          </h3>

          <p>
            Add some products to your cart.
          </p>

          <button
            onclick="navigate('/products')"
          >
            Continue Shopping
          </button>

        </div>

      </section>

    `;

    updateCartCount();

    return;
  }


  let total = 0;

  let totalItems = 0;


  const cartHTML = cart.map(item => {

    const quantity =
      Number(item.quantity) || 1;

    const price =
      Number(item.price) || 0;


    const itemTotal =
      price * quantity;


    total += itemTotal;

    totalItems += quantity;


    return `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.title}"
          class="cart-item-image"
        >


        <div class="cart-item-info">

          <p class="product-category">
            ${item.category || ""}
          </p>

          <h3>
            ${item.title}
          </h3>

          <p>
            ₹${price}
          </p>


          <div class="quantity-controls">

            <button
              onclick="changeQuantity('${item.id}', -1)"
            >
              −
            </button>

            <span>
              ${quantity}
            </span>

            <button
              onclick="changeQuantity('${item.id}', 1)"
            >
              +
            </button>

          </div>


          <p>
            Item Total:
            <strong>
              ₹${itemTotal}
            </strong>
          </p>


          <button
            onclick="removeFromCart('${item.id}')"
            class="remove-btn"
          >
            🗑️ Remove
          </button>

        </div>

      </div>

    `;

  }).join("");


  // CART PAGE

  app.innerHTML = `

    <section class="products-section cart-page">


      <div class="section-header">

        <div>

          <p class="section-small">
            SHOPPING CART
          </p>

          <h2>
            Your Cart 🛒
          </h2>

        </div>

      </div>


      <div class="cart-container">


        <!-- CART ITEMS -->

        <div class="cart-items">

          ${cartHTML}

        </div>


        <!-- SUMMARY -->

        <div class="cart-summary">

          <h2>
            Order Summary
          </h2>


          <p>
            Items:
            <strong>
              ${totalItems}
            </strong>
          </p>


          <p>
            Total:
            <strong>
              ₹${total}
            </strong>
          </p>


          <button
            onclick="navigate('/products')"
          >
            Continue Shopping
          </button>


          <button
            onclick="checkout()"
          >
            Checkout
          </button>


        </div>


      </div>

    </section>

  `;


  updateCartCount();

}
function changeQuantity(productId, change) {

  let cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  const product =
    cart.find(
      item =>
        String(item.id) === String(productId)
    );


  if (!product) {

    console.error(
      "Cart product not found:",
      productId
    );

    return;
  }


  product.quantity =
    (Number(product.quantity) || 1) + change;


  if (product.quantity <= 0) {

    cart =
      cart.filter(
        item =>
          String(item.id) !== String(productId)
      );

  }


  localStorage.setItem(
    "shopSphereCart",
    JSON.stringify(cart)
  );


  renderCartPage();

  updateCartCount();

}
function removeFromCart(productId) {

  let cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  cart =
    cart.filter(
      item =>
        String(item.id) !== String(productId)
    );


  localStorage.setItem(
    "shopSphereCart",
    JSON.stringify(cart)
  );


  renderCartPage();

  updateCartCount();

}
function checkout() {

  const cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  if (cart.length === 0) {

    alert("Your cart is empty!");

    navigate("/products");

    return;
  }


  let total = 0;

  cart.forEach(item => {

    total +=
      Number(item.price) *
      Number(item.quantity);

  });


  app.innerHTML = `

    <section class="products-section checkout-page">

      <div class="section-header">

        <div>

          <p class="section-small">
            CHECKOUT
          </p>

          <h2>
            Complete Your Order
          </h2>

        </div>

      </div>


      <div class="checkout-container">


        <!-- CUSTOMER DETAILS -->

        <div class="checkout-form">

          <h3>
            Delivery Details
          </h3>


          <form id="checkoutForm">

            <div class="form-group">

              <label for="checkoutName">
                Full Name
              </label>

              <input
                type="text"
                id="checkoutName"
                placeholder="Enter your name"
                required
              >

            </div>


            <div class="form-group">

              <label for="checkoutEmail">
                Email
              </label>

              <input
                type="email"
                id="checkoutEmail"
                placeholder="Enter your email"
                required
              >

            </div>


            <div class="form-group">

              <label for="checkoutPhone">
                Phone Number
              </label>

              <input
                type="tel"
                id="checkoutPhone"
                placeholder="Enter phone number"
                required
              >

            </div>


            <div class="form-group">

              <label for="checkoutAddress">
                Address
              </label>

              <textarea
                id="checkoutAddress"
                rows="4"
                placeholder="Enter delivery address"
                required
              ></textarea>

            </div>


            <div class="form-group">

              <label for="checkoutCity">
                City
              </label>

              <input
                type="text"
                id="checkoutCity"
                placeholder="Enter city"
                required
              >

            </div>


            <div class="form-group">

              <label for="checkoutPincode">
                PIN Code
              </label>

              <input
                type="text"
                id="checkoutPincode"
                placeholder="Enter PIN code"
                required
              >

            </div>


            <div class="form-group">

              <label for="paymentMethod">
                Payment Method
              </label>

              <select
                id="paymentMethod"
                required
              >

                <option value="">
                  Select payment method
                </option>

                <option value="cod">
                  Cash on Delivery
                </option>

                <option value="online">
                  Online Payment
                </option>

              </select>

            </div>


            <p id="checkoutMessage"></p>


            <button type="submit">
              Place Order
            </button>


            <button
              type="button"
              onclick="navigate('/cart')"
            >
              Back to Cart
            </button>

          </form>

        </div>


        <!-- ORDER SUMMARY -->

        <div class="checkout-summary">

          <h3>
            Order Summary
          </h3>


          ${cart.map(item => `

            <div class="checkout-item">

              <span>
                ${item.title}
                × ${item.quantity}
              </span>

              <strong>
                ₹${Number(item.price) * Number(item.quantity)}
              </strong>

            </div>

          `).join("")}


          <hr>


          <div class="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹${total}
            </strong>

          </div>

        </div>


      </div>

    </section>

  `;


  setupCheckout();

}
async function setupLogin() {

  const form =
    document.getElementById("loginForm");

  if (!form) return;


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const email =
        document.getElementById(
          "loginEmail"
        ).value;

      const password =
        document.getElementById(
          "loginPassword"
        ).value;


      const message =
        document.getElementById(
          "loginMessage"
        );


      try {

        const response =
          await fetch(
            "http://localhost:5000/api/users/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                email,
                password
              })
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          message.textContent =
            data.message;

          return;
        }


        localStorage.setItem(
          "shopSphereToken",
          data.token
        );


        localStorage.setItem(
          "shopSphereUser",
          JSON.stringify(data.user)
        );


        message.textContent =
          "Login successful!";


        setTimeout(() => {

          navigate("/");

        }, 500);


      } catch (error) {

        console.error(error);

        message.textContent =
          "Unable to connect to server.";

      }

    }
  );

}
async function setupRegister() {

  const form =
    document.getElementById(
      "registerForm"
    );

  if (!form) return;


  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "registerName"
        ).value;


      const email =
        document.getElementById(
          "registerEmail"
        ).value;


      const password =
        document.getElementById(
          "registerPassword"
        ).value;


      const message =
        document.getElementById(
          "registerMessage"
        );


      try {

        const response =
          await fetch(
            "http://localhost:5000/api/users/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                name,
                email,
                password
              })
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          message.textContent =
            data.message;

          return;
        }


        message.textContent =
          "Registration successful!";


        setTimeout(() => {

          navigate("/login");

        }, 1000);


      } catch (error) {

        console.error(error);

        message.textContent =
          "Unable to connect to server.";

      }

    }
  );

}
// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

  const cart =
    JSON.parse(
      localStorage.getItem("shopSphereCart")
    ) || [];


  const count = cart.reduce(
    (total, item) => {
      return total + (item.quantity || 0);
    },
    0
  );


  const cartLink =
    document.querySelector(
      '[data-link="/cart"]'
    );


  if (cartLink) {

    cartLink.textContent =
      `Cart 🛒 (${count})`;

  }

}
function setupCheckout() {

  const form = document.getElementById("checkoutForm");

  if (!form) return;

  form.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
      document.getElementById("checkoutName").value.trim();

    const email =
      document.getElementById("checkoutEmail").value.trim();

    const phone =
      document.getElementById("checkoutPhone").value.trim();

    const address =
      document.getElementById("checkoutAddress").value.trim();

    const city =
      document.getElementById("checkoutCity").value.trim();

    const pincode =
      document.getElementById("checkoutPincode").value.trim();

    const paymentMethod =
      document.getElementById("paymentMethod").value;


    const cart =
      JSON.parse(
        localStorage.getItem("shopSphereCart")
      ) || [];


    if (cart.length === 0) {

      alert("Your cart is empty!");

      navigate("/products");

      return;
    }


    let total = 0;

    cart.forEach(item => {

      total +=
        Number(item.price) *
        Number(item.quantity);

    });


    // ========================================
    // CUSTOMER DATA
    // ========================================

    const customer = {

      name,
      email,
      phone,
      address,
      city,
      pincode

    };


    // ========================================
    // ORDER DATA
    // ========================================

    const orderData = {

      customer,

      items: cart.map(item => ({

        productId: String(item.id),

        title: item.title,

        price: Number(item.price),

        quantity: Number(item.quantity),

        image: item.image

      })),

      total,

      paymentMethod

    };


    try {

      // ========================================
      // SEND ORDER TO BACKEND
      // ========================================

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(orderData)

        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to place order"
        );

      }


      console.log(
        "Order created:",
        data.order
      );


      // ========================================
      // CLEAR CART
      // ========================================

      localStorage.removeItem(
        "shopSphereCart"
      );


      updateCartCount();


      // ========================================
      // SUCCESS PAGE
      // ========================================

      app.innerHTML = `

        <section class="products-section">

          <div class="checkout-success">

            <h1>
              🎉 Order Placed Successfully!
            </h1>

            <p>
              Thank you for your order,
              <strong>${name}</strong>.
            </p>

            <p>
              Order ID:
              <strong>
                ${data.order._id}
              </strong>
            </p>

            <p>
              Total:
              <strong>
                ₹${data.order.total}
              </strong>
            </p>

            <p>
              Payment:
              <strong>
                ${
                  paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"
                }
              </strong>
            </p>

            <button
              onclick="navigate('/products')"
            >
              Continue Shopping
            </button>

          </div>

        </section>

      `;


    } catch (error) {

      console.error(
        "Checkout Error:",
        error
      );


      alert(
        "❌ " + error.message
      );

    }

  });

}
// ========================================
// MY ORDERS PAGE
// ========================================

async function loadMyOrders() {

  const user =
    JSON.parse(
      localStorage.getItem("shopSphereUser")
    );

  if (!user || !user.email) {

    app.innerHTML = `
      <section class="products-section">

        <h2>Please login first</h2>

        <button onclick="navigate('/login')">
          Login
        </button>

      </section>
    `;

    return;
  }


  app.innerHTML = `
    <section class="products-section">

      <h2>My Orders 📦</h2>

      <div id="myOrdersList">
        <p>Loading orders...</p>
      </div>

    </section>
  `;


  try {

    const response = await fetch(
      `http://localhost:5000/api/orders/my-orders?email=${encodeURIComponent(user.email)}`
    );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to load orders"
      );

    }


    displayMyOrders(data.orders);

  } catch (error) {

    console.error(error);

    document.getElementById(
      "myOrdersList"
    ).innerHTML = `
      <p>
        ❌ ${error.message}
      </p>
    `;

  }

}


// ========================================
// DISPLAY MY ORDERS
// ========================================

function displayMyOrders(orders) {

  const container =
    document.getElementById("myOrdersList");


  if (!orders || orders.length === 0) {

    container.innerHTML = `
      <p>
        You haven't placed any orders yet.
      </p>

      <button onclick="navigate('/products')">
        Start Shopping
      </button>
    `;

    return;
  }


  container.innerHTML =
    orders.map(order => `

      <div class="admin-card">

        <h3>
          Order #${order._id}
        </h3>

        <p>
          Status:
          <strong>
            ${order.status}
          </strong>
        </p>

        <p>
          Payment:
          ${
            order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : "Online Payment"
          }
        </p>

        <div>

          ${order.items.map(item => `

            <p>
              ${item.title}
              × ${item.quantity}
              — ₹${item.price}
            </p>

          `).join("")}

        </div>

        <h3>
          Total: ₹${order.total}
        </h3>

        <p>
          Ordered:
          ${new Date(
            order.createdAt
          ).toLocaleString()}
        </p>

      </div>

    `).join("");

}