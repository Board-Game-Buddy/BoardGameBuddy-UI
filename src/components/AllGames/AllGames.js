import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGamesByPage, getGamesByCategories, getGamesByPageAndCategories } from '../../apiCalls';
import GameCard from '../Card/GameCard';
import ServerError from '../ServerError/ServerError';
import '../AllGames/AllGames.css';
import Pagination from '../Pagination/Pagination';
import { useSelector } from 'react-redux';
import LoadingComponent from '../Loading/Loading';
import Slider from '../Slider/Slider';

function AllGames({ currentUser, setServerError, userFaves, handleToggleFavorite }) {
  const { pagenumber } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [currentGames, setCurrentGames] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const favoriteCardsRedux = useSelector((state) => state.favoriteCards[currentUser]);

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Update selected checkboxes state
    setSelectedCheckboxes((prevSelected) => {
      if (checked) {
        // Add the category if it's not already in the state
        if (!prevSelected.includes(value)) {
          return [...prevSelected, value];
        }
      } else {
        // Remove the category if unchecked
        return prevSelected.filter((category) => category !== value);
      }

      return prevSelected; // No change
    });
  };

  const applyFilters = () => {
    setIsLoading(true);
    // Use the current state of selectedCheckboxes
    const selectedCategories = selectedCheckboxes.join(', ');

    getGamesByCategories(selectedCategories)
      .then((data) => {
        setCurrentGames(data.data);
        setTotalPages(data.total_pages);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` });
      })
      .finally(() => {
        setPageNumber(1);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGamesByPage(pageNumber)
      .then((data) => {
        setCurrentGames(data.data);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` });
      });
  }, []);

useEffect(() => {
  setIsLoading(true);
  getGamesByPageAndCategories(pageNumber, selectedCheckboxes.join(', '))
    .then((data) => {
      setCurrentGames(data.data);
      setIsLoading(false);
    })
    .catch((error) => {
      setServerError({ hasError: true, message: `${error.message}` });
    });
}, [pageNumber, setServerError]);

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
        <div className="section-1"><label>
          <input
            type="checkbox"
            name="genre"
            value="Dice"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Dice")}
          />
          Dice
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Card Game"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Card Game")}
          />
          Card Game
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Educational"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Educational")}
          />
          Educational
        </label>
        </div>
        <div className="section-2">
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Children's Game"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Children's Game")}
          />
          Children's Game
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Video Game Theme"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Video Game Theme")}
          />
          Video Game Theme
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Sports"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Sports")}
          />
          Sports
        </label>
        </div>
        <div className="section-3">
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Music"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Music")}
          />
          Music
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Fantasy"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Fantasy")}
          />
          Fantasy
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Memory"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Memory")}
          />
          Memory
        </label>
        </div>
        <div className="section-4">
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Murder/Mystery"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Murder/Mystery")}
          />
          Murder/Mystery
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Party Game"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Party Game")}
          />
          Party Game
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Trivia"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Trivia")}
          />
          Trivia
        </label>
        </div>
       <div className="section-5">
       <label>
          <input
            type="checkbox"
            name="genre"
            value="Horror"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Horror")}
          />
          Horror
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Wargame"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Wargame")}
          />
          Wargame
        </label>
        <label>
          <input
            type="checkbox"
            name="genre"
            value="Puzzle"
            onChange={handleCheckboxChange}
            checked={selectedCheckboxes.includes("Puzzle")}
          />
          Puzzle
        </label>
       </div>
        <button onClick={applyFilters}>Apply Filters</button>
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
