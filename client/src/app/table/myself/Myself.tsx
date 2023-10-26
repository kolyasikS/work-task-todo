import React from 'react';
import styles from './myself.module.scss';
import Signature from "./Signature";

const Myself = () => {
    return (
        <div className={styles.myself}>
            <h1 className={styles.myself__title}>About myself</h1>
            <p className={styles.myself__bio}>
                Hello, I should say true...
                <br/>I have been working hardly with this project)
                I completed all tasks were in document and passed the English test.
                <br/>It was good experience.
            </p>
            <Signature/>
        </div>
    );
};

export default Myself;