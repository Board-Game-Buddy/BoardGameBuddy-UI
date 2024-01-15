import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { getUsers } from './apiCalls';
import Carousels from "./components/Carousel/Carousels";
import Header from "./components/Header/Header";
import SelectedGame from "./components/SelectedGame/SelectedGame";
import Users from "./components/Users/Users";
import ServerError from "./components/ServerError/ServerError";
import LoadingComponent from "./components/Loading/Loading";
import SavedGames from "./components/SavedGames/SavedGames";
import { useApi } from "./apiHooks";
import { useDispatch } from "react-redux";
import { initFavorites } from './Redux/favoriteCardsSlice';
import AllGames from "./components/AllGames/AllGames";

function App() {
  const location = useLocation();
  const [serverError, setServerError] = useState({ hasError: false, message: '' });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [favoritesFetched, setFavoritesFetched] = useState(false);
  const { getUserFavorites } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` });
      });
  }, []);

  useEffect(() => {
    if (currentUser && !favoritesFetched) {
      console.log("Fetching user favorites for user:", currentUser);
  
      getUserFavorites(currentUser)
        .then((data) => {
          console.log("User favorites fetched successfully:", data);
          dispatch(initFavorites({ userID: currentUser, favorites: data }));
          setFavoritesFetched(true);
        })
        .catch((error) => {
          console.error("Error fetching user favorites:", error);
          setServerError({ hasError: true, message: `${error.message}` });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentUser, dispatch, favoritesFetched, getUserFavorites]);

  useEffect(() => {
    if (location.pathname === '/') {
      setCurrentUser(null);
    }
  }, [location.pathname]);

  const resetError = () => {
    setServerError({ hasError: false, message: '' });
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <div className="App">
      <Header resetError={resetError} currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} />
      {serverError.hasError ? (
        <ServerError resetError={resetError} serverError={serverError} currentUser={currentUser} />
      ) : isLoading ? (
        <LoadingComponent />
      ) : (
        <Routes>
          <Route path='/:userid/home'
            element={
              <Carousels
                currentUser={currentUser}
                setServerError={setServerError}
            
              />
            }>
          </Route>
          <Route path='/game/:id'
            element={
              <SelectedGame setServerError={setServerError} currentUser={currentUser}  />
            }>
          </Route>
          <Route
            path='/'
            element={<Users users={users} setCurrentUser={setCurrentUser} />}
          />
          <Route
            path='/:userid/saved'
            element={<SavedGames currentUser={currentUser} setServerError={setServerError} setIsLoading={setIsLoading} isLoading={isLoading}  />}
          />
          <Route
            path='/:userid/:pagenumber'
            element={<AllGames currentUser={currentUser} setServerError={setServerError}  />}
          />
          <Route path='*' element={<ServerError resetError={resetError}  />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
