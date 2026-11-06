export default function Flourish({ className = '' }) {
  return <div className={`flourish ${className}`} aria-hidden="true">
    <span />
    <svg className="flourish-heart" viewBox="0 0 24 24" focusable="false">
      <path d="M12 20.5C10.7 19.4 3 14.2 3 8.7A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 9 2.1c0 5.5-7.7 10.7-9 11.8Z" />
    </svg>
    <span />
  </div>
}
