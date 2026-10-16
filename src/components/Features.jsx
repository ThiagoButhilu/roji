import { motion } from 'motion/react'
import { User, List, Image, MapPin, MessageSquare, Mail, Smartphone } from 'lucide-react'
import './Features.css'

const features = [
  {
    icon: User,
    title: 'Apresentação',
    text: 'Quem você é, o que faz e por que escolher o seu negócio.',
  },
  {
    icon: List,
    title: 'Serviços ou cardápio',
    text: 'Tudo organizado para o cliente decidir em segundos.',
  },
  {
    icon: Image,
    title: 'Fotos e vídeos',
    text: 'Seu trabalho em destaque, do jeito que ele merece.',
  },
  {
    icon: MapPin,
    title: 'Horários e mapa',
    text: 'Endereço, horário e como chegar sem perguntar.',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp direto',
    text: 'Um toque e a conversa já começa.',
  },
  {
    icon: Mail,
    title: 'Formulário de contato',
    text: 'Pedidos de orçamento direto no seu e-mail.',
  },
]

export default function Features() {
  return (
    <section className="features" id="o-que-vai">
      <div className="container">
        <div className="features__head">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="eyebrow features__eyebrow">O que vai no seu site</span>
            <h2 className="features__title">
              Tudo o que o cliente precisa, <span className="italic">no lugar certo.</span>
            </h2>
          </motion.div>
          <motion.p
            className="features__note"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            Funciona no celular e no computador, carrega rápido e aparece no Google.
          </motion.p>
        </div>

        <div className="features__grid">
          {features.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              className="features__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: 'easeOut' }}
              whileHover="hover"
            >
              <motion.span
                className="features__icon"
                variants={{ hover: { scale: 1.12, rotate: -6 } }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Icon size={22} strokeWidth={1.8} />
              </motion.span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>

        <div className="features__footnote">
          <Smartphone size={18} strokeWidth={1.8} />
          <span>Cada página é desenhada para o celular primeiro, porque é por lá que seu cliente chega.</span>
        </div>
      </div>
    </section>
  )
}
