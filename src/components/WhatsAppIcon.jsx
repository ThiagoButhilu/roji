export default function WhatsAppIcon({ size = 18, strokeWidth = 1.8, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 0 0-7.77 13.5L3 21l4.65-1.22A9 9 0 1 0 12 3Z" />
      <path
        d="M8.6 8.4c.5-1.1 1-1.1 1.4-1.1.3 0 .6 0 .9.6.3.6.9 2 1 2.1.1.2.2.4 0 .6-.1.3-.2.4-.4.6-.2.2-.4.4-.2.8.3.4 1.1 1.8 2.4 2.5 1.6.9 1.7.6 2 .2.2-.3.6-.7.8-1 .2-.3.4-.2.7-.1.3.1 1.9.9 2.2 1 .3.2.5.2.6.4.1.2.1 1-.2 1.6-.3.6-1.5 1.3-2.3 1.3-.7 0-2.6-.3-4.9-2.5-2.7-2.5-3.1-4.6-3.2-5.3-.1-.6.3-1.1.6-1.4Z"
        fill={color}
        stroke="none"
      />
    </svg>
  )
}
