import React, { useEffect, useState } from 'react';
import './App.css';

import Movie from './components/Movie';

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getMovies(APIURL);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });

  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCHAPI + searchTerm);

      setSearchTerm('');
    }

  };

  const handleOnchange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input className='search' type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={handleOnchange}
          />
        </form>

      </header>
      <div className='movie-container'>

        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id}{...movie} />)
        }
      </div>
    </>

  );
}

export default App;
