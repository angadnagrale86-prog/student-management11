export function Signup({ onLogin, onSuccess }) {
  function attachEvents() {
    const form = document.querySelector("#signupForm");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.querySelector("#signupName").value.trim();

      const email = document
        .querySelector("#signupEmail")
        .value.trim()
        .toLowerCase();

      const password =
        document.querySelector("#signupPassword").value;

      if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Signup failed.");
          return;
        }

        alert("Account created successfully!");

        if (typeof onSuccess === "function") {
          onSuccess(data.user);
        }
      } catch (error) {
        console.error("Signup error:", error);

        alert(
          "Unable to connect to server. Please try again."
        );
      }
    });

    const loginButton =
      document.querySelector("#loginButton");

    if (loginButton) {
      loginButton.addEventListener("click", () => {
        if (typeof onLogin === "function") {
          onLogin();
        }
      });
    }
  }

  setTimeout(attachEvents, 0);

  return `
    <div class="auth-page">

      <div class="auth-card">

        <div class="brand-mark">
          SH
        </div>

        <h1>
          Student<span>Hub</span>
        </h1>

        <p class="auth-subtitle">
          Academic Management System
        </p>

        <h2>
          Create Account
        </h2>

        <form id="signupForm">

          <label>
            Full Name

            <input
              id="signupName"
              type="text"
              placeholder="Enter your name"
              autocomplete="name"
              required
            />
          </label>

          <label>
            Email

            <input
              id="signupEmail"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
              required
            />
          </label>

          <label>
            Password

            <input
              id="signupPassword"
              type="password"
              placeholder="Create a password"
              autocomplete="new-password"
              minlength="6"
              required
            />
          </label>

          <button
            type="submit"
            class="primary-action"
          >
            Create Account
          </button>

        </form>

        <p class="auth-switch">
          Already have an account?

          <button
            type="button"
            id="loginButton"
            class="text-btn"
          >
            Login
          </button>
        </p>

      </div>

    </div>
  `;
}