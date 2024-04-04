"use client"

import React from 'react';
import { useDataContext } from "@/contexts";
import Image from 'next/image';
import { Text, Button } from '../../components';
import styles from './index.module.css';

// Функция для разбиения строки на строки по символу \n
const RenderLineBreaks = (text: string) => {
    return text.split('\n').map((line: string, index: number) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
};

export const Profile = () => {
    const data = useDataContext();

    if (!data) {
        return null;
    }

    return (
        <section className={styles.profile}>
            <div className={styles.wrapper}>
                <blockquote className={styles.blockquote}>
                    <p className={styles.quote}>&Prime;{data.profile.quote}&Prime;</p>
                    <cite className={styles.cite}>{RenderLineBreaks(data.profile.author)}</cite>
                </blockquote>
                <Text className={styles.description} tag='span'>
                    {RenderLineBreaks(data.profile.achievements)}
                </Text>
            </div>
            <img className={styles.image} src={data.profile.img.src}  width="770" height="831" loading='lazy' alt={data.profile.img.alt}/>
            <Button tag='a' target="_blank" href={data.profile.link} className={styles.button}>{data.profile.cta}</Button>
        </section>
    );
};
