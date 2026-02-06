import axios from "axios";

const API_KEY = "2a41f79";
const API_URL = "https://www.omdbapi.com/";

export const SearchMovie = async (searchTerm, page = 1, type = "") => {
  const response = await axios.get(
    `${API_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}&type=${type}`
  );
  return response.data;
};

export const MovieDetails = async (id) => {
  const response = await axios.get(
    `${API_URL}?apikey=${API_KEY}&i=${id}`
  );
  return response.data;
};
