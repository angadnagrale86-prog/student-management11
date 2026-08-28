export function Login({ onSignup, onSuccess }) {
  function attachEvents() {
    const form = document.querySelector("#loginForm");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document
        .querySelector("#loginEmail")
        .value
        .trim()
        .toLowerCase();

      const password =
        document.querySelector("#loginPassword").value;

      const error = document.querySelector("#loginError");

      if (error) {
        error.textContent = "";
      }

      try {
        const API_URL =
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (error) {
            error.textContent =
              data.message ||
              "Invalid email or password.";
          }

          return;
        }

        localStorage.setItem(
          "campusUser",
          JSON.stringify(data.user)
        );

        if (typeof onSuccess === "function") {
          onSuccess(data.user);
        }

      } catch (err) {
        console.error("Login error:", err);

        if (error) {
          error.textContent =
            "Unable to connect to server.";
        }
      }
    });

    const signupButton =
      document.querySelector("#signupButton");

    if (signupButton) {
      signupButton.addEventListener("click", () => {
        if (typeof onSignup === "function") {
          onSignup();
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
          Welcome Back
        </h2>

        <form id="loginForm">

          <label>
            Email

            <input
              id="loginEmail"
              type="email"
              placeholder="Enter your email"
              autocomplete="email"
              required
            />
          </label>

          <label>
            Password

            <input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              autocomplete="current-password"
              required
            />
          </label>

          <p
            id="loginError"
            class="login-error"
          ></p>

          <button
            type="submit"
            class="primary-action"
          >
            Login
          </button>

        </form>

        <p class="auth-switch">
          Don't have an account?

          <button
            type="button"
            id="signupButton"
            class="text-btn"
          >
            Sign Up
          </button>
        </p>

      </div>

    </div>
  `;
}