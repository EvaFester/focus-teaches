import { DataContextProvider } from '@/contexts'
import data from '../data.json'
import { Header, Hero, Features, Form, Profile, Contact, Catalog, Location } from '@/blocks'

export default function Home() {
  return (
    <DataContextProvider value={data}>
      <Header />
      <main>
        <Hero />
        <Features/>
        <Profile />
        <Catalog type="children"/>
        <Catalog type="adults"/>
        <Location />
        <Form />
        <Contact />
      </main>
    </DataContextProvider>
  )
}
