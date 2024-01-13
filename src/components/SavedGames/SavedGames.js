import "./SavedGames.css"
import PropTypes from 'prop-types';
import GameCard from '../Card/GameCard'
import { useSelector, useDispatch } from 'react-redux'
import { useApi } from "../../apiHooks";
import { initFavorites } from "../../Redux/favoriteCardsSlice";
import { useState, useEffect } from "react";
import { getSelectedGame } from "../../apiCalls";
import LoadingComponent from "../Loading/Loading";

function SavedGames({ currentUser, setServerError }) {
  const [loading, setLoading] = useState(true);
  const [favoritesFetched, setFavoritesFetched] = useState(false);
  const [renderedGames, setRenderedGames] = useState([]);
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser]);
  const dispatch = useDispatch();
  const { getUserFavorites } = useApi();
  // Fetch and initialize the user's favorite games when the component mounts
  useEffect(() => {
    if (!favoritesFetched) {
      const fetchUserFavorites = async () => {
        try {
          const userFavorites = await getUserFavorites(currentUser);
          dispatch(initFavorites({ userID: currentUser, favorites: userFavorites }));
          setFavoritesFetched(true);
        } catch (error) {
          console.error("Error fetching user favorites:", error);
          setServerError({ hasError: true, message: `${error.message}` });
        }
      };
      fetchUserFavorites();
    }
  }, [currentUser, setServerError, dispatch, getUserFavorites, favoritesFetched]);

  // Use a separate useEffect to update the rendered games when favoriteCardsRedux changes
  useEffect(() => {
    setLoading(true)
    const renderGameCards = async () => {
      try {
        const gamesToRender = [];

        // Check if favoriteCardsRedux is still loading
        if (!favoriteCardsRedux) {
          return gamesToRender;
        }

        // Convert favoriteCardsRedux into an array if it's not already
        const favoriteCardsArray = Array.isArray(favoriteCardsRedux) ? favoriteCardsRedux : [];

        for (const game of favoriteCardsArray) {
          try {
            const selectedGameData = await getSelectedGame(game.id);
            gamesToRender.push(
              <GameCard
                id={selectedGameData.data.id}
                key={selectedGameData.data.id}
                title={selectedGameData.data.attributes.title}
                image={selectedGameData.data.attributes.image_path}
                currentUser={currentUser}
              />
            );
          } catch (error) {
            console.error(`Error fetching selected game with ID ${game.id}:`, error);
            setServerError({ hasError: true, message: `${error.message}` });
          }
        }

        setRenderedGames(gamesToRender);
      } catch (error) {
        console.error("Error rendering game cards:", error);
        setServerError({ hasError: true, message: `${error.message}` });
      } finally {
        setLoading(false);
      }
    };

    renderGameCards();
  }, [currentUser, setServerError, favoriteCardsRedux]);

  if (loading) {
    // Render a loading indicator when still loading
    return <LoadingComponent />;
  }

  if (!favoriteCardsRedux) {
    // Render nothing if favoriteCardsRedux is null or undefined
    return null;
  }

  if (favoriteCardsRedux.length === 0) {
    return (
      <div className="no-tracked">
        <h2 className="no-tracked-text">You do not have any saved games.</h2>
      </div>
    );
  } else {
    return <div className="savedgames">{renderedGames}</div>;
  }
}

export default SavedGames;

SavedGames.propTypes = {
  currentUser: PropTypes.number,
};