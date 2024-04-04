import { FC } from "react"
import cn from 'classnames'
import { Button } from "../button"
import { Text } from '../text'
import styles from './index.module.css'

type Image = {
  url: string
  alt: string
}

type Price = {
  main: string
  old?: string
}

export type OfferProps = {
  active: boolean
  img: Image
  title: string
  text: string[]
  price: Price
  buttonActiveText: string
  buttonInactiveText: string
  buttonAnchor: string
}

export const Offer: FC<OfferProps> = ({
  active,
  img,
  title,
  text,
  price,
  buttonActiveText,
  buttonInactiveText,
  buttonAnchor,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.wrap}>
        <Text tag='h4' className={styles.title}>{title}</Text>
        <div className={styles.textWrap}>
          {text.map((textItem) => <p className={styles.text} key={textItem}>{textItem}</p>)}
        </div>
        <p className={styles.priceWrap}>
          {price.old ? (<del className={styles.priceOld}>{price.old}</del>) : null}
          <span className={styles.priceMain}>{price.main}</span>
        </p>
        <Button
          tag='a'
          className={styles.cta}
          href={active ? buttonAnchor : undefined}
          disabled={!active}
        >{active ? buttonActiveText : buttonInactiveText}</Button>
      </div>
      <img
        src={img.url}
        alt={img.alt}
        className={cn(styles.img, { [styles.inactive]: !active })}
        loading="lazy"/>
    </article>
  )
}
