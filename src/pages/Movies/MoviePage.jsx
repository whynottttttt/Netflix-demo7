import React, { useEffect, useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.style.css";
import CustomPagination from "../../common/Pagination/CustomPagination";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useGenreMovieQuery } from "../../hooks/useGenreMovie";


// 경로 2가지
// navbar에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련 된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때 마다 page 바꿔주기
// page 값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const keyword = query.get("q");
  const navigate = useNavigate();
  const { data: genreList } = useMovieGenreQuery();

  const isGenreMode = selectedGenre !== null && !keyword;

  const {
    data: searchData,
    isLoading: searchLoading,
    isError: searchError,
    error: searchErrorMsg,
  } = useSearchMovieQuery({ keyword, page });

  const {
    data: genreData,
    isLoading: genreLoading,
    isError: genreError,
    error: genreErrorMsg,
  } = useGenreMovieQuery({ genreId: selectedGenre, page });

  const finalData = isGenreMode ? genreData : searchData;
  const isLoading = isGenreMode ? genreLoading : searchLoading;
  const isError = isGenreMode ? genreError : searchError;
  const error = isGenreMode ? genreErrorMsg : searchErrorMsg;


  // keyword가 바뀌면 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  // query params가 바뀔 때 필터 초기화
  useEffect(() => {
    const currentKeyword = query.get("q");
    if (!currentKeyword) {
      setPage(1);
      setSortOption("default");
      setSelectedGenre(null);
      navigate("/movies");
    } else {
      setPage(1);
      setSortOption("default");
      setSelectedGenre(null);
    }
  }, [query, navigate]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  const getSortedMovies = (movies, option) => {
    switch (option) {
      case "popuarity":
        return [...movies].sort((a, b) => b.popularity - a.popularity);
      default:
        return movies;
    }
  }

  // 영화 데이터 처리 및 정렬
  const movies = finalData?.results || [];

  // 정렬 적용
  const sortedMovies = [...movies].sort((a, b) =>
    sortOrder === "desc"
      ? b.popularity - a.popularity
      : a.popularity - b.popularity
  );

  const noResultsMessage = (
    <Alert variant="danger" className="text-center">
      검색 결과가 없습니다.
    </Alert>
  );

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <h5>정렬</h5>
          <Dropdown onSelect={(eventKey) => setSortOrder(eventKey)}>
            <Dropdown.Toggle
              variant="danger"
              id="dropdown-basic"
              style={{ cursor: "pointer" }}
            >
              {sortOrder === "desc" ? "인기순 높은순" : "인기순 낮은순"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="desc">인기순 높은순</Dropdown.Item>
              <Dropdown.Item eventKey="asc">인기순 낮은순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h5 className="mt-4">장르</h5>
          <Dropdown onSelect={(eventKey) => setSelectedGenre(eventKey === "null" ? null : Number(eventKey))}>
            <Dropdown.Toggle
              variant="danger"
              id="dropdown-genre"
              style={{ cursor: "pointer", width: "33%" }}
            >
              {selectedGenre
                ? genreList?.find((genre) => genre.id === selectedGenre)?.name
                : "장르"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ maxHeight: "300px", width: "33%" }}>
              <Dropdown.Item eventKey="null" active={selectedGenre === null}>
                장르
              </Dropdown.Item>
              {genreList?.map((genre) => (
                <Dropdown.Item
                  key={genre.id}
                  eventKey={genre.id}
                  active={selectedGenre === genre.id}
                >
                  {genre.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col lg={8} xs={12}>
          {sortedMovies.length === 0 && noResultsMessage}

          <Row className="g-4 mb-4">
            {sortedMovies.map((movie, index) => (
              <Col key={index} lg={4} xs={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          {!isLoading &&
            !isError &&
            sortedMovies.length > 0 &&
            finalData?.total_pages > 1 && (
              <CustomPagination
                page={page}
                setPage={setPage}
                totalPages={finalData?.total_pages}
              />
            )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;