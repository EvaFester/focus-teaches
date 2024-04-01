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
        <iframe className={styles.map} src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCvZxzZgqnVqKMUXpcaWDLU80T42OnTDkQ&q=PFXM%2BFM%20Filyovsky%20Park%20District%2C%20Moscow%2C%20Russia%2C%20PHC6%2B92%20Khamovniki%20District%2C%20Moscow%2C%20Russia%2C%20QC3R%2BQC%20Krylatskoye%20District%2C%20Moscow%2C%20Russia%2C%20PJJ3%2BHC%20Yakimanka%20District%2C%20Moscow%2C%20RC32%2BJFW%20Strogino%20District%2C%20Moscow%2C%20Russia%2C%20QH42%2B6G8%20Presnensky%20District%2C%20Moscow" width="640" height="480"></iframe>
      </div>
    </section>
  );
}
