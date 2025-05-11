import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode to the document body when state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.darkNav : ''}`}>
      <div className={styles.navbarLogo}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="https://dcassetcdn.com/design_img/3740755/40061/22582613/1fa01qn9tq7dhzpyhssahpxvzb_image.jpg"
            alt="Medical Logo"
            className={styles.logoImage}
          />
          <h1>Medi<span className={styles.cureText}>cure</span></h1>
        </Link>
      </div>
      
      <ul className={styles.navbarMenu}>
        <li className={styles.navItem}>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Home
          </NavLink>
        </li>
        
        <li className={styles.navItem}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            About
          </NavLink>
        </li>
        
        <li className={styles.navItem}>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Services
          </NavLink>
        </li>
        
        <li className={styles.navItem}>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Contact
          </NavLink>
        </li>

        <li className={`${styles.navItem} ${styles.themeToggle}`}>
          <button 
            className={styles.toggleButton} 
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun size={20} className={styles.toggleIcon} />
            ) : (
              <Moon size={20} className={styles.toggleIcon} />
            )}
            <span className={styles.toggleSlider}>
              <span className={`${styles.toggleCircle} ${darkMode ? styles.toggleActive : ''}`}></span>
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;