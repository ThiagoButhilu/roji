import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import InstagramIcon from './InstagramIcon.jsx'
import projects from '../data/projects.js'
import './Projects.css'

export default function Projects() {
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
          <a
            className="btn btn-secondary"
            href="https://instagram.com/roji.studioweb"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={18} /> Mais no Instagram
          </a>
        </div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              className="project-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: 'easeOut' }}
              whileHover="hover"
              variants={{ hover: { y: -6 } }}
            >
              <div className="project-card__frame">
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
                <motion.div
                  className="project-card__phone"
                  variants={{ hover: { y: -6 } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="project-card__phone-bezel">
                    <video
                      src={project.mobileVideo}
                      poster={project.mobilePoster}
                      aria-label={`Site de ${project.name} no celular`}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
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
      </div>
    </section>
  )
}
