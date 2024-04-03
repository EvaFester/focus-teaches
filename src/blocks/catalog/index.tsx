"use client"
import { FC } from "react"
import { Heading, Offer } from "@/components"
import { useDataContext } from "@/contexts"
import styles from './index.module.css'

export type CatalogProps = {
  type: 'children' | 'adults';
}

export const Catalog: FC<CatalogProps> = ({ type }) => {
  const data = useDataContext()

  if (!data) {
    return null
  }

  return (
    <section className={styles.wrap} id={data.catalog[type].anchor.slice(1)}>
      <Heading
        title={data.catalog[type].title}
        subtitle={data.catalog[type].subtitle}
        className={styles.heading}
      />
      <ul className={styles.list}>
        {data.catalog[type].items.map((item) => (
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
