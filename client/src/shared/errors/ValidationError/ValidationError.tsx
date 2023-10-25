import React from 'react';
import styles from './validation-error.module.scss';
import {Simulate} from "react-dom/test-utils";

type ValidationErrorProps = {
    children: any,
    my?: number
}
const ValidationError = ({children, my}: ValidationErrorProps) => {
    return (
        <p className={`${styles.error}`} style={{
            marginTop: my,
            marginBottom: my,
        }}>{children}</p>
    );
};

export default ValidationError;