import { useEffect, useState } from "react";
import anime from "animejs";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const hobbyItems = [
    {
      href: "MusicMain.html",
      image: "https://source.unsplash.com/300x400/?music,guitar",
      title: "Music",
      description: "Create, explore, and share your sounds",
      ariaLabel: "Explore Music hobby",
    },
    {
      href: "comics.html",
      image: "https://source.unsplash.com/300x400/?comics,superhero",
      title: "Comics",
      description: "Explore your favorite universes",
      ariaLabel: "Explore Comics hobby",
    },
    {
      href: "model.html",
      image: "https://source.unsplash.com/300x400/?models,figures,gundam",
      title: "Figures",
      description: "Gundam, figures, creativity",
      ariaLabel: "Explore Figure hobby",
    },
    {
      href: "photography.html",
      image: "https://source.unsplash.com/300x400/?photography,camera",
      title: "Photography",
      description: "Capture moments from your lens",
      ariaLabel: "Explore Photography hobby",
    },
    {
      href: "gaming.html",
      image: "https://source.unsplash.com/300x400/?gaming,controller",
      title: "Gaming",
      description: "Play, stream, connect",
      ariaLabel: "Explore Gaming hobby",
    },
  ];

  const recentPosts = [
    {
      href: "urban-sketching.html",
      image: "https://source.unsplash.com/300x400/?city,sketch,art",
      title: "Urban Sketching",
      description: "By Alex - Capturing city life",
      ariaLabel: "Urban Sketching post by Alex",
    },
    {
      href: "ukulele.html",
      image: "https://source.unsplash.com/300x400/?ukulele,music",
      title: "Ukulele Vibes",
      description: "By Taylor - First chord complete!",
      ariaLabel: "Ukulele Vibes post by Taylor",
    },
    {
      href: "astrophotography.html",
      image: "https://source.unsplash.com/300x400/?night,sky,stars",
      title: "Astrophotography",
      description: "By Morgan - Stunning night shots",
      ariaLabel: "Astrophotography post by Morgan",
    },
  ];

  useEffect(() => {
    const runLoadAnimations = () => {
      anime
        .timeline({
          easing: "easeOutQuad",
        })
        .add({
          targets: "#pageWrapper",
          opacity: [0, 1],
          duration: 1000,
        })
        .add(
          {
            targets: "header",
            opacity: [0, 1],
            translateY: [-40, 0],
            duration: 800,
          },
          "-=600"
        )
        .add(
          {
            targets: ".section-title",
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: anime.stagger(200),
          },
          "-=400"
        )
        .add(
          {
            targets: ".carousel-container .card",
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1000,
            delay: anime.stagger(150),
          },
          "-=400"
        )
        .add(
          {
            targets: "footer",
            opacity: [0, 1],
            duration: 800,
          },
          "-=200"
        );
    };

    runLoadAnimations();

    const enableSmoothScroll = () => {
      document.querySelectorAll(".carousel-container").forEach((container) => {
        container.addEventListener("wheel", (e) => {
          e.preventDefault();
          container.scrollBy({
            left: e.deltaY < 0 ? -100 : 100,
            behavior: "smooth",
          });
        });
      });
    };

    enableSmoothScroll();
  }, []);

  const handleCardClick = (e, href) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to explore this hobby.");
      return;
    }
    navigateWithAnimation(href);
  };

  const navigateWithAnimation = (url) => {
    anime({
      targets: "#curtain",
      scaleY: [0, 1],
      duration: 800,
      easing: "easeInOutQuart",
      begin: () => {
        document.getElementById("curtain").style.pointerEvents = "auto";
      },
      complete: () => {
        window.location.href = url;
      },
    });
  };

  return (
    <>
      <div id="curtain"></div>
      <div id="pageWrapper">
        <Header
          isLoggedIn={isLoggedIn}
          navigateWithAnimation={navigateWithAnimation}
        />

        <main>
          <Carousel
            title="Discover Hobbies"
            items={hobbyItems}
            handleCardClick={handleCardClick}
          />
          <Carousel
            title="Recent Posts"
            items={recentPosts}
            handleCardClick={handleCardClick}
          />
        </main>

        <footer>© 2025 HobbyHub — Built by hobbyists for hobbyists.</footer>
      </div>
    </>
  );
}

export default App;
