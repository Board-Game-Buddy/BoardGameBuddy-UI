import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { getBoardGames, getUsers } from './apiCalls';
import Carousels from "./components/Carousel/Carousels";
import Header from "./components/Header/Header";
import SelectedGame from "./components/SelectedGame/SelectedGame";
import Users from "./components/Users/Users"
import mockUsers from "./mockUsers";

function App() {
  const [games, setGames] = useState([])
  const [serverError, setServerError] = useState({hasError: false, message: ''})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getBoardGames()
      .then((data) => {
        setGames(data.data)
      })
      .catch((error) => {
        setServerError({hasError: true, message: `${error.message}`})
      })
  }, [])

  const resetError = () => {
    setServerError({hasError: false, message: ''})
  }
  
  // DELETE THIS ONCE WE HAVE A USERS ENDPOINT!
  useEffect(() => {
    setUsers(mockUsers)
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

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/user:userid/home'
            element={
              <Carousels
                games={games}
              />
            }>
          </Route>
          <Route path='/game/:id'
            element={
              <SelectedGame setServerError={setServerError} />
            }>
          </Route>
        <Route
          path='/'
          element={<Users users={users} />}
        />
      </Routes>
    </div>
  )
}

export default App;
