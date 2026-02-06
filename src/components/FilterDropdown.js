function FilterDropdown({ onFilterChange }) {
  return (
    <select
      onChange={(e) => onFilterChange(e.target.value)}
      className="px-4 py-2 rounded-lg bg-gray-800 text-white
                 border border-gray-600 focus:ring-2 focus:ring-yellow-400"
    >
      <option value="">All</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
    </select>
  );
}

export default FilterDropdown;
