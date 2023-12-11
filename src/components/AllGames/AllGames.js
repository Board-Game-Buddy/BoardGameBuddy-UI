// AllGames.js
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGamesByPage } from '../../apiCalls';
import GameCard from '../Card/GameCard';
import ServerError from '../ServerError/ServerError';
import '../AllGames/AllGames.css';
import Pagination from '../Pagination/Pagination';

function AllGames({ currentUser, setServerError }) {
  const { pagenumber } = useParams();
  const [pageNumber, setPageNumber] = useState(pagenumber || 1);
  const [currentGames, setCurrentGames] = useState([]);
  const [totalPages, setTotalPages] = useState(7508);

  useEffect(() => {
    getGamesByPage(pageNumber)
      .then((data) => {
        setCurrentGames(data.data);
        // You need to set the total pages based on your data
        setTotalPages(/* Set total pages based on your data */);
      })
      .catch((error) => {
        setServerError({ hasError: true, message: `${error.message}` });
      });
  }, [pageNumber, setServerError]);

  useEffect(() => {
    console.log(currentGames);
  }, [currentGames]);

  const displayedGames = currentGames.map((game) => (
    <GameCard
      id={game.id}
      key={game.key}
      title={game.attributes.title}
      categories={game.attributes.categories}
      image={game.attributes.image_path}
      description={game.attributes.description}
      min_players={game.attributes.min_players}
      max_players={game.attributes.max_players}
      currentUser={currentUser}
    />
  ));

  return (
    <div className="allgames">
      {displayedGames}
      {pageNumber > totalPages && <ServerError resetError={() => setPageNumber(1)} />}
      <div className="footer">
        <Pagination currentUser={currentUser} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
}

export default AllGames;
