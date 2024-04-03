"use client"

import { Heading, Offer } from "@/components"
import { useDataContext } from "@/contexts"
import styles from './index.module.css'

export const Catalog = () => {
  const data = useDataContext()

  if (!data) {
    return null
  }

  return (
    <section className={styles.wrap}>
      <Heading title={data.catalog.title} subtitle={data.catalog.subtitle} className={styles.heading}/>
      <ul className={styles.list}>
        {data.catalog.items.map((item) => (
          <li key={item.title} className={styles.item}>
            <Offer
              {...item}
              buttonAnchor={data.cta_anchor}
              buttonActiveText={data.catalog.activeCta}
              buttonInactiveText={data.catalog.inactiveCta}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
