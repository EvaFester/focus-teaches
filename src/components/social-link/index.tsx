import { FC } from 'react'
import cn from 'classnames'

import styles from './index.module.css'

export type SocialLinkProps = {
  img: string
  url: string
  color: string
  className?: string
}

export const SocialLink: FC<SocialLinkProps> = ({ img, url, color, className }) => {
  return (
    <a
      className={cn(styles.link, className)}
      style={{
        backgroundColor: color,
        backgroundImage: `url(${img})`,
      }}
      href={url}
      target="_blank"
    ></a>
  )
}
