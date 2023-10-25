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
                I completed all tasks were in document and apart from them I wanted to create animation of russian ship&apos;s sinking,
                but it would take some time and you asked me to send the project as fast as I can so next time).
                Anyway it was good experience.
            </p>
            <Signature/>
        </div>
    );
};

export default Myself;