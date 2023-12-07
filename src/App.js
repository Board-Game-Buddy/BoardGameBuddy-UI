import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { getBoardGames, getUsers } from './apiCalls';
import Carousels from "./components/Carousel/Carousels";
import Header from "./components/Header/Header";
import Users from "./components/Users/Users"
import mockUsers from "./mockUsers";
import ServerError from "./components/ServerError/ServerError";
import LoadingComponent from "./components/Loading/Loading";

function App() {
  const [games, setGames] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBoardGames()
      .then((data) => {
        setGames(data.data)
        // setIsLoading(false)
      })
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`})

      })
  }, [])

  // DELETE THIS ONCE WE HAVE A USERS ENDPOINT!
  useEffect(() => {
    setUsers(mockUsers)
    // setIsLoading(false)
    console.log(users)
  }, [])


  // USING MOCK DATA CURRENTLY, UNCOMMENT THIS ONCE THE ENDPOINT IS READY

  // useEffect(() => {
  //   getUsers()
  //     .then((data) => {
  //       setUsers(data.data)
  //     })
  //     .catch((error) => {
  //       setServerError({hasError: true, message: `${error.message}`})

  //     })
  // }, [])

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }

  return (
    <div className="App">
      <Header />
      {serverError.hasError ? (
      <ServerError resetError={resetError} serverError={serverError} />
    ) : isLoading ? (
        <LoadingComponent />
    ) : (
      <Routes>
        <Route
          path='/'
          element={<Users users={users} />}
        />
        <Route
          path='/home'
          element={<Carousels games={games} />}
        />
      </Routes>
    )}
    </div>
  )
}

export default App;
