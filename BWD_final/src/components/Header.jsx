import React from "react";

function Header({ isLoggedIn, navigateWithAnimation }) {
  return (
    <header>
      <h1>HobbyHub</h1>
      <nav className="nav-buttons">
        <button onClick={() => navigateWithAnimation("login.html")}>
          Login
        </button>
        <button onClick={() => navigateWithAnimation("signup.html")}>
          Sign Up
        </button>
        {isLoggedIn && <button aria-label="Explore hobbies">Explore</button>}
      </nav>
    </header>
  );
}

export default Header;
