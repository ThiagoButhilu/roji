export const WHATSAPP_NUMBER = '+55 11 96557-8100'
const WHATSAPP_DIGITS = '5511965578100'

export function whatsappLink(message) {
  const base = `https://wa.me/${WHATSAPP_DIGITS}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
