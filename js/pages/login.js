function loginPage() {

  return `

    <section class="auth-section">

      <div class="auth-card">

        <h1>Welcome Back 👋</h1>

        <p>
          Login to your ShopSphere account
        </p>


        <form id="loginForm">

          <input
            type="email"
            id="loginEmail"
            placeholder="Email"
            required
          >


          <input
            type="password"
            id="loginPassword"
            placeholder="Password"
            required
          >


          <button type="submit">
            Login
          </button>

        </form>


        <p id="loginMessage"></p>


        <p class="auth-switch">

          Don't have an account?

          <a href="/register" data-link>
            Register
          </a>

        </p>

      </div>

    </section>

  `;
}