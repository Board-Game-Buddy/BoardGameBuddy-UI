import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGamesByPage } from '../../apiCalls';
import GameCard from '../Card/GameCard';
import ServerError from '../ServerError/ServerError';
import '../AllGames/AllGames.css';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import LoadingComponent from '../Loading/Loading';

function AllGames({ currentUser, setServerError, userFaves, handleToggleFavorite }) {
  const { pagenumber } = useParams();
  const [pageNumber, setPageNumber] = useState(pagenumber || 1);
  const [currentGames, setCurrentGames] = useState([]);
  const [totalPages, setTotalPages] = useState(7508);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState("");
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser]);

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Update categories state based on checkbox status
    setCategories((prevCategories) => {
      if (checked) {
        // Add the category if checked
        return prevCategories ? `${prevCategories}, ${value}` : value;
      } else {
        // Remove the category if unchecked
        return prevCategories
          .split(", ")
          .filter((category) => category !== value)
          .join(", ");
      }
    });
  };

  useEffect(() => {
    getGamesByPage(pageNumber, categories)
      .then((data) => {
        setCurrentGames(data.data);
        setIsLoading(false);
        setTotalPages(7508);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` });
      });
  }, [pageNumber, setServerError, favoriteCardsRedux, categories]);

  const displayedGames = currentGames.map((game) => (
    <GameCard
      id={game.id}
      key={game.id}
      title={game.attributes.title}
      categories={game.attributes.categories}
      image={game.attributes.image_path}
      description={game.attributes.description}
      min_players={game.attributes.min_players}
      max_players={game.attributes.max_players}
      currentUser={currentUser}
      userFaves={userFaves}
      favoriteCardsRedux={favoriteCardsRedux}
      handleToggleFavorite={handleToggleFavorite}
    />
  ));

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="allgames-container">
      <section className="filters">
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Adventure"
            onChange={handleCheckboxChange}
          />
          Adventure
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Strategy"
            onChange={handleCheckboxChange}
          />
          Strategy
        </label>
        <button>Apply Filters</button>
      </section>
      <div className="allgames">
        {displayedGames}
        {pageNumber > totalPages && <ServerError resetError={() => setPageNumber(1)} />}
        <div className="footer">
          <Pagination currentUser={currentUser} pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default AllGames;
