import { Link } from "react-router-dom";

function Favorites({ favorites }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <i className="fa-solid fa-heart text-red-500 animate-pulse"></i>
        <span className="text-yellow-400">Your Favorites</span>
      </h1>

      {!favorites.length ? (
        <p className="text-gray-400">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
          {favorites.map((movie) => (
            <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="rounded-lg hover:scale-95 transition"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
