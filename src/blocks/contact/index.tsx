"use client"

import { ContactItem, Heading, SocialLink, Text } from "@/components"
import { useDataContext } from "@/contexts"
import styles from './index.module.css'

export const Contact = () => {
  const data = useDataContext()

  if (!data) {
    return null
  }

  return (
    <section className={styles.wrap}>
      <Heading
        title={data.contact.title}
        subtitle={data.contact.subtitle}
        className={styles.heading}
      />
      <ul className={styles.contactList}>
        {data.contact.items.map((item) => <ContactItem key={item.title} {...item}/> )}
      </ul>
      <Text size='S' tag='p' className={styles.socialTitle}>{data.contact.social.title}</Text>
      <ul className={styles.socialList}>
        {data.contact.social.items.map((item) => (
          <li key={item.url}>
            <SocialLink {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
