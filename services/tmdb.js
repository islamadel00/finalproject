import { TMDB_API_KEY } from "@env";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getMoviesByType(type = "popular") {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${type}?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${type} movies:`, error);
    return [];
  }
}
// getMoviesByType("popular");
// getMoviesByType("upcoming");
// getMoviesByType("top_rated");
