import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import Header from './header/Header';

const Layout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
