import React from "react";

function Card({ href, image, title, description, onClick, ariaLabel }) {
  return (
    <a
      href={href}
      className="card"
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
  );
}

export default Card;
