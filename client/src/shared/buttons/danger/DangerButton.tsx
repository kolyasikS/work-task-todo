import React, {memo} from 'react';
import styles from "./danger-button.module.scss";

type ClassicButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    variant?: string;
    children: any;
    px?: number;
    py?: number
}
const DangerButton = memo(({children, onClick,
                          px, py,
                      }: ClassicButtonProps) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{
                paddingRight: px,
                paddingLeft: px,
                paddingTop: py,
                paddingBottom: py
            }}
        >
            {children}
        </button>
    );
});

DangerButton.displayName = 'DangerButton';
export default DangerButton;