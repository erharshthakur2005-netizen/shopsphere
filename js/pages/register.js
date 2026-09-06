function registerPage() {

  return `

    <section class="auth-section">

      <div class="auth-card">

        <h1>Create Account 🚀</h1>

        <p>
          Join ShopSphere today
        </p>


        <form id="registerForm">

          <input
            type="text"
            id="registerName"
            placeholder="Full Name"
            required
          >


          <input
            type="email"
            id="registerEmail"
            placeholder="Email"
            required
          >


          <input
            type="password"
            id="registerPassword"
            placeholder="Password"
            minlength="6"
            required
          >


          <button type="submit">
            Create Account
          </button>

        </form>


        <p id="registerMessage"></p>


        <p class="auth-switch">

          Already have an account?

          <a href="/login" data-link>
            Login
          </a>

        </p>

      </div>

    </section>

  `;
}