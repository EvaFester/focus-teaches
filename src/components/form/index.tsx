"use client"

import { ResponseDto } from '@/dto/order.dto'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"

import styles from './index.module.css'
import { Button } from '../button'
import { Modal } from './components/modal'
import { useDataContext } from '@/contexts'

const REGEXP = /\d/g

// TODO: validation error msg
// TODO: allow one extra character for phone number
export const Form = () => {
  const data = useDataContext()
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const phoneRef = useRef<HTMLInputElement>(null)
  const [showModal, setShowModal] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const index = phone.split('').findLastIndex((char) => REGEXP.test(char)) + 1
    phoneRef.current?.setSelectionRange(index, index)
  }, [phoneRef, phone])

  if (!data) {
    return null
  }
  const mask = data.form.phone.mask
  const maskPlug = data.form.phone.mask_plug
  const modalData = isError ? data.form.modal.error : data.form.modal.success

  function updatePhone(evt: ChangeEvent<HTMLInputElement>) {
    const digits = evt.target.value.startsWith(mask[0])
      ? evt.target.value.match(REGEXP)?.slice(1)
      : evt.target.value.match(REGEXP);

    if (!digits?.length) {
      setPhone('')
      return
    }

    let digitIndex = 0

    let result = mask.replaceAll(maskPlug, (plug) => {
      if (digits[digitIndex]) {
        return digits[digitIndex++]
      }

      return plug
    })

    setPhone(result)
  }

  function handlePhoneFocus() {
    if (!phone) {
      setPhone(mask)
    }
  }

  function handlePhoneBlur() {
    if (phone === mask) {
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
      setShowModal(true)
      setIsError(false)
    } catch {
      setShowModal(true)
      setIsError(true)
    }
    setLoading(false)
  }

  function handleModalClose() {
    setShowModal(false)
  }

  return (
    <form action="/api/order" encType="multipart/form-data" method="POST" onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.wrap}>
        <span className={styles.label}>
          {data.form.phone.label} <span className={styles.asterisk}>*</span>
        </span>
        <input
          value={phone}
          onChange={updatePhone}
          onFocus={handlePhoneFocus}
          onBlur={handlePhoneBlur}
          ref={phoneRef}
          className={styles.input}
          placeholder={data.form.phone.mask}
          type="text"
          name="phone"
          required
        />
      </label>
      <label className={styles.wrap}>
        <span className={styles.label}>{data.form.name.label}</span>
        <input
          value={name}
          onChange={updateName}
          className={styles.input}
          type="text"
          name="name"
          placeholder={data.form.name.placeholder}
          />
      </label>
      <Button tag="button" type="submit" disabled={loading} className={styles.submit}>{data.form.cta}</Button>
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        text={modalData.text}
        buttonText={modalData.button}
      />
    </form>
  )
}
