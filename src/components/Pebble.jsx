const STONE_PATH =
  'M5,30 C3,16 21,4 50,4 C73,4 93,11 96,27 C99,43 81,57 51,58 C25,59 7,46 5,30 Z'

export default function Pebble({ fill = '#F2EEE7', rotate = 0, scale = 1, className = '' }) {
  return (
    <svg
      viewBox="0 0 100 62"
      className={className}
      style={{ transform: `rotate(${rotate}deg) scale(${scale})` }}
      aria-hidden="true"
    >
      <path d={STONE_PATH} fill={fill} />
    </svg>
  )
}
