import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from 'react-dom'
import cn from 'classnames'

import { Text } from '../../../text'
import { Button } from '../../../button'

import styles from './index.module.css'
import { renderLineBreaks } from "@/utils"

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  text: string
  buttonText: string
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, text, buttonText }) => {
  const [show, setShow] = useState(isOpen)
  const [isActive, setIsActive] = useState(isOpen)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleTransitionEnd() {
      setShow(false)
    }

    function handleKeydown(evt: KeyboardEvent) {
      if (['Esc', 'Escape'].includes(evt.key)) {
        onClose()
      }
    }

    let timeout: NodeJS.Timeout | null = null
    const content = contentRef.current;

    if (isOpen) {
      setShow(true)
      timeout = setTimeout(() => setIsActive(true), 100)
      document.addEventListener('keydown', handleKeydown)
    } else {
      setIsActive(false)
      content?.addEventListener('transitionend', handleTransitionEnd)
    }

    return () => {
      content?.removeEventListener('transitionend', handleTransitionEnd)
      document.removeEventListener('keydown', handleKeydown)

      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isOpen, onClose])

  if (!show) {
    return null
  }

  return createPortal(
    <div className={cn(styles.modal, { [styles.modalActive]: isActive })}>
      <div className={styles.backdrop} onClick={onClose}/>
      <div className={styles.content} ref={contentRef}>
        <Text tag="p" className={styles.text}>{renderLineBreaks(text)}</Text>
        <Button tag="button" onClick={onClose}>{buttonText}</Button>
      </div>
    </div>,
    document.body
  )
}
