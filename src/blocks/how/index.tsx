"use client"

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useDataContext } from "@/contexts";
import { Text } from '../../components';
import styles from './index.module.css';

SwiperCore.use([Pagination]);

export const How = () => {

    const data = useDataContext();

    // Устанавливаем URL первого видео из данных
    const [videoUrl, setVideoUrl] = useState(data ? data.gallery.items[0].url : '');

    if (!data) {
        return null;
    }

    const videos = data.gallery.items;

    return (
        <section className={styles.how}>
            <Text className={styles.title} tag='h2'>{data.gallery.title}</Text>
            <Text className={styles.text} tag='span'>{data.gallery.subtitle}</Text>
            <div>
                {/* Основной iframe для видео */}
                <iframe className={styles.video}
                    src={videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                {/* Swiper для пагинации с превью */}
                <Swiper pagination slidesPerView={6}>
                    {videos.map((video, index) => (
                        <SwiperSlide key={index}>
                            {/* При клике на миниатюру меняется URL видео */}
                            <img
                                src={video.thumbnail}
                                alt={`Превью видео ${index + 1}`}
                                width="280"
                                height="170"
                                onClick={() => setVideoUrl(video.url)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
