import { FC, MouseEventHandler, MouseEvent, ReactNode } from 'react'
import cn from 'classnames'
import styles from './index.module.css'
import { getAnchorClickHandler } from '@/utils';

export type ButtonProps = {
  tag: 'button' | 'a';
  children: ReactNode;
  className?: string;
  type?: HTMLButtonElement['type'];
  href?: string;
  target?: HTMLAnchorElement['target'];
  rel?: HTMLAnchorElement['rel'];
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}

export const Button: FC<ButtonProps> = ({ className, tag, type, href, target, rel, children, disabled, onClick }) => {

  function handleAnchorClick(evt: MouseEvent<HTMLAnchorElement>) {
    if (href) {
      getAnchorClickHandler(href)(evt)
    }

    onClick?.(evt)
  }

  if (tag === 'a') {
    return <a
      className={cn(styles.button, { [styles.disabled]: disabled }, className)}
      href={href}
      target={target}
      rel={rel}
      onClick={handleAnchorClick}
    >{children}</a>
  }

  return <button
    className={cn(styles.button, { [styles.disabled]: disabled }, className)}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >{children}</button>
}
