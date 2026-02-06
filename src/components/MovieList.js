import { Link } from "react-router-dom";



function MovieList({ movies, favorites, onToggleFavorite }) {
  if (!movies.length) {
    return (
      <h2 className="text-center text-red-400 text-2xl mt-10">
        No movies found.
      </h2>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {movies.map((movie) => {
        const isFav = favorites.some((f) => f.imdbID === movie.imdbID);

        return (
          <div
            key={movie.imdbID} // ✅ unique key (no warning)
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg
                       hover:scale-95 transition"
          >
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.jpg"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/no-image.jpg";
                }}
                alt={movie.Title}
                className="w-full h-72 object-contain bg-black"
              />
            </Link>

            <div className="p-4">
              <h3 className="font-bold text-lg">{movie.Title}</h3>
              <p className="text-gray-400">{movie.Year}</p>

              <button
                onClick={() => onToggleFavorite(movie)}
                className="mt-3 text-xl"
              >
                <i
                  className={`fa-heart ${isFav
                      ? "fa-solid text-red-500"
                      : "fa-regular text-gray-400"
                    }`}
                ></i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieList;
