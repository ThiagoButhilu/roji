import { motion } from 'motion/react'
import InstagramIcon from './InstagramIcon.jsx'
import './Footer.css'

const links = [
  { href: '#ideia', label: 'A ideia' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="container footer__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="footer__brand">
          <a href="#top" className="brand">
            <img src="/images/brand/roji-horizontal-cal.png" alt="Roji Studio" className="brand__logo" />
          </a>
          <p>Sites e landing pages para negócios locais.</p>
          <small>© 2026 Roji Studio. Feito com calma, uma pedra de cada vez.</small>
        </div>

        <div className="footer__links">
          <nav>
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <a
            className="footer__ig"
            href="https://instagram.com/roji.studioweb"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={18} /> @roji.studioweb
          </a>
        </div>
      </motion.div>
    </footer>
  )
}
