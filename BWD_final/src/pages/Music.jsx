import { useState, useEffect } from "react";
import "../styles/Music.css";

function Music() {
  const [songs] = useState([
    {
      title: "Heat Waves",
      artist: "Glass Animals",
      genre: "Indie Pop",
      cover: "cover/heat-wave.jpg",
      audio: "audio/Heat Waves.mp3",
    },
    // ... (rest of the songs array)
  ]);

  const [playlist, setPlaylist] = useState([]);
  const [filter, setFilter] = useState({ genre: "All", search: "" });
  const [showMenu, setShowMenu] = useState(false);

  const addToPlaylist = (title) => {
    setPlaylist([...playlist, title]);
  };

  const handleAudioPlay = (e) => {
    const clickedAudio = e.target.closest(".music-card").querySelector("audio");

    document.querySelectorAll("audio").forEach((audio) => {
      if (audio !== clickedAudio) audio.pause();
    });

    if (clickedAudio.paused) {
      clickedAudio.play();
    } else {
      clickedAudio.pause();
    }
  };

  const filteredSongs = songs.filter((song) => {
    const matchesGenre =
      filter.genre === "All" ||
      song.genre.toLowerCase() === filter.genre.toLowerCase();
    const matchesSearch =
      song.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      song.artist.toLowerCase().includes(filter.search.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <>
      <header>
        <h1>VibeWave Music</h1>
      </header>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          ☰
        </button>
        <div
          className="menu-items"
          style={{ display: showMenu ? "block" : "none" }}
        >
          <label htmlFor="genreSelect">Genre:</label>
          <select
            id="genreSelect"
            value={filter.genre}
            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
          >
            <option value="All">All</option>
            <option value="Pop">Pop</option>
            <option value="Rock">Rock</option>
            {/* Add other genre options */}
          </select>
        </div>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs or artists..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        />
      </div>

      <main className="container">
        {filteredSongs.map((song, index) => (
          <div key={index} className="music-card">
            <div className="image-wrapper">
              <img src={song.cover} alt={song.title} />
              <div className="play-btn" onClick={handleAudioPlay}>
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <h2>{song.title}</h2>
            <p>
              {song.artist} • {song.genre}
            </p>
            <audio>
              <source src={song.audio} type="audio/mpeg" />
            </audio>
            <button
              className="add-btn"
              onClick={() => addToPlaylist(song.title)}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </main>

      <div className="playlist">
        <h2>Your Playlist</h2>
        <ul>
          {playlist.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>

      <div className="bottom-nav">
        <button onClick={() => (window.location.href = "hobbyhub.html")}>
          Go to HobbyHub
        </button>
      </div>
    </>
  );
}

export default Music;
