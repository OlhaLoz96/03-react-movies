import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>({
    id: 0,
    poster_path: "",
    backdrop_path: "",
    title: "",
    overview: "",
    release_date: "",
    vote_average: 0,
  });

  const handleSearch = async (query: string): Promise<void> => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      // console.log(data);

      if (data.length === 0) {
        // alert("No movies found for your request.");
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data);
      // console.log(movies);
    } catch {
      console.log("error");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie({
      id: 0,
      poster_path: "",
      backdrop_path: "",
      title: "",
      overview: "",
      release_date: "",
      vote_average: 0,
    });
  };

  const handleClick = (movie: Movie): void => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid onSelect={handleClick} movies={movies} />
      )}
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </>
  );
}

export default App;
