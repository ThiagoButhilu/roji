import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import InstagramIcon from './InstagramIcon.jsx'
import './Header.css'

const links = [
  { href: '#ideia', label: 'A ideia' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <motion.div
        className="container site-header__inner"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a href="#top" className="brand" onClick={close}>
          <img src="/images/brand/roji-horizontal-carvao.png" alt="Roji Studio" className="brand__logo" />
        </a>

        <nav className="site-nav">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06, ease: 'easeOut' }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a
            className="instagram-chip"
            href="https://instagram.com/roji.studioweb"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon size={16} strokeWidth={2} />
            @roji.studioweb
          </a>
          <a href="#contato" className="btn btn-primary">
            Pedir orçamento
          </a>
        </div>

        <button
          className="menu-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <div className="mobile-menu__inner">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={close}>
                  {link.label}
                </a>
              ))}
              <a
                className="mobile-menu__ig"
                href="https://instagram.com/roji.studioweb"
                target="_blank"
                rel="noreferrer"
                onClick={close}
              >
                <InstagramIcon size={16} /> @roji.studioweb
              </a>
              <a href="#contato" className="btn btn-primary" onClick={close}>
                Pedir orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
