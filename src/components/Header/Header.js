import './Header.css';
import Logo from '../../Logo.png'
import { Link, useParams } from 'react-router-dom';

function Header( {resetError, currentUser} ) {

return (
  <nav>
  <input type="checkbox" id="nav-toggle" />
  <img className='logo' src={Logo} />
 <ul class="links">
  <Link to={`/${currentUser}/home`}><li>Home</li></Link>
  <Link to={`/${currentUser}/saved`}><li>Saved Games</li></Link>
     {/* <li><a href="#projects">All Games</a></li> */}
 </ul>
 <label for="nav-toggle" class="icon-burger">
     <div class="line"></div>
     <div class="line"></div>
     <div class="line"></div>
 </label>
</nav>
  )
}

export default Header