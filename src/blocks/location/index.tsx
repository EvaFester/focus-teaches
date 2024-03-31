"use client";
import React from 'react';
import { Text } from '../../components';
import { useDataContext } from "@/contexts";
import styles from './index.module.css';

export const Location = () => {

  const data = useDataContext();

  if (!data) {
      return null;
  }

  const { map } = data;
  return (
    <section className={styles.location}>
      <div className={styles.text}>
           <Text className={styles.title} tag='h2'>{map.title}</Text>
           <Text className={styles.subtitle} tag='span'>{map.subtitle}</Text>
      </div>
          <div className={styles.mapContainer}>
          <iframe className={styles.map} src="https://www.google.com/maps/d/u/1/embed?mid=1fJGAdNuCIyOo8Nfuphl3dzX4n9g4f2c&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>
          </div>
    </section>
  );
}
