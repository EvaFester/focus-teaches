import { DataContextProvider } from '@/contexts'
import data from '../data.json'
import { Header, Hero, Features, Form, Profile, Contact, Catalog, How, Location, Gallery } from '@/blocks'

export default function Home() {
  return (
    <DataContextProvider value={data}>
      <Header />
      <main>
        <Hero />
        <Features />
        <Profile />
        <How />
        <Gallery />
        <Catalog type="children" />
        <Catalog type="adults" />
        <Location />
        <Form />
        <Contact />
      </main>
    </DataContextProvider>
  )
}
