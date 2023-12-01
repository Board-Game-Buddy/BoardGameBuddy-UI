import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { getBoardGames } from './apiCalls';
import Carousels from "./components/Carousel/Carousels";
import Header from "./components/Header/Header";

function App() {
  const [games, setGames] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})

  useEffect(() => {
    getBoardGames()
      .then((data) => {
        setGames(data.data)
      })
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`})

      })
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/'
            element={
              <Carousels
                games={games}
              />
            }>
          </Route>
      </Routes>
    </div>
  )
}

export default App;
