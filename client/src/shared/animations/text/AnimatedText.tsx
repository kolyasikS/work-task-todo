'use client';

import React, {Fragment, useEffect, CSSProperties, useState} from 'react';
import styles from './animated-text.module.scss';
import * as uuid from 'uuid';

type AnimatedTextProps = {
    children: any,
    jumpDist?: number,
    whitespace: number,
    jump: boolean,
    delay?: number,
}
const AnimatedText = (props: AnimatedTextProps) => {
    const [words, setWords] = useState<string[][]>([]);
    useEffect(() => {
        let words = [];
        console.log(props.children);
        if (Array.isArray(props.children)) {
            words = props.children;
        } else {
            words = props.children.split(' ');
        }
        words = words.map((word: string) => word.split(''));
        setWords(words);
    }, [props.children])
    const render = () => {
        let charIndex = 0;
        return words && words.map((word: string[], ind) =>
            <Fragment key={uuid.v4()}>
                <span className={styles.word}>
                    {word.length > 0 ? word.map((char: string) =>
                        <span key={uuid.v4()}
                              style={{animationDelay: `${charIndex++ * (props.delay ?? 10)}ms`, top: `${props.jumpDist ?? 10}px`}}
                              className={`${styles.charAnim} ${props.jump ? styles.jump : ''}`}>
                            {char}
                        </span>) : null}
                    </span>
                <span className={styles.whitespace} style={{width: props.whitespace}}></span>
            </Fragment>
        )
    }
    return (
        render()
    );
};

export default AnimatedText;