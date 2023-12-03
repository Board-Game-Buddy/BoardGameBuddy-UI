import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import GameCard from '../../Card/GameCard';

function Slider({ games }) {
  const saved = games.map(game => (
    <SwiperSlide key={game.id}>
      <GameCard
        id={game.id}
        title={game.attributes.title}
        categories={[game.attributes.categories]}
        image={game.attributes.cover_image}
        description={game.attributes.description}
        min_players={game.attributes.min_players}
        max_players={game.attributes.max_players}
      />
    </SwiperSlide>
  ));

  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper"
            slidesPerView={5}
            slidesPerGroup={5}
            spaceBetween={0}
            direction='horizontal'
            speed={500}
            loop={true}
    >
      {saved}
    </Swiper>
  );
}

export default Slider;