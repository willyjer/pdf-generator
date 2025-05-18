import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import { IntroFooterProps } from './types';

const IntroFooter: React.FC<IntroFooterProps> = () => (
  <footer className={styles.footer}>
    <div className={styles.footerContent}>
      <p>© 2025 AstroAware</p>
      <nav className={styles.footerNav}>
        <Link href="/privacy" aria-label="Privacy Policy">Privacy</Link>
        <Link href="/terms" aria-label="Terms of Service">Terms</Link>
        <Link href="/contact" aria-label="Contact Support">Contact</Link>
      </nav>
    </div>
  </footer>
);

export default IntroFooter; 