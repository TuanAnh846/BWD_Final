import React from "react";
import Card from "./card";

function Carousel({ title, items, handleCardClick }) {
  return (
    <section>
      <h2 className="section-title">{title}</h2>
      <div
        className="carousel-container"
        role="region"
        aria-label={`${title} carousel`}
      >
        {items.map((item, index) => (
          <Card
            key={index}
            href={item.href}
            image={item.image}
            title={item.title}
            description={item.description}
            onClick={(e) => handleCardClick(e, item.href)}
            ariaLabel={item.ariaLabel}
          />
        ))}
      </div>
    </section>
  );
}

export default Carousel;
