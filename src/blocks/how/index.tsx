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
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyBdg7x6owYbb_7iVE_Hjw0cvyfFqpNraIU`);
        const data = await response.json();
        return data.items[0].snippet.thumbnails.default.url;
    };

    return (
        <section className={styles.how}>
            <Text className={styles.title} tag='h2'>{data.gallery.title}</Text>
            <Text className={styles.text} tag='span'>{data.gallery.subtitle}</Text>
            <div>
                {/* Основной iframe для видео */}
                <iframe className={styles.video}
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoUrl)}`} // Используем полученный идентификатор в URL
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                {/* Swiper для пагинации с превью */}
                <Swiper pagination slidesPerView={6} className={styles.list}>
                    {thumbnails.map((thumbnail, index) => (
                        <SwiperSlide key={index}>
                            {/* При клике на миниатюру меняется URL видео */}
                            <img
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
