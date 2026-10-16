export default function StoneMark({ size = 32, color = '#2B2925' }) {
  return (
    <svg
      width={size}
      height={(size * 378) / 446}
      viewBox="0 0 446 378"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill={color}>
        <ellipse cx="128" cy="298" rx="112" ry="48" transform="rotate(-6 128 298)" />
        <ellipse cx="270" cy="250" rx="78" ry="36" transform="rotate(-4 270 250)" />
        <ellipse cx="211" cy="161" rx="58" ry="28" transform="rotate(-8 211 161)" />
        <ellipse cx="311" cy="90" rx="40" ry="20" transform="rotate(-10 311 90)" />
        <ellipse cx="280" cy="31" rx="28" ry="14" transform="rotate(-12 280 31)" />
      </g>
    </svg>
  )
}
