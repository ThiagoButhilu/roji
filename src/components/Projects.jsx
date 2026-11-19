import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import InstagramIcon from './InstagramIcon.jsx'
import projects from '../data/projects.js'
import './Projects.css'

export default function Projects() {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const [active, setActive] = useState(0)

  const scrollToIndex = useCallback((i) => {
    const track = trackRef.current
    const card = cardRefs.current[i]
    if (!track || !card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [])

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    let closest = 0
    let min = Infinity
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const diff = Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft)
      if (diff < min) {
        min = diff
        closest = i
      }
    })
    setActive(closest)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => track.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section className="projects" id="projetos">
      <div className="container">
        <div className="projects__head">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="eyebrow projects__eyebrow">Projetos</span>
            <h2 className="projects__title">
              Sites que já <span className="italic">têm cara</span> de quem eles representam.
            </h2>
          </motion.div>

          <div className="projects__head-actions">
            <a
              className="btn btn-secondary"
              href="https://instagram.com/roji.studioweb"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon size={18} /> Mais no Instagram
            </a>
            <div className="projects__nav">
              <button
                type="button"
                className="projects__nav-btn"
                onClick={() => scrollToIndex(Math.max(0, active - 1))}
                disabled={active === 0}
                aria-label="Projeto anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="projects__nav-btn"
                onClick={() => scrollToIndex(Math.min(projects.length - 1, active + 1))}
                disabled={active === projects.length - 1}
                aria-label="Próximo projeto"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="projects__track" ref={trackRef}>
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              ref={(el) => (cardRefs.current[i] = el)}
              className="project-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.32), ease: 'easeOut' }}
              whileHover="hover"
              variants={{ hover: { y: -6 } }}
            >
              <div className="project-card__frame">
                <div className="project-card__frame-bg">
                  <motion.video
                    src={project.desktopVideo}
                    poster={project.desktopPoster}
                    aria-label={`Site de ${project.name} no computador`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
                <motion.div
                  className="project-card__phone"
                  variants={{ hover: { y: -6 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <video
                    src={project.mobileVideo}
                    poster={project.mobilePoster}
                    aria-label={`Site de ${project.name} no celular`}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
              </div>
              <div className="project-card__body">
                <div className="project-card__title-row">
                  <h3>{project.name}</h3>
                  <span className={`project-card__tag project-card__tag--${project.tagTone}`}>
                    {project.tag}
                  </span>
                </div>
                <p>{project.desc}</p>
                <a href="#contato" className="project-card__link">
                  Ver projeto <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="projects__dots">
          {projects.map((project, i) => (
            <button
              key={project.name}
              type="button"
              className={`projects__dot${i === active ? ' is-active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ver projeto ${project.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
