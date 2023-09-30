import React from 'react';
import styles from './Navbar.module.css'; // Assuming you're using CSS Modules

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
  
    return (
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h2>FashionJudge</h2>
        </div>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
        <li className={styles.navItem}><a href="/">Home</a></li>
        <li className={styles.navItem}><a href="/features">Features</a></li>
        <li className={styles.navItem}><a href="/pricing">Pricing</a></li>
        <li className={styles.navItem}><a href="/about">About</a></li>
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
