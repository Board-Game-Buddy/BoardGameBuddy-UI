import './Carousels.css'
import PropTypes from 'prop-types';
import TwoPlayerCarousel from '../Different_Carousels/TwoPlayer/TwoPlayerCarousel'
import StrategyGamesCarousel from '../Different_Carousels/StrategyGames/StrategyGamesCarousel'
import FantasyGamesCarousel from '../Different_Carousels/FantasyGames/FantasyGamesCarousel'
import CooperativeGamesCarousel from '../Different_Carousels/CooperativeGames/CooperativeGames'
import SavedCarousel from '../Different_Carousels/Saved/SavedCarousel';

function Carousels({ setServerError, currentUser, userFaves}) {
 
  return (
      <div className='carousels-container'>
        <SavedCarousel setServerError={setServerError} currentUser={currentUser} userFaves={userFaves} /> 
        <TwoPlayerCarousel setServerError={setServerError} currentUser={currentUser} userFaves={userFaves} />
        <StrategyGamesCarousel setServerError={setServerError} currentUser={currentUser} userFaves={userFaves} />
        <FantasyGamesCarousel setServerError={setServerError} currentUser={currentUser} userFaves={userFaves} />
        <CooperativeGamesCarousel setServerError={setServerError} currentUser={currentUser} userFaves={userFaves} />
      </div>
  )
}

export default Carousels

Carousels.propTypes = {
  setServerError: PropTypes.func.isRequired,
};

