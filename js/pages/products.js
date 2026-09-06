function productsPage() {

  return `
    <section class="products-section">

      <div class="section-header">

        <div>
          <p class="section-small">
            OUR COLLECTION
          </p>

          <h2>All Products</h2>
        </div>


        <div class="product-controls">

          <input
            type="text"
            id="searchInput"
            placeholder="Search products..."
          >

          <select id="categoryFilter">

            <option value="all">
              All Categories
            </option>

            <option value="electronics">
              Electronics
            </option>

            <option value="fashion">
              Fashion
            </option>

            <option value="accessories">
              Accessories
            </option>

          </select>

        </div>

      </div>


      <div
        id="productGrid"
        class="product-grid"
      >
        <p>Loading products...</p>
      </div>

    </section>
  `;
}