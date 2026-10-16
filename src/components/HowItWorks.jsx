import { motion } from 'motion/react'
import Pebble from './Pebble.jsx'
import './HowItWorks.css'

const steps = [
  {
    n: 1,
    title: 'Conversa',
    text: 'A gente conversa sobre o seu negócio, seus clientes e o que você quer mostrar.',
    rotate: -9,
    scale: 1.04,
    dy: 6,
  },
  {
    n: 2,
    title: 'Desenho',
    text: 'Eu desenho a sua página com a sua cara, antes de construir qualquer coisa.',
    rotate: -3,
    scale: 0.94,
    dy: -6,
  },
  {
    n: 3,
    title: 'Construção',
    text: 'Transformo o desenho em site de verdade, rápido e bonito no celular.',
    rotate: -12,
    scale: 1.08,
    dy: 8,
  },
  {
    n: 4,
    title: 'No ar',
    text: 'Revisamos juntos, ajusto o que precisar e o seu site vai ao ar.',
    rotate: -5,
    scale: 0.92,
    dy: -8,
  },
  {
    n: 5,
    title: 'Cuidado',
    text: 'Seu site continua no ar, e eu estou por perto para os pequenos ajustes.',
    rotate: -10,
    scale: 1,
    dy: 3,
  },
]

const pathD = 'M5,20 C120,70 170,-30 260,30 C350,90 400,-20 495,25 C590,70 640,-20 735,30 C800,55 850,10 900,22'

export default function HowItWorks() {
  return (
    <section className="how" id="como-funciona">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="eyebrow how__eyebrow">Como funciona</span>
          <h2 className="how__title">
            Cinco pedras, <span className="italic">um caminho</span> até o seu site.
          </h2>
        </motion.div>

        <div className="how__steps-wrap">
          <svg className="how__path" viewBox="0 0 900 90" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d={pathD}
              fill="none"
              stroke="#5c6650"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            />
          </svg>

          <div className="how__steps">
            {steps.map((step, i) => (
              <motion.div
                className="how__step"
                key={step.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              >
                <span className="how__pebble" style={{ '--dy': `${step.dy}px` }}>
                  <Pebble
                    className="how__pebble-shape"
                    rotate={step.rotate}
                    scale={step.scale}
                  />
                  <span className="how__pebble-n">{step.n}</span>
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
