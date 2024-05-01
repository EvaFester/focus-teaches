"use client"

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useDataContext } from "@/contexts";
import { Text } from '../../components';
import styles from './index.module.css';
import { getYoutubeVideoId, fetchVideos } from '@/utils';

SwiperCore.use([Pagination]);


// Пользовательский хук для получения миниатюр YouTube видео из контекста данных и установки их в состояние
const useGalleryEffect = (data: any, setVideos: any) => {
    useEffect(() => {
        if (data) {
            fetchVideos(data, setVideos);
        }
    }, [data, setVideos]);
};

export const Gallery = () => {
    const data = useDataContext();
    const [videos, setVideos] = useState<any[]>([]);
    const [selectedVideoId, setSelectedVideoId] = useState(data ? getYoutubeVideoId(data.gallery.items[0]) : ''); // Изменение этой строки

    useGalleryEffect(data, setVideos);

    if (!data) {
        return null;
    }

    return (
        <section className={styles.Gallery}>
            <Text className={styles.title} tag='h2'>{data.gallery.title}</Text>
            <Text className={styles.subtitle} tag='span'>{data.gallery.subtitle}</Text>
            <div className={styles.wrapper}>
                <iframe className={styles.video}
                    src={`https://www.youtube.com/embed/${selectedVideoId}`}
                    title="YouTube video player"
                ></iframe>
                <Swiper pagination
                    slidesPerView={6}
                    className={styles.list}
                >

                    {videos.map((video, index) => (
                        <SwiperSlide className={styles.thumbnail} key={index}>
                            <img className={styles.img}
                                src={video.thumbnail}
                                alt={`Превью видео ${index + 1}`}
                                onClick={() => setSelectedVideoId(video.id)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
