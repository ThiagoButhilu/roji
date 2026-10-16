import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Idea from './components/Idea.jsx'
import Features from './components/Features.jsx'
import Projects from './components/Projects.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Idea />
        <Features />
        <Projects />
        <HowItWorks />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
