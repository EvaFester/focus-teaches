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

const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

SwiperCore.use([Pagination]);


export const How = () => {

    const data = useDataContext();
    const [thumbnails, setThumbnails] = useState<string[]>([]);

    // Устанавливаем URL первого видео из данных
    const [videoUrl, setVideoUrl] = useState(data ? data.gallery.items[0].url : '');

    useEffect(() => {
        if (data) {
            // Получаем миниатюры для видео
            const fetchThumbnails = async () => {
                const thumbnails = await Promise.all(data.gallery.items.map(async (video) => {
                    const youtubeId = getYoutubeVideoId(video.url);
                    if (youtubeId) {
                        const thumbnailUrl = await getThumbnailUrl(youtubeId);
                        return thumbnailUrl;
                    } else {
                        return null;
                    }
                }));
                setThumbnails(thumbnails.filter(thumbnail => thumbnail !== null)); // Убираем все null из массива
            };
            fetchThumbnails();
        }
    }, [data]);

    if (!data) {
        return null;
    }

    const videos = data.gallery.items;

    // Функция для извлечения идентификатора YouTube видео из URL
    const getYoutubeVideoId = (url: string) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return match[2];
        } else {
            console.error('Invalid YouTube video URL');
            return null;
        }
    };

    // Функция для получения URL миниатюры YouTube видео по его идентификатору
    const getThumbnailUrl = async (videoId: string) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`);
        const data = await response.json();
        return data.items[0].snippet.thumbnails.default.url;
    };

    return (
        <section className={styles.how}>
            <Text className={styles.title} tag='h2'>{data.gallery.title}</Text>
            <Text className={styles.subtitle} tag='span'>{data.gallery.subtitle}</Text>
            <div className={styles.wrapper}>
                {/* Основной iframe для видео */}
                <iframe className={styles.video}
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrl)}`} // Используем полученный идентификатор в URL
                    title="YouTube video player"
                ></iframe>

                {/* Swiper для пагинации с превью */}
                <Swiper pagination
                    slidesPerView={6}
                    className={styles.list}
                    spaceBetween={2}>

                    {thumbnails.map((thumbnail, index) => (
                        <SwiperSlide className={styles.thumbnail} key={index}>
                            {/* При клике на миниатюру меняется URL видео */}
                            <img className={styles.img}
                                src={thumbnail}
                                alt={`Превью видео ${index + 1}`}
                                onClick={() => setVideoUrl(videos[index].url)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};