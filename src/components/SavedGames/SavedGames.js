import "./SavedGames.css"
import PropTypes from 'prop-types';
import GameCard from '../Card/GameCard'
import { useSelector } from 'react-redux'
import LoadingComponent from "../Loading/Loading";

function SavedGames({ currentUser }) {
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser]);

  if (!favoriteCardsRedux) {
    return <LoadingComponent />;
  }

  if (favoriteCardsRedux.length === 0) {
    return (
      <div className="no-tracked">
        <h2 className="no-tracked-text">You do not have any saved games.</h2>
      </div>
    );
  }

  const savedGamesCards = favoriteCardsRedux.map((game) => (
    <GameCard
      id={game.id}
      key={game.id}
      title={game.title}
      image={game.image_path}
      currentUser={currentUser}
    />
  ))

  return (
    <div className="savedgames">
      {savedGamesCards}
    </div>
    )
}

export default SavedGames;

SavedGames.propTypes = {
  currentUser: PropTypes.number,
};