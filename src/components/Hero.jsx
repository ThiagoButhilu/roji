import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import InstagramIcon from './InstagramIcon.jsx'
import showcaseProjects from '../data/projects.js'
import './Hero.css'

const floatingChips = [
  {
    label: 'Mapa e endereço',
    tone: 'light',
    left: '49.69%',
    top: '4.56%',
    rotate: -2,
    delay: 0,
  },
  {
    label: 'Horários',
    tone: 'salvia',
    left: '10.87%',
    top: '17.54%',
    rotate: -4,
    delay: 0.6,
  },
  {
    label: 'Botão do WhatsApp',
    tone: 'terracota',
    left: '69.88%',
    top: '15.44%',
    rotate: 3,
    delay: 1.2,
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => {
        if (showcaseProjects.length < 2) return i
        let next = i
        while (next === i) {
          next = Math.floor(Math.random() * showcaseProjects.length)
        }
        return next
      })
    }, 9000)
    return () => clearInterval(id)
  }, [])

  const project = showcaseProjects[active]

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="eyebrow hero__eyebrow">露地 · o caminho até o seu jardim</span>
          <h1 className="hero__title">
            Seu negócio, <span className="italic">num só lugar</span> da internet.
          </h1>
          <p className="hero__lead">
            Sites e landing pages bonitos, profissionais e únicos para negócios locais. Tudo o que
            o seu cliente precisa, numa página só.
          </p>
          <div className="hero__actions">
            <a href="#contato" className="btn btn-primary">
              Pedir orçamento
            </a>
            <a
              href="https://instagram.com/roji.studioweb"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <InstagramIcon size={18} /> Ver no Instagram
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          <div className="hero__stage">
            <div className="hero__laptop">
              <div className="hero__laptop-screen">
                <AnimatePresence mode="wait">
                  <motion.video
                    key={project.desktopVideo}
                    src={project.desktopVideo}
                    poster={project.desktopPoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={`Site do ${project.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </AnimatePresence>
              </div>
              <div className="hero__laptop-base" />
            </div>

            <div className="hero__phone" style={{ rotate: 3 }}>
              <div className="hero__phone-bezel">
                <AnimatePresence mode="wait">
                  <motion.video
                    key={project.mobileVideo}
                    src={project.mobileVideo}
                    poster={project.mobilePoster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={`Site do ${project.name} no celular`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {floatingChips.map((chip) => (
              <motion.span
                key={chip.label}
                className={`hero__chip hero__chip--${chip.tone}`}
                style={{ left: chip.left, top: chip.top, rotate: chip.rotate }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
              >
                {chip.label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero__strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container hero__strip-inner">
          <span className="eyebrow">Alguns projetos</span>
          <div className="hero__strip-names">
            {showcaseProjects.map((p) => (
              <span key={p.name}>{p.name}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
