function homePage() {

  return `
    <section class="hero">

      <div class="hero-content">

        <p class="hero-small">
          NEW COLLECTION
        </p>

        <h1>
          Discover Products You’ll Love
        </h1>

        <p>
          Explore electronics, fashion,
          accessories and more at great prices.
        </p>

        <button
          onclick="navigate('/products')"
        >
          Shop Now
        </button>

      </div>

    </section>
  `;
}
