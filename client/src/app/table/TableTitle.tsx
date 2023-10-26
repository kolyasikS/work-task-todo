'use client';
import React from 'react';
import AnimatedText from "@shared/animations/text/AnimatedText";

const TableTitle = () => {
    return (
        <h1 className={'min-h-[80px] text-5xl flex justify-center items-start'}>
            <AnimatedText whitespace={15}
                          jump={true}
                          delay={30}
            >
                Welcome to TODO project!
            </AnimatedText>
        </h1>
    );
};

export default TableTitle;