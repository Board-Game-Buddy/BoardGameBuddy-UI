import './Carousels.css'
import TwoPlayerCarousel from '../Different_Carousels/TwoPlayer/TwoPlayerCarousel'
import StrategyGamesCarousel from '../Different_Carousels/StrategyGames/StrategyGamesCarousel'
import Slider from '../Different_Carousels/Swiper/Swiper'


function Carousels({ currentUser, setServerError }) {
  if (currentUser === null) {
    window.location.href = '/';
    return null;
  }
 
    return (
        <div className='carousels-container'> 
          <TwoPlayerCarousel setServerError={setServerError} />
          <StrategyGamesCarousel setServerError={setServerError} />
        </div>
    )
}

export default Carousels