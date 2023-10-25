'use client'
import React, {useEffect} from 'react';
import styles from './layoutContainer.module.scss';
import {useDispatch} from "react-redux";
import {setUser} from "../../lib/store/slices/user.slice";
import MainTheme from "../theme/MainTheme";

const LayoutContainer = ({children}: {children: any}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = window.localStorage.getItem('user');

        if (user) {
            dispatch(setUser(JSON.parse(user)));
        }
    }, []);

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