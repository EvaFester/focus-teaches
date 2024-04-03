import { DataContextProvider } from '@/contexts'
import data from '../data.json'
import { Header, Hero, Features, Form, Profile, Contact, Catalog } from '@/blocks'
export default function Home() {
  return (
    <DataContextProvider value={data}>
      <Header />
      <main>
        <Hero />
        <Features/>
        <Profile />
        <Catalog />
        <Form />
        <Contact />
      </main>
    </DataContextProvider>
  )
}
