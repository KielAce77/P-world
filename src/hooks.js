import { useEffect, useRef, useState } from 'react'

/** Fires once when element enters viewport */
export function useReveal(opts = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...opts }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}

/** Tracks window.scrollY */
export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return y
}
