import React from 'react'

import styles from './loader.module.css';

const Loader = () => (
    <div className={styles.spinner_parent}>
        <div className={styles.spinner} />
    </div>
)

export default Loader;

