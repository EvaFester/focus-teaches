"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useDataContext } from "@/contexts";
import { Text } from '../../components';
import styles from './index.module.css';

SwiperCore.use([Navigation, Pagination]);

interface Feature {
    img: {
        src: string;
        alt: string;
    };
    title: string;
    text: string;
}

function SlideCard({ feature }: { feature: Feature }) {
    return (
        <div className={styles.slideContent}>
             <img className={styles.image} src={feature.img.src} alt={feature.img.alt} width="122" height="122" />
            <div>
                <Text className={styles.title} tag='h2'>{feature.title}</Text>
                <Text className={styles.text} tag='span'>{feature.text}</Text>
            </div>
        </div>
    );
}

const InitSlider: React.FC = () => {
    const data = useDataContext();

    if (!data) {
        return null;
    }

    const { features } = data;

    return (
        <Swiper className={styles.list}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            navigation={{
                prevEl: '.buttonPrev',
                nextEl: '.buttonNext',
            }}
            pagination={{
                clickable: true,
                el: '.pagination',
                renderBullet: function (index, className) {
                    return `<div class="${className} ${styles.customBullet}"></div>`;
                },
            }}
            breakpoints={{

                1024:{
                    slidesPerView: 3,
                    spaceBetween: 10,
                },

                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
            }}
        >
            {features.map((feature: Feature, index: number) => (
                <SwiperSlide key={index} className={styles.slide}>
                    <SlideCard feature={feature} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export const Features = () => {
    return (
        <section className={styles.features}>
            <button className={`buttonPrev ${styles.button} ${styles.buttonPrev}`}></button>
            <InitSlider />
            <button className={`buttonNext ${styles.button} ${styles.buttonNext}`}></button>
            <div className={`pagination ${styles.customPagination}`}>
            </div>
        </section>
    )
}
