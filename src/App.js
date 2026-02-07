import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useRef,useCallback  } from "react";


import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Favorites from "./components/Favorites";
import { SearchMovie } from "./api";

function AppLayout() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const showControls = location.pathname === "/";

  const search = searchParams.get("q");
  const type = searchParams.get("type") || "";
  const page = Number(searchParams.get("page")) || 1;
  const initialized = useRef(false);


  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = useCallback(async () => {
    try {
      const data = await SearchMovie(search, page, type);
      const results = data.Search || [];
      const unique = Array.from(new Map(results.map(m => [m.imdbID, m])).values());
      setMovies(unique.slice(0, 8));
      setTotalPages(Math.ceil((data.totalResults || 8) / 8));
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
  }, [search, page, type]);

  useEffect(() => {
    if (!initialized.current && !searchParams.get("q")) {
      setSearchParams({ q: "batman", page: "1", type: "" });
      initialized.current = true;
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (window.performance?.navigation?.type === 1) {
      window.location.replace("/");
    }
  }, []);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="p-6 flex justify-between items-center gap-4">
        <Link to="/" className="text-3xl font-bold flex gap-3 items-center">
          <i className="fa-solid fa-film text-yellow-400"></i>
          Movie Search App
        </Link>

        {showControls && (
          <>
            <SearchBar
              onSearch={(term) => {
                setMovies([]);
                setSearchParams({ q: term, page: 1, type });
              }}
            />

            <FilterDropdown
              onFilterChange={(val) => {
                setSearchParams({ q: search, page: 1, type: val });
              }}
            />
          </>
        )}

        <Link to="/favorites" className="text-red-500 text-2xl">
          <i className="fa-solid fa-heart"></i>
        </Link>
      </header>

      {/* MAIN */}
      <main className="p-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MovieList
                  movies={movies}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />

                {/* PAGINATION */}
                <div className="flex justify-center gap-6 mt-12 items-center">
                  <button
                    disabled={page === 1}
                    onClick={() =>
                      setSearchParams({ q: search, page: page - 1, type })
                    }
                    className="p-3 bg-gray-700 rounded-full disabled:opacity-40"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>

                  <span className="text-yellow-400 font-semibold">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() =>
                      setSearchParams({ q: search, page: page + 1, type })
                    }
                    className="p-3 bg-gray-700 rounded-full disabled:opacity-40"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </>
            }
          />

          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
