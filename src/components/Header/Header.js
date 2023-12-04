import './Header.css';
import Logo from '../../Logo.png'

function Header() {
return (
  <nav>
  <input type="checkbox" id="nav-toggle" />
  <div class="logo"><img className='logo' src={Logo} alt="Logo" style={{ height: '100%', width: '50%' }} /></div>
  <ul class="links">
     <li><a href="#home">Home</a></li>
     <li><a href="#about">About</a></li>
     <li><a href="#work">Work</a></li>
     <li><a href="#projects">Projects</a></li>
     <li><a href="#contact">Contact</a></li>
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