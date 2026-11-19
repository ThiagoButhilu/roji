import { motion } from 'motion/react'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { whatsappLink } from '../data/whatsapp.js'
import './FloatingWhatsApp.css'

export default function FloatingWhatsApp() {
  return (
    <motion.a
      className="floating-whatsapp"
      href={whatsappLink('Olá! Vim pelo site da Roji Studio e quero saber mais.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar no WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon size={28} color="#fff" />
    </motion.a>
  )
}
