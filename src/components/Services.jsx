import { SERVICES } from '../data'
import { useReveal } from '../hooks'
import s from './Services.module.css'

function Card({ svc, delay }) {
  const [ref, vis] = useReveal()
  return (
    <article
      ref={ref}
      className={`${s.card} reveal ${vis ? 'in' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={s.imgBox}>
        <img src={svc.img} alt={svc.alt} className={s.img} loading="lazy" />
      </div>
      <div className={s.body}>
        <span className={s.num}>// {svc.num}</span>
        <span className={s.icon}>{svc.icon}</span>
        <h3 className={s.title}>{svc.title}</h3>
        <p className={s.desc}>{svc.desc}</p>
      </div>
    </article>
  )
}

export default function Services() {
  const delays = [0, .1, .2, .1, .2, .3]
  return (
    <section id="services" className={s.section}>
      <div className="container">
        <header className={s.head}>
          <p className="sec-tag">What I Offer</p>
          <h2 className="sec-title">Services <span>&amp; Solutions</span></h2>
        </header>
        <div className={s.grid}>
          {SERVICES.map((svc, i) => (
            <Card key={svc.num} svc={svc} delay={delays[i] ?? 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
