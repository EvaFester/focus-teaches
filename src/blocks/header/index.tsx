"use client"

import { useDataContext } from "@/contexts"
import { Text, Button } from '../../components'
import styles from './index.module.css'

export const Header = () => {
  const data = useDataContext()

  if (!data) {
    return null
  }

  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        <div className={styles.logoTop}>{data.header.logo.top}</div>
        <div className={styles.logoBottom}>{data.header.logo.bottom}</div>
      </a>
      <ul className={styles.menu}>
        <li>
          <a href='' className={styles.menuLink}>
            <Text tag='span'>{data.header.menu.children}</Text>
          </a>
        </li>
        <li>
          <a href='' className={styles.menuLink}>
            <Text tag='span'>{data.header.menu.adults}</Text>
          </a>
        </li>
        <li>
          <a href={data.header.phone.url} className={styles.menuLink}>
            <Text tag='span'>{data.header.phone.text}</Text>
          </a>
        </li>
      </ul>
      <Button tag='a' className={styles.cta} href={data.cta_anchor}>{data.header.cta}</Button>
    </header>
  )
}
