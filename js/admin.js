const adminToken =
  localStorage.getItem("shopSphereToken");

console.log("Admin token:", adminToken);


// ========================================
// ELEMENTS
// ========================================

const productForm =
  document.getElementById("productForm");

const productsList =
  document.getElementById("productsList");

const refreshProductsBtn =
  document.getElementById("refreshProductsBtn");


// ========================================
// CHECK ADMIN TOKEN
// ========================================

if (!adminToken) {

  alert("Please login as admin first.");

}


// ========================================
// ADD PRODUCT
// ========================================

if (productForm) {

  productForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      if (!adminToken) {

        alert(
          "Please login as admin first."
        );

        return;

      }


      const productData = {

        title:
          document.getElementById("title").value,

        category:
          document.getElementById("category").value,

        price:
          Number(
            document.getElementById("price").value
          ),

        stock:
          Number(
            document.getElementById("stock").value
          ),

        rating:
          Number(
            document.getElementById("rating").value
          ),

        image:
          document.getElementById("image").value,

        description:
          document.getElementById(
            "description"
          ).value

      };


      try {

        const response =
          await fetch(
            "http://localhost:5000/api/products",
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                "Authorization":
                  `Bearer ${adminToken}`

              },

              body:
                JSON.stringify(productData)

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to add product"
          );

        }


        document.getElementById(
          "message"
        ).textContent =
          "✅ Product added successfully!";


        productForm.reset();


        loadProducts();


      } catch (error) {

        console.error(error);

        document.getElementById(
          "message"
        ).textContent =
          "❌ " + error.message;

      }

    }
  );

}


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

  if (!productsList) return;


  try {

    const response =
      await fetch(
        "http://localhost:5000/api/products"
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to load products"
      );

    }


    displayProducts(
      data.products
    );


  } catch (error) {

    console.error(error);

    productsList.innerHTML = `
      <p>
        ❌ Failed to load products
      </p>
    `;

  }

}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(products) {

  if (!products || products.length === 0) {

    productsList.innerHTML = `
      <p>
        No products found.
      </p>
    `;

    return;

  }


  productsList.innerHTML =
    products.map(product => `

      <div class="admin-product">

        <img
          src="${product.image}"
          alt="${product.title}"
          class="admin-product-image"
        >

        <div class="admin-product-info">

          <h3>
            ${product.title}
          </h3>

          <p>
            Category:
            ${product.category}
          </p>

          <p>
            Price:
            ₹${product.price}
          </p>

          <p>
            Stock:
            ${product.stock}
          </p>

          <p>
            Rating:
            ⭐ ${product.rating}
          </p>

        </div>


        <div class="admin-product-actions">

          <button
            onclick="editProduct('${product._id}')"
          >
            ✏️ Edit
          </button>

          <button
            onclick="deleteProduct('${product._id}')"
          >
            🗑️ Delete
          </button>

        </div>

      </div>

    `).join("");

}


// ========================================
// DELETE PRODUCT
// ========================================

async function deleteProduct(id) {

  if (!adminToken) {

    alert(
      "Please login as admin first."
    );

    return;

  }


  const confirmDelete =
    confirm(
      "Are you sure you want to delete this product?"
    );


  if (!confirmDelete) return;


  try {

    const response =
      await fetch(
        `http://localhost:5000/api/products/${id}`,
        {

          method: "DELETE",

          headers: {

            "Authorization":
              `Bearer ${adminToken}`

          }

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to delete product"
      );

    }


    alert(
      "✅ Product deleted successfully!"
    );


    loadProducts();


  } catch (error) {

    console.error(error);

    alert(
      "❌ " + error.message
    );

  }

}


// ========================================
// EDIT PRODUCT
// ========================================

