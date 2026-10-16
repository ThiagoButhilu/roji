import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import './Captcha.css'

function generateChallenge() {
  const a = Math.ceil(Math.random() * 8)
  const b = Math.ceil(Math.random() * 8)
  return { a, b, answer: a + b }
}

export default function Captcha({ onVerify }) {
  const [challenge, setChallenge] = useState(generateChallenge)
  const [value, setValue] = useState('')

  useEffect(() => {
    onVerify(Number(value) === challenge.answer && value !== '')
  }, [value, challenge, onVerify])

  const refresh = () => {
    setChallenge(generateChallenge())
    setValue('')
  }

  return (
    <div className="captcha">
      <span className="captcha__label">
        Prova de que você não é um robô: quanto é {challenge.a} + {challenge.b}?
      </span>
      <div className="captcha__row">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Sua resposta"
          required
        />
        <button type="button" className="captcha__refresh" onClick={refresh} aria-label="Gerar nova conta">
          <RefreshCw size={16} />
        </button>
      </div>
    </div>
  )
}
