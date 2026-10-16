import { useEffect, useRef, useState } from 'react'
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

function useZigzagPath() {
  const wrapRef = useRef(null)
  const pebbleRefs = useRef([])
  const [path, setPath] = useState('')
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const measure = () => {
      const wrapRect = wrap.getBoundingClientRect()
      const points = pebbleRefs.current.map((el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          x: r.left + r.width / 2 - wrapRect.left,
          y: r.top + r.height / 2 - wrapRect.top,
        }
      })

      if (points.some((p) => !p)) return

      let d = `M${points[0].x},${points[0].y}`
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1]
        const cur = points[i]
        const midY = (prev.y + cur.y) / 2
        d += ` C${prev.x},${midY} ${cur.x},${midY} ${cur.x},${cur.y}`
      }

      setPath(d)
      setSize({ w: wrapRect.width, h: wrapRect.height })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrap)
    window.addEventListener('resize', measure)
    const timeouts = [100, 400].map((ms) => setTimeout(measure, ms))

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          measure()
          setInView(true)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(wrap)

    return () => {
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('resize', measure)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return { wrapRef, pebbleRefs, path, size, inView }
}

export default function HowItWorks() {
  const { wrapRef, pebbleRefs, path, size, inView } = useZigzagPath()

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

        <div className="how__steps-wrap" ref={wrapRef}>
          <svg className="how__path how__path--desktop" viewBox="0 0 900 90" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d={pathD}
              fill="none"
              stroke="#F2EEE7"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            />
          </svg>

          <svg
            className="how__path how__path--mobile"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
            aria-hidden="true"
          >
            {path && (
              <motion.path
                d={path}
                fill="none"
                stroke="#F2EEE7"
                strokeWidth="2"
                strokeDasharray="2 10"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              />
            )}
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
                <span
                  className="how__pebble"
                  style={{ '--dy': `${step.dy}px` }}
                  ref={(el) => {
                    pebbleRefs.current[i] = el
                  }}
                >
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