async function editProduct(id) {

  const newTitle =
    prompt(
      "Enter new product name:"
    );


  if (!newTitle) return;


  try {

    const response =
      await fetch(
        `http://localhost:5000/api/products/${id}`,
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${adminToken}`

          },

          body:
            JSON.stringify({
              title: newTitle
            })

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to update product"
      );

    }


    alert(
      "✅ Product updated successfully!"
    );


    loadProducts();


  } catch (error) {

    console.error(error);

    alert(
      "❌ " + error.message
    );

  }

}


// ========================================
// REFRESH PRODUCTS
// ========================================

if (refreshProductsBtn) {

  refreshProductsBtn.addEventListener(
    "click",
    loadProducts
  );

}


// ========================================
// INITIAL LOAD
// ========================================

loadProducts();
// ========================================
// LOAD ORDERS
// ========================================

async function loadOrders() {

  const ordersList =
    document.getElementById("ordersList");

  if (!ordersList) return;


  try {

    const response =
      await fetch(
        "http://localhost:5000/api/orders"
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to load orders"
      );

    }


    displayOrders(data.orders);


  } catch (error) {

    console.error(error);

    ordersList.innerHTML = `
      <p>
        ❌ Failed to load orders
      </p>
    `;

  }

}


// ========================================
// DISPLAY ORDERS
// ========================================

function displayOrders(orders) {

  const ordersList =
    document.getElementById("ordersList");

  if (!ordersList) return;


  if (!orders || orders.length === 0) {

    ordersList.innerHTML = `
      <p>
        No orders found.
      </p>
    `;

    return;

  }


  ordersList.innerHTML =
    orders.map(order => `

      <div class="admin-order">

        <div class="order-header">

          <h3>
            Order #${order._id}
          </h3>

          <span>
            ${new Date(
              order.createdAt
            ).toLocaleString()}
          </span>

        </div>


        <div class="order-info">

          <p>
            <strong>Customer:</strong>
            ${order.customer.name}
          </p>

          <p>
            <strong>Email:</strong>
            ${order.customer.email}
          </p>

          <p>
            <strong>Phone:</strong>
            ${order.customer.phone}
          </p>

          <p>
            <strong>Address:</strong>
            ${order.customer.address},
            ${order.customer.city} -
            ${order.customer.pincode}
          </p>

          <p>
            <strong>Payment:</strong>
            ${
              order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : "Online Payment"
            }
          </p>

          <p>
            <strong>Total:</strong>
            ₹${order.total}
          </p>

        </div>


        <div class="order-items">

          <h4>Products</h4>

          ${order.items.map(item => `

            <div class="order-item">

              <img
                src="${item.image || ""}"
                alt="${item.title}"
                width="60"
              >

              <span>
                ${item.title}
              </span>

              <span>
                ₹${item.price} × ${item.quantity}
              </span>

            </div>

          `).join("")}

        </div>


        <div class="order-status">

          <label>
            Status:
          </label>

          <select
            id="status-${order._id}"
          >

            <option
              value="Pending"
              ${order.status === "Pending" ? "selected" : ""}
            >
              Pending
            </option>

            <option
              value="Processing"
              ${order.status === "Processing" ? "selected" : ""}
            >
              Processing
            </option>

            <option
              value="Shipped"
              ${order.status === "Shipped" ? "selected" : ""}
            >
              Shipped
            </option>

            <option
              value="Delivered"
              ${order.status === "Delivered" ? "selected" : ""}
            >
              Delivered
            </option>

            <option
              value="Cancelled"
              ${order.status === "Cancelled" ? "selected" : ""}
            >
              Cancelled
            </option>

          </select>


          <button
            onclick="updateOrderStatus('${order._id}')"
          >
            💾 Update Status
          </button>

        </div>

      </div>

    `).join("");

}


// ========================================
// UPDATE ORDER STATUS
// ========================================

async function updateOrderStatus(id) {

  if (!adminToken) {

    alert(
      "Please login as admin first."
    );

    return;

  }


  const statusSelect =
    document.getElementById(
      `status-${id}`
    );


  if (!statusSelect) return;


  const status =
    statusSelect.value;


  try {

    const response =
      await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json",

            "Authorization":
              `Bearer ${adminToken}`

          },

          body:
            JSON.stringify({
              status
            })

        }
      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Failed to update order status"
      );

    }


    alert(
      "✅ Order status updated!"
    );


    loadOrders();


  } catch (error) {

    console.error(error);

    alert(
      "❌ " + error.message
    );

  }

}


// ========================================
// REFRESH ORDERS
// ========================================

const refreshOrdersBtn =
  document.getElementById(
    "refreshOrdersBtn"
  );


if (refreshOrdersBtn) {

  refreshOrdersBtn.addEventListener(
    "click",
    loadOrders
  );

}


// ========================================
// INITIAL ORDERS LOAD
// ========================================

loadOrders();

// ========================================
// DASHBOARD STATS
// ========================================

async function loadDashboardStats() {

  try {

    // PRODUCTS
    const productsResponse =
      await fetch(
        "http://localhost:5000/api/products"
      );

    const productsData =
      await productsResponse.json();


    // ORDERS
    const ordersResponse =
      await fetch(
        "http://localhost:5000/api/orders"
      );

    const ordersData =
      await ordersResponse.json();


    const products =
      productsData.products || [];

    const orders =
      ordersData.orders || [];


    // TOTAL PRODUCTS

    const totalProducts =
      document.getElementById(
        "totalProducts"
      );

    if (totalProducts) {

      totalProducts.textContent =
        products.length;

    }


    // TOTAL ORDERS

    const totalOrders =
      document.getElementById(
        "totalOrders"
      );

    if (totalOrders) {

      totalOrders.textContent =
        orders.length;

    }


    // PENDING ORDERS

    const pendingOrders =
      document.getElementById(
        "pendingOrders"
      );

    const pendingCount =
      orders.filter(
        order =>
          order.status === "Pending"
      ).length;


    if (pendingOrders) {

      pendingOrders.textContent =
        pendingCount;

    }


    // TOTAL SALES

    const totalSales =
      document.getElementById(
        "totalSales"
      );

    const sales =
      orders
        .filter(
          order =>
            order.status !== "Cancelled"
        )
        .reduce(
          (total, order) =>
            total + Number(order.total || 0),
          0
        );


    if (totalSales) {

      totalSales.textContent =
        `₹${sales}`;

    }


  } catch (error) {

    console.error(
      "Dashboard Stats Error:",
      error
    );

  }

}


// ========================================
// INITIAL DASHBOARD LOAD
// ========================================

loadDashboardStats();