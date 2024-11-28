import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Dashboard</h2>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/" className={styles.link}>Home</Link></li>
          <li><Link href="/on-chain-certification" className={styles.link}>Mint your SBT</Link></li>

          <li><Link href="/certificate-query" className={styles.link}>Verify your token</Link></li>
          <li><Link href="/ownership-checker" className={styles.link}>Ownership Checker</Link></li>
          <li><Link href="/transfer-restriction" className={styles.link}>Transfer Restriction</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;