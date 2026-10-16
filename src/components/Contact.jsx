import { useState } from 'react'
import { motion } from 'motion/react'
import { Send, Check, Loader2, AlertCircle } from 'lucide-react'
import InstagramIcon from './InstagramIcon.jsx'
import Captcha from './Captcha.jsx'
import './Contact.css'

const segments = [
  'Salão de beleza',
  'Alimentação',
  'Saúde e bem-estar',
  'Pet',
  'Loja',
  'Serviços',
  'Outro',
]

const initialForm = { nome: '', negocio: '', segmento: '', contato: '', mensagem: '' }
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [captchaOk, setCaptchaOk] = useState(false)
  const [captchaKey, setCaptchaKey] = useState(0)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!captchaOk || status === 'sending') return

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Novo pedido de orçamento — ${form.negocio || form.nome}`,
          from_name: 'Site Roji Studio',
          name: form.nome,
          business: form.negocio,
          segment: form.segmento,
          contact: form.contato,
          message: form.mensagem,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Falha ao enviar')

      setStatus('sent')
      setForm(initialForm)
      setCaptchaOk(false)
      setCaptchaKey((k) => k + 1)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact" id="contato">
      <div className="container contact__inner">
        <motion.div
          className="contact__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="eyebrow contact__eyebrow">Contato</span>
          <h2 className="contact__title">
            Vamos colocar o seu negócio <span className="italic">no caminho certo?</span>
          </h2>
          <p>Preencha o formulário ou chame direto no Instagram. Conto como o seu site pode ficar.</p>

          <a
            className="contact__ig-card"
            href="https://instagram.com/roji.studioweb"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact__ig-avatar">
              <img src="/images/brand/roji-avatar-terracota.png" alt="" />
            </span>
            <span className="contact__ig-text">
              <strong>@roji.studioweb</strong>
              <small>Roji Studio | Sites para negócios</small>
            </span>
            <span className="btn btn-dark contact__ig-btn">
              <InstagramIcon size={16} /> Chamar no direct
            </span>
          </a>
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <h3>Conte sobre o seu negócio</h3>

          <div className="contact__row">
            <label>
              Seu nome
              <input
                type="text"
                placeholder="Maria Souza"
                value={form.nome}
                onChange={update('nome')}
                required
              />
            </label>
            <label>
              Nome do negócio
              <input
                type="text"
                placeholder="Doces da Maria"
                value={form.negocio}
                onChange={update('negocio')}
                required
              />
            </label>
          </div>

          <label>
            Segmento
            <select value={form.segmento} onChange={update('segmento')} required>
              <option value="" disabled>
                Escolha uma opção
              </option>
              {segments.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            WhatsApp ou e-mail
            <input
              type="text"
              placeholder="(00) 00000-0000"
              value={form.contato}
              onChange={update('contato')}
              required
            />
          </label>

          <label>
            O que você quer mostrar no site?
            <textarea
              rows={4}
              placeholder="Conte rapidamente o que seu negócio faz..."
              value={form.mensagem}
              onChange={update('mensagem')}
            />
          </label>

          <Captcha key={captchaKey} onVerify={setCaptchaOk} />

          <button
            type="submit"
            className="btn btn-primary contact__submit"
            disabled={!captchaOk || status === 'sending'}
          >
            {status === 'sending' && (
              <>
                <Loader2 size={18} className="contact__spinner" /> Enviando...
              </>
            )}
            {status === 'sent' && (
              <>
                <Check size={18} /> Pedido enviado
              </>
            )}
            {(status === 'idle' || status === 'error') && (
              <>
                <Send size={16} /> Enviar pedido de orçamento
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="contact__error">
              <AlertCircle size={15} /> Não consegui enviar agora. Tente de novo ou chame no
              Instagram.
            </p>
          )}

          <p className="contact__fineprint">Respondo pessoalmente, sem compromisso.</p>
        </motion.form>
      </div>
    </section>
  )
}
