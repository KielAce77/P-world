import { SITE, HERO_IMG } from '../data'
import s from './Hero.module.css'

const goto = (href) => (e) => {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section id="hero" className={s.section}>
      {/* Full-bleed background — high-voltage electrical substation at dusk */}
      <div className={s.bg} style={{ backgroundImage: `url('${HERO_IMG}')` }} />
      <div className={s.vignette} />
      <div className={s.glow} />

      <div className={s.content}>
        {/* Availability badge */}
        <span className={s.badge}>
          <span className={s.dot} />
          {SITE.available ? 'AVAILABLE FOR PROJECTS' : 'CURRENTLY UNAVAILABLE'}
        </span>

        <h1 className={s.title}>
          Electrical<br />
          <em>Engineer.</em>
        </h1>

        <p className={s.roles}>
          <span className={s.br}>[</span>
          &nbsp;Field &middot; Automation &middot; Power &middot; Industrial&nbsp;
          <span className={s.br}>]</span>
        </p>

        <p className={s.intro}>
          Bridging raw electrical power with cutting-edge automation and smart systems
          engineering. From high-voltage field installations to embedded microcontroller
          solutions — built to code, built to last.
        </p>

        <div className={s.btns}>
          <a href="#contact" className="btn-primary" onClick={goto('#contact')}>
            ⚡ Get In Touch
          </a>
          <a href="#specializations" className="btn-ghost" onClick={goto('#specializations')}>
            View Skills &rarr;
          </a>
        </div>
      </div>

      {/* Decorative circuit SVG */}
      <svg className={s.circuit} viewBox="0 0 520 520" fill="none" aria-hidden>
        <circle cx="260" cy="260" r="210" stroke="#F5A623" strokeWidth=".7" strokeDasharray="6 9"/>
        <circle cx="260" cy="260" r="148" stroke="#F5A623" strokeWidth=".4" strokeDasharray="3 13"/>
        <circle cx="260" cy="260" r="84"  stroke="#F5A623" strokeWidth="1"/>
        <line x1="50"  y1="260" x2="470" y2="260" stroke="#F5A623" strokeWidth=".5"/>
        <line x1="260" y1="50"  x2="260" y2="470" stroke="#F5A623" strokeWidth=".5"/>
        <line x1="104" y1="104" x2="416" y2="416" stroke="#F5A623" strokeWidth=".3"/>
        <line x1="416" y1="104" x2="104" y2="416" stroke="#F5A623" strokeWidth=".3"/>
        <circle cx="260" cy="260" r="13" fill="#F5A623" opacity=".45"/>
        <circle cx="260" cy="260" r="5"  fill="#FFD000"/>
        <circle cx="424" cy="136" r="5"  stroke="#F5A623" strokeWidth="1.5"/>
        <circle cx="96"  cy="136" r="5"  stroke="#F5A623" strokeWidth="1.5"/>
        <circle cx="96"  cy="384" r="5"  stroke="#F5A623" strokeWidth="1.5"/>
        <circle cx="424" cy="384" r="5"  stroke="#F5A623" strokeWidth="1.5"/>
        <rect x="235" y="168" width="50" height="18" rx="2" stroke="#F5A623" strokeWidth=".8"/>
        <rect x="235" y="334" width="50" height="18" rx="2" stroke="#F5A623" strokeWidth=".8"/>
        <rect x="168" y="251" width="18" height="18" rx="2" stroke="#F5A623" strokeWidth=".8"/>
        <rect x="334" y="251" width="18" height="18" rx="2" stroke="#F5A623" strokeWidth=".8"/>
      </svg>
    </section>
  )
}
