import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Homepage.style.css'
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';

// 1. 배너 => popular 영화를 들고와서 첫번째 아이템을 보여주자
// 2. popular movie
// 3. top rated mobie
// 4. upcoming movie

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
};

export default Homepage;
