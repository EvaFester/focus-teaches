"use client"

import { ResponseDto } from '@/dto/order.dto'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

import styles from './index.module.css'
import { Button } from '../button'

const MASK = '+7 (___) ___-__-__'
const MASK_PLUG = '_'
const REGEXP = /\d/g

// TODO: validation error msg
// TODO: success/error modal
// TODO: allow one extra character for phone number
export const Form = () => {
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const phoneRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const index = phone.split('').findLastIndex((char) => REGEXP.test(char)) + 1
    phoneRef.current?.setSelectionRange(index, index)
  }, [phoneRef, phone])

  function updatePhone(evt: ChangeEvent<HTMLInputElement>) {
    const digits = evt.target.value.startsWith(MASK[0])
      ? evt.target.value.match(REGEXP)?.slice(1)
      : evt.target.value.match(REGEXP);

    if (!digits?.length) {
      setPhone('')
      return
    }

    let digitIndex = 0

    let result = MASK.replaceAll(MASK_PLUG, (plug) => {
      if (digits[digitIndex]) {
        return digits[digitIndex++]
      }

      return plug
    })

    setPhone(result)
  }

  function handlePhoneFocus() {
    if (!phone) {
      setPhone(MASK)
    }
  }

  function handlePhoneBlur() {
    if (phone === MASK) {
      setPhone('')
    }
  }

  function updateName(evt: ChangeEvent<HTMLInputElement>) {
    setName(evt.target.value)
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    if (phone.length < MASK.length || !name.length) {
      return
    }

    setLoading(true)

    try {
      const formData = new FormData(evt.currentTarget)
      const response = await fetch('/api/order', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('not ok')
      }

      const data: ResponseDto = await response.json()

      if (!data.success) {
        throw new Error('no success')
      }

      setPhone(MASK)
      setName('')
    } catch {
    }
    setLoading(false)
  }

  return (
    <form action="/api/order" encType="multipart/form-data" method="POST" onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.wrap}>
        <span className={styles.label}>
          Телефон <span className={styles.asterisk}>*</span>
        </span>
        <input
          value={phone}
          onChange={updatePhone}
          onFocus={handlePhoneFocus}
          onBlur={handlePhoneBlur}
          ref={phoneRef}
          className={styles.input}
          placeholder={MASK}
          type="text"
          name="phone"
          required
        />
      </label>
      <label className={styles.wrap}>
        <span className={styles.label}>Ваше имя</span>
        <input
          value={name}
          onChange={updateName}
          className={styles.input}
          type="text"
          name="name"
          placeholder="Введите имя"
          />
      </label>
      <Button tag="button" type="submit" disabled={loading} className={styles.submit}>Записаться на занятие</Button>
    </form>
  )
}
