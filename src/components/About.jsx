import { motion } from 'motion/react'
import './About.css'

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="container about__inner">
        <motion.div
          className="about__stones"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img src="/images/brand/roji-stones-carvao.png" alt="" />
        </motion.div>

        <motion.div
          className="about__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <span className="eyebrow about__eyebrow">Sobre o nome</span>
          <h2 className="about__title">
            Roji é o caminho de pedras que <span className="italic">leva ao jardim.</span>
          </h2>
          <p>
            Na tradição japonesa, o roji (露地) é a trilha de pedras que conduz até o jardim de
            chá. Cada pedra guia o passo de quem chega.
          </p>
          <p>
            É assim que penso um site: um caminho claro, calmo e bonito que leva o seu cliente até
            você.
          </p>
          <div className="about__signature">
            <span className="about__signature-line" />
            Por trás da Roji: Thiago, desenvolvedor de software
          </div>
        </motion.div>
      </div>
    </section>
  )
}
