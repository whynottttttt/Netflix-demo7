import React from "react";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieRecommendationsQuery } from "../../hooks/useMovieRecommendations";
import "./RecommendSection.style.css";

const RecommendSection = ({ movieId }) => {
    const { data: movies, isLoading } = useMovieRecommendationsQuery(movieId);

    if (isLoading) return <div>Loading recommendations...</div>;
    if (!movies || movies.length === 0)
        return <div>No recommendations found.</div>;

    return (
        <div className="recommend-wrapper">
            <Row className="recommend-section justify-content-center">
                {movies.map((movie) => (
                    <Col
                        key={movie.id}
                        xs={10}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4 d-flex justify-content-center"
                    >
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default RecommendSection;