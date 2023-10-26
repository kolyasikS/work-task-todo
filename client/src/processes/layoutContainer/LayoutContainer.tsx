'use client'
import React, {useEffect} from 'react';
import styles from './layoutContainer.module.scss';
import {useDispatch} from "react-redux";
import MainTheme from "../theme/MainTheme";

const LayoutContainer = ({children}: {children: any}) => {
    return (
        <>
            <main className={styles.layoutContainer}>
                <div className={styles.layoutContainer__inner}>
                    <MainTheme>
                        {children}
                    </MainTheme>
                </div>
            </main>
        </>
    );
};

export default LayoutContainer;