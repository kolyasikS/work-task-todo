import React from 'react';
import styles from './loading.module.scss';
import {ClipLoader} from "react-spinners";

type LoadingProps = {
    isLoading: boolean
}

const Loading = ({isLoading}: LoadingProps) => {
    return (
        isLoading && <div className={styles.loading}>
            <ClipLoader
                color={'#fff'}
                loading={isLoading}
                size={50}
            />
        </div>
    );
};

export default Loading;