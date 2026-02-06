import { useState } from "react";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
      setTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>

      <input
        type="text"
        placeholder="Search movies..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-800 text-white
                   border border-gray-600 focus:outline-none
                   focus:ring-2 focus:ring-yellow-400"
      />
    </form>
  );
}

export default SearchBar;
