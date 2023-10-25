import React from 'react';
import styles from '../styles/page-item.module.scss';

type PageProps = {
    num: number | string,
    isActive: boolean,
    setActive: (value: any) => void,
    value: any
}
const Page = ({num, isActive, setActive, value}: PageProps) => {
    return (
        <li className={`${styles.page} ${isActive && styles.isActive}`}
            onClick={() => setActive(value)}>
            <span className={styles.number}>{num}</span>
        </li>
    );
};

export default Page;