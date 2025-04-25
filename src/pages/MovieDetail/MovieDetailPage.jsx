import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import "./MovieDetailPage.style.css";
import { Badge, Container } from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import MovieRecommend from "./MovieRecommend"
import MovieReview from "./MovieReview"
import TrailerModal from "./TrailerModal";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie } = useMovieDetailQuery(id);
  const { data: genreData } = useMovieGenreQuery();
  const { data: videoData } = useMovieVideoQuery(id)
  const [tab, setTab] = useState("review")
  const [showTrailer, setShowTrailer] = useState(false)

  if (!movie) return <div>Loading...</div>

  const trailer = videoData?.results?.find(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  )
  const videoId = trailer?.key;

  const showGenres = () => {
    if (!genreData) return [];
    return movie.genres.map((genre) => (
      <Badge bg="danger" className="me-2" key={genre.id}>
        {genre.name}
      </Badge>
    ))
  }


  return (
    <Container className="movie-detail-container mb-5">
      <div className="movie-top-area d-flex flex-column flex-md-row">
        <div className="poster-area">
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
        </div>
        <div className="info-area ms-md-4 mt-3 mt-md-0">
          <h2>{movie.title}</h2>
          <div className="genres">{showGenres()}</div>
          <p className="overview">{movie.overview}</p>
          <div className="detail-info">
            <p>인기도: {movie.popularity.toLocaleString()}</p>
            <p>개봉일: {movie.release_date}</p>
            <p>예산: ${movie.budget.toLocaleString()}</p>
          </div>
          {videoId && (
            <button
              className="btn btn-outline-danger mt-2"
              onClick={() => setShowTrailer(true)}
            >
              예고편 보기
            </button>
          )}
        </div>
      </div>

      <div className="movie-tab-buttons mt-4">
        <button
          className={`btn btn-${tab === "review" ? "danger" : "light"} me-2`}
          onClick={() => setTab("review")}
        >
          Reviews
        </button>
        <button
          className={`btn btn-${tab === "recommend" ? "danger" : "light"}`}
          onClick={() => setTab("recommend")}
        >
          Recommendations
        </button>
      </div>

      <div className="movie-tab-content mt-3">
        {tab === "review" ? (
          <MovieReview movieId={id} />
        ) : (
          <MovieRecommend movieId={id} />
        )}
      </div>
      {videoId && (
        <TrailerModal
          show={showTrailer}
          handleClose={() => setShowTrailer(false)}
          videoId={videoId}
        />
      )}
    </Container>
  );
};

export default MovieDetailPage;