// Modified Footer component (Footer.js or Footer.jsx)

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.logoSection}>
          <img src="/logo-netlify.svg" alt="Netlify Logo" className={styles.logo} />
        </div>

        <div className={styles.linksSection}>
          <div>
            <strong>Online</strong>
            <a href="/features" className={styles.link}>Home</a>
            <a href="/pricing" className={styles.link}>Login</a>
          </div>
          <div>
          <strong>Product</strong>
            <a href="/features" className={styles.link}>Features</a>
            <a href="/pricing" className={styles.link}>Pricing</a>
          </div>
          <div>
            <strong>Legal</strong>
            <a href="/terms" className={styles.link}>Terms of Service</a>
            <a href="/privacy" className={styles.link}>Privacy Policy</a>
          </div>

        </div>

<div className={styles.bottomSection}>
  <div className={styles.poweredBy}>
    Powered by XYZ
  </div>
  <div className={styles.copyright}>
    © 2023 Your Company Name. All rights reserved.
  </div>
</div>

      </div>
    </footer>
  );
}
