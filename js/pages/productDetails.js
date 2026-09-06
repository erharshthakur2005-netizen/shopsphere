function productDetailsPage(product) {

  return `
    <section class="product-details">

      <div class="details-image">
        <img
          src="${product.image}"
          alt="${product.title}"
        >
      </div>

      <div class="details-content">

        <p class="product-category">
          ${product.category}
        </p>

        <h1>${product.title}</h1>

        <p class="product-rating">
          ⭐ ${product.rating}
        </p>

        <h2 class="product-price">
          ₹${product.price}
        </h2>

        <p>
          Premium quality ${product.title}.
          Shop this product from ShopSphere.
        </p>

        <button
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

      </div>

    </section>
  `;
}