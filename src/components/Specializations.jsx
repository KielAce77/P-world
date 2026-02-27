import { SPECS } from '../data'
import { useReveal } from '../hooks'
import s from './Specializations.module.css'

function Card({ spec, delay }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      className={`${s.card} reveal ${visible ? 'in' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={s.imgBox}>
        <img src={spec.img} alt={spec.alt} className={s.img} loading="lazy" />
      </div>
      <div className={s.body}>
        <span className={s.icon}>{spec.icon}</span>
        <h3 className={s.title}>{spec.title}</h3>
        <p className={s.desc}>{spec.desc}</p>
        <ul className={s.tags}>
          {spec.tags.map(t => <li key={t} className={s.tag}>{t}</li>)}
        </ul>
      </div>
      <span className={s.ghost}>{spec.id}</span>
    </article>
  )
}

export default function Specializations() {
  return (
    <section id="specializations" className={s.section}>
      <div className="container">
        <header className={s.head}>
          <p className="sec-tag">Expertise</p>
          <h2 className="sec-title">Core <span>Specializations</span></h2>
        </header>
        <div className={s.grid}>
          {SPECS.map((spec, i) => (
            <Card key={spec.id} spec={spec} delay={[0,.1,.2,.1,.2][i] ?? 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
