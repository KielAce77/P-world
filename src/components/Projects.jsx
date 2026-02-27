import { PROJECTS } from '../data'
import { useReveal } from '../hooks'
import s from './Projects.module.css'

function Card({ proj, delay }) {
  const [ref, vis] = useReveal()
  const done = proj.status === 'Completed'
  return (
    <article
      ref={ref}
      className={`${s.card} reveal ${vis ? 'in' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={s.imgBox}>
        <img src={proj.img} alt={proj.alt} className={s.img} loading="lazy" />
        <div className={s.shade} />
        <span className={`${s.badge} ${done ? s.done : s.wip}`}>
          <span className={s.dot} />{proj.status}
        </span>
      </div>
      <div className={s.body}>
        <h3 className={s.title}>{proj.title}</h3>
        <p className={s.desc}>{proj.desc}</p>
        <div className={s.meta}>
          {proj.meta.map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className={s.section}>
      <div className="container">
        <header className={s.head}>
          <p className="sec-tag">Portfolio</p>
          <h2 className="sec-title">Featured <span>Projects</span></h2>
        </header>
        <div className={s.grid}>
          {PROJECTS.map((p, i) => (
            <Card key={p.title} proj={p} delay={[0,.1,.1,.2][i] ?? 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
