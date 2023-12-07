import './Header.css';
import Logo from '../../Logo.png'

function Header() {
return (
  <nav>
  <input type="checkbox" id="nav-toggle" />
  <img className='logo' src={Logo} />
 <ul class="links">
     <li><a href="#home">Home</a></li>
     <li><a href="#work">Saved Games</a></li>
     <li><a href="#projects">All Games</a></li>
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