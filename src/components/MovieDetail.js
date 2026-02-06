import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MovieDetails } from "../api";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    MovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) {
    return <h2 className="text-center text-2xl">Loading...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto flex gap-10 mt-10">
      <img src={movie.Poster} alt={movie.Title} className="w-72 rounded-xl" />

      <div>
        <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
        <p className="mb-2"><b>Year:</b> {movie.Year}</p>
        <p className="mb-2"><b>Genre:</b> {movie.Genre}</p>
        <p className="mb-4"><b>Actors:</b> {movie.Actors}</p>
        <p>{movie.Plot}</p>

        <Link to="/" className="inline-block mt-6 text-yellow-400">
          <i className="fa-solid fa-arrow-left"></i> Back to Search
        </Link>
      </div>
    </div>
  );
}

export default MovieDetail;
