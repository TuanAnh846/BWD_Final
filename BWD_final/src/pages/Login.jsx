import { useState, useEffect } from "react";
import anime from "animejs";
import "../styles/Login.css";

function Login() {
  const [users] = useState({
    admin: { password: "admin123", role: "admin" },
    account: { password: "account123", role: "account" },
  });

  useEffect(() => {
    anime({
      targets: ".login-container",
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [-200, 0],
      duration: 1200,
      easing: "easeOutExpo",
    });
  }, []);

  const sanitizeInput = (input) => {
    return input.replace(/[<>&'"]/g, "").trim();
  };

  const validateUsername = (username, setError) => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError("Username can only contain letters and numbers.");
      return false;
    }
    setError("");
    return true;
  };

  const validatePassword = (password, setError) => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (event, formData, setMessage, setLoading) => {
    event.preventDefault();

    const username = sanitizeInput(formData.username);
    const password = sanitizeInput(formData.password);
    const user = users[username];

    setLoading(true);

    try {
      // Simulate async auth check
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user && user.password === password) {
        setMessage({
          text: `Welcome, ${user.role.toUpperCase()}! Redirecting...`,
          type: "success",
        });

        localStorage.setItem(
          "vibewave_session",
          JSON.stringify({ username, role: user.role })
        );

        setTimeout(() => {
          window.location.href =
            user.role === "admin" ? "admin.html" : "account.html";
        }, 1500);
      } else {
        setMessage({ text: "Invalid username or password.", type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      validateUsername={validateUsername}
      validatePassword={validatePassword}
    />
  );
}

function LoginForm({ onSubmit, validateUsername, validatePassword }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    if (
      !validateUsername(formData.username, setUsernameError) ||
      !validatePassword(formData.password, setPasswordError)
    )
      return;

    onSubmit(e, formData, setMessage, setLoading);
  };

  return (
    <div
      className="login-container"
      role="region"
      aria-labelledby="login-title"
    >
      <h1 id="login-title">Login</h1>
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              validateUsername(e.target.value, setUsernameError);
            }}
            required
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9]+"
            aria-describedby="username-error"
            autoComplete="username"
          />
          {usernameError && (
            <div id="username-error" className="message error" role="alert">
              {usernameError}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              validatePassword(e.target.value, setPasswordError);
            }}
            required
            minLength={6}
            aria-describedby="password-error"
            autoComplete="current-password"
          />
          <span
            className="password-toggle"
            role="button"
            onClick={() => setShowPassword(!showPassword)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowPassword(!showPassword);
              }
            }}
            aria-label="Toggle password visibility"
            tabIndex={0}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          {passwordError && (
            <div id="password-error" className="message error" role="alert">
              {passwordError}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={loading ? "loading" : ""}
        >
          Login
        </button>
      </form>

      <div className="signup-link">
        <p>
          Don't have an account? <a href="signup.html">Sign Up here</a>
        </p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`} role="alert">
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Login;
