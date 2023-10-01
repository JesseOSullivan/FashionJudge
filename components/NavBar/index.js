import styles from './NavBar.module.css';
import React, { useState, useEffect } from 'react';



const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    const isDesktop = windowWidth >= 768;  // You can adjust the 768px breakpoint as needed
    const imageWidth = isDesktop ? '200%' : '100%';
  
    return (
      <nav className={styles.navbar}>
        <div className={styles.logoSection}>
        <a href="/">
        <img 
      src="/nav-logo.svg" 
      alt="Logo" 
      style={{ maxWidth: '500px', height: 'auto' }} 
    />
      </a>
        </div>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
        </ul>
        <div className={styles.authButtons}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </nav>
    );
  };
  export default Navbar;
