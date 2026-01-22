import ContactForm from './components/ContactForm'
import Category from './components/Home/Category'
import Hero from './components/Home/Hero'
import Project from './components/Home/Project'

export default function Home() {
  return (
    <main>
      <Hero />
      <Project />
      <Category />
      <ContactForm />
    </main>
  )
}
