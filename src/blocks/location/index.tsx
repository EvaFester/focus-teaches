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

  const queryString = data.map.places.map(place => place.searchQuery).join(",");
  const encodedQueryString = encodeURIComponent(queryString);
  const embedUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodedQueryString}`;

  return (
    <section className={styles.location}>
      <div className={styles.text}>
        <Text className={styles.title} tag='h2'>{map.title}</Text>
        <Text className={styles.subtitle} tag='span'>{map.subtitle}</Text>
      </div>
      <div className={styles.mapContainer}>
        <iframe className={styles.map} src={embedUrl} width="640" height="480"></iframe>
      </div>
    </section>
  );
}
