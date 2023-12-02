import './Carousels.css'
import TwoPlayerCarousel from '../Different_Carousels/TwoPlayer/TwoPlayerCarousel'
import TopRatedCarousel from '../Different_Carousels/TopRated/TopRatedCarousel'
import SavedCarousel from '../Different_Carousels/Saved/SavedCarousel'
import FourthCarousel from '../Different_Carousels/Fourth/FourthCarousel'
import FifthCarousel from '../Different_Carousels/Fifth/FifthCarousel'

function Carousels({ games }) {

    return (
        <div className='carousels-container'> 
          <SavedCarousel games={games} />
          
          <TwoPlayerCarousel games={games} />
          <TopRatedCarousel games={games} />
          <FourthCarousel games={games} />
          <FifthCarousel games={games} />
        </div>
    )
}

export default Carousels