import './Carousels.css'
import TwoPlayerCarousel from '../Different_Carousels/TwoPlayer/TwoPlayerCarousel'
import StrategyGamesCarousel from '../Different_Carousels/StrategyGames/StrategyGamesCarousel'
import FantasyGamesCarousel from '../Different_Carousels/FantasyGames/FantasyGamesCarousel'
import CooperativeGamesCarousel from '../Different_Carousels/CooperativeGames/CooperativeGames'

function Carousels({ setServerError }) {
 
  return (
      <div className='carousels-container'> 
        <TwoPlayerCarousel setServerError={setServerError} />
        <StrategyGamesCarousel setServerError={setServerError} />
        <FantasyGamesCarousel setServerError={setServerError} />
        <CooperativeGamesCarousel setServerError={setServerError} />
      </div>
  )
}

export default Carousels