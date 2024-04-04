import { FC } from 'react'
import cn from 'classnames'

import styles from './index.module.css'
import { Text } from '../text'

export type ContactItemProps = {
  img: string
  title: string
  subtitle: string
  url?: string
  className?: string
}

export const ContactItem: FC<ContactItemProps> = ({ img, title, subtitle, url, className }) => {

  return (
    <li className={cn(styles.wrap, className)}>
      <span className={styles.icon} style={{ backgroundImage: `url(${img})` }} />
      <Text className={styles.title} tag='p' size='S'>{title}</Text>
      <a className={styles.subtitle} href={url}>
        <Text tag='p' size='S' bold>{subtitle}</Text>
      </a>
    </li>
  )
}
