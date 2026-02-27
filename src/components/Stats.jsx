import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data'
import s from './Stats.module.css'

function Counter({ raw }) {
  const [val, setVal] = useState('0')
  const ref = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired.current) return
      fired.current = true
      const suffix = raw.replace(/\d/g, '')
      const num = parseInt(raw)
      if (isNaN(num)) { setVal(raw); return }
      const dur = 1900; let t0 = null
      const tick = (ts) => {
        if (!t0) t0 = ts
        const p = Math.min((ts - t0) / dur, 1)
        const e = 1 - Math.pow(1 - p, 3)
        setVal(Math.floor(e * num) + suffix)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      obs.unobserve(el)
    }, { threshold: .5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [raw])

  return <div ref={ref} className={s.num}>{val}</div>
}

export default function Stats() {
  return (
    <div className={s.wrap}>
      {STATS.map(st => (
        <div key={st.label} className={s.item}>
          <Counter raw={st.num} />
          <p className={s.label}>{st.label}</p>
        </div>
      ))}
    </div>
  )
}
