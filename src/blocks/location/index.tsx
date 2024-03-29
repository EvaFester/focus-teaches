"use client";
import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
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
      <YMaps query={{ apikey: process.env.YMAP_APIKEY}}>
          <div>
              <Map className={styles.map} defaultState={{ center: map.center, zoom: map.zoom, behaviors: ["disable('scrollZoom')"]}}>
                  {map.locations.map((location, index) => (
              <Placemark key={index} geometry={location} />
            ))}
            </Map>
          </div>
      </YMaps>
    </section>
  );
}
