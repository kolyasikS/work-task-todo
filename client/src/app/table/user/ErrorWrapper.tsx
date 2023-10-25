import React from 'react';
import styles from '../styles/error-wrapper.module.scss';
import ClassicInput from "@shared/inputs/classic/ClassicInput";
import ValidationError from "@shared/errors/ValidationError/ValidationError";

type ErrorWrapperProps = {
    value?: any,
    setValue?: (value: any) => void,
    error: any,
    title?: string;
    children?: any;
}
const ErrorWrapper = ({value, setValue, children, error, title}: ErrorWrapperProps) => {
    return (
        <div className={styles.error__wrapper}>
            {children
                ? children
                : setValue && <ClassicInput
                    value={value}
                    setValue={setValue}
                    error={error}
                >
                    {title}
                </ClassicInput>
            }
            {error && <div className={'absolute -bottom-7'}>
                <ValidationError>{error}</ValidationError>
            </div>}
        </div>
    );
};

export default ErrorWrapper;