"use client";
import React from 'react';
import { Text } from '../../components';
import { useDataContext } from "@/contexts";
import styles from './index.module.css';


const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const Location = () => {
  const data = useDataContext();

  if (!data) {
    return null;
  }

  const { map } = data;

  // TODO: works only for 5 places max (why?)
  const encodedQueryString = encodeURIComponent(map.places.join(","));
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodedQueryString}&zoom=${map.zoom}`;

  return (
    <section className={styles.location}>
      <div className={styles.text}>
        <Text className={styles.title} tag='h2'>{map.title}</Text>
        <Text className={styles.subtitle} tag='span'>{map.subtitle}</Text>
      </div>
      <div className={styles.mapContainer}>
        <iframe className={styles.map} src={embedUrl} width="640" height="480" loading="lazy"></iframe>
      </div>
    </section>
  );
}
