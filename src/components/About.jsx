import { useEffect, useRef, useState } from 'react'
import { ABOUT } from '../data'
import { useReveal } from '../hooks'
import s from './About.module.css'

function Bar({ label, pct, delay }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={s.barRow}>
      <div className={s.barMeta}>
        <span className={s.barLabel}>{label}</span>
        <span className={s.barPct}>{pct}%</span>
      </div>
      <div className={s.track}>
        <div
          className={s.fill}
          style={{
            width: `${pct}%`,
            animationDelay: `${delay}s`,
            animationPlayState: visible ? 'running' : 'paused',
          }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const [lRef, lVis] = useReveal()
  const [rRef, rVis] = useReveal()

  return (
    <section id="about" className={s.section}>
      <div className="container">
        <div className={s.grid}>

          {/* Left column */}
          <div ref={lRef} className={`reveal ${lVis ? 'in' : ''}`}>
            <div className={s.head}>
              <p className="sec-tag">About</p>
              <h2 className="sec-title">Built On <span>Experience</span></h2>
            </div>
            {ABOUT.bio.map((p, i) => (
              <p key={i} className={s.para} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            <div className={s.bars}>
              {ABOUT.skills.map((sk, i) => (
                <Bar key={sk.label} label={sk.label} pct={sk.pct} delay={i * 0.2} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div
            ref={rRef}
            className={`${s.right} reveal ${rVis ? 'in' : ''}`}
            style={{ transitionDelay: '.14s' }}
          >
            <img src={ABOUT.img} alt={ABOUT.alt} className={s.photo} loading="lazy" />
            <div className={s.card}>
              <div className={s.cardHead}>
                <p className="sec-tag" style={{ marginBottom: '8px' }}>Certifications</p>
                <h3 className={s.cardTitle}>Qualifications &amp; Standards</h3>
              </div>
              <ul className={s.certList}>
                {ABOUT.certs.map(c => (
                  <li key={c} className={s.certItem}>
                    <span className={s.dot} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
