import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import StoneMark from './StoneMark.jsx'
import './Idea.css'

const tags = ['Horários', 'Mapa', 'WhatsApp', 'Serviços']

const desktopChips = [
  { label: 'Instagram', left: '0%', top: '7.7%', filled: false },
  { label: 'WhatsApp', left: '10.9%', top: '28.8%', filled: false },
  { label: 'Google Maps', left: '1.6%', top: '48.1%', filled: false },
  { label: 'Cardápio em PDF', left: '14.1%', top: '67.3%', filled: false },
  { label: 'Indicação de amigo', left: '3.1%', top: '86.5%', filled: false },
]

// wide: used once the chip zone has enough room for the longer pills to not clip
const mobileChipsWide = [
  { label: 'Instagram', left: '2%', top: '0%' },
  { label: 'WhatsApp', left: '70%', top: '11%' },
  { label: 'Google Maps', left: '8%', top: '25%' },
  { label: 'Cardápio em PDF', left: '68%', top: '41%' },
  { label: 'Indicação de amigo', left: '13%', top: '57%' },
]

// compact: narrower phones, where the wide left% would push long labels off-screen
const mobileChipsCompact = [
  { label: 'Instagram', left: '2%', top: '0%' },
  { label: 'WhatsApp', left: '52%', top: '11%' },
  { label: 'Google Maps', left: '8%', top: '25%' },
  { label: 'Cardápio em PDF', left: '36%', top: '41%' },
  { label: 'Indicação de amigo', left: '13%', top: '57%' },
]

const WIDE_BREAKPOINT = 680

const connectorPaths = [
  'M141 62 C 241 62, 250 330, 340 330',
  'M202 172 C 302 172, 250 344, 340 344',
  'M169 272 C 269 272, 250 358, 340 358',
  'M285 372 C 385 372, 250 372, 340 372',
  'M242 472 C 342 472, 250 386, 340 386',
]

const CARD_INSET = 26

function MobileIdeaDiagram() {
  const zoneRef = useRef(null)
  const chipRefs = useRef([])
  const cardRef = useRef(null)
  const [paths, setPaths] = useState([])
  const [inView, setInView] = useState(false)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [isWide, setIsWide] = useState(true)
  const activeChips = isWide ? mobileChipsWide : mobileChipsCompact
  const measureRef = useRef(() => {})

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    const measure = () => {
      const card = cardRef.current
      if (!card) return
      const zoneRect = zone.getBoundingClientRect()
      const cardRect = card.getBoundingClientRect()
      const tx = cardRect.left + cardRect.width / 2 - zoneRect.left
      const ty = cardRect.top - zoneRect.top + CARD_INSET

      const next = chipRefs.current.map((el) => {
        if (!el) return ''
        const r = el.getBoundingClientRect()
        const x = r.left + r.width / 2 - zoneRect.left
        const y = r.bottom - zoneRect.top
        const midY = y + (ty - y) * 0.55
        return `M${x},${y} C${x},${midY} ${tx},${midY} ${tx},${ty}`
      })

      setPaths(next)
      setSize({ w: zoneRect.width, h: zoneRect.height })
      setIsWide((prev) => {
        const next = zoneRect.width >= WIDE_BREAKPOINT
        return prev === next ? prev : next
      })
    }

    measureRef.current = measure
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(zone)
    window.addEventListener('resize', measure)
    const timeouts = [100, 400].map((ms) => setTimeout(measure, ms))

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          measure()
          setInView(true)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(zone)

    return () => {
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('resize', measure)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  // chip positions just swapped (compact <-> wide): re-measure once the new layout commits
  useEffect(() => {
    const raf = requestAnimationFrame(() => measureRef.current())
    return () => cancelAnimationFrame(raf)
  }, [isWide])

  return (
    <div className="idea__chip-zone" ref={zoneRef}>
      <svg
        className="idea__lines"
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        aria-hidden="true"
      >
        {paths.map(
          (d, i) =>
            d && (
              <motion.path
                key={activeChips[i].label}
                d={d}
                fill="none"
                stroke="#7a736a"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: 'easeOut' }}
              />
            ),
        )}
      </svg>

      <div className="idea__chips">
        {activeChips.map((chip, i) => (
          <motion.span
            key={chip.label}
            ref={(el) => {
              chipRefs.current[i] = el
            }}
            className="idea__chip idea__chip--floating"
            style={{ left: chip.left, top: chip.top }}
            initial={{ opacity: 0, y: -12 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
          >
            {chip.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="idea__card-anchor"
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <MockCard />
      </motion.div>
    </div>
  )
}

function MockCard({ className = '' }) {
  return (
    <div className={`idea__card ${className}`}>
      <div className="idea__card-head">
        <StoneMark size={22} color="#2B2925" />
        <span>Seu negócio</span>
      </div>
      <p className="idea__card-title">Tudo o que você faz, num só lugar.</p>
      <div className="idea__card-skeleton">
        <span style={{ width: '82%' }} />
        <span style={{ width: '60%' }} />
      </div>
      <div className="idea__card-tags">
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <span className="btn btn-primary idea__card-cta">Falar agora</span>
    </div>
  )
}

export default function Idea() {
  return (
    <section className="idea" id="ideia">
      <div className="container idea__inner">
        <motion.div
          className="idea__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="eyebrow idea__eyebrow">A ideia</span>
          <h2 className="idea__title">
            Seu cliente te procura em vários lugares.{' '}
            <span className="italic">Falta um que junte tudo.</span>
          </h2>
          <p className="idea__lead">
            Instagram mostra, o WhatsApp responde, o mapa localiza. Mas é a sua página que reúne
            tudo isso de forma bonita, profissional e só sua.
          </p>
        </motion.div>

        <div className="idea__diagram idea__diagram--mobile">
          <MobileIdeaDiagram />

          <span className="idea__caption">cinco lugares → uma página</span>
        </div>

        <div className="idea__diagram idea__diagram--desktop">
          <svg
            className="idea__lines"
            viewBox="0 0 640 520"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {connectorPaths.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#7a736a"
                strokeWidth="1.5"
                strokeDasharray="5 6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
              />
            ))}
          </svg>

          {desktopChips.map((chip, i) => (
            <motion.span
              key={chip.label}
              className="idea__chip idea__chip--floating"
              style={{ left: chip.left, top: chip.top }}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            >
              {chip.label}
            </motion.span>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="idea__card-wrap"
          >
            <MockCard />
          </motion.div>

          <span className="idea__caption idea__caption--desktop">cinco lugares → uma página</span>
        </div>
      </div>
    </section>
  )
}
