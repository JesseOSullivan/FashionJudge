import React from 'react';
import styles from './NavBar.module.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
  
    return (
      <nav className={styles.navbar}>
        <div className={styles.logoSection}>
        <img src="/nav-logo.svg" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
        <li className={styles.navItem}><a href="/">Home</a></li>
        <li className={styles.navItem}><a href="/pricing">Pricing</a></li>
        <li className={styles.navItem}><a href="/contact">Contact</a></li>
        </ul>
        <div className={styles.authButtons}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </nav>
    );
  };
  export default Navbar;
