import { useState } from 'react'
import { SITE } from '../data'
import { useReveal } from '../hooks'
import s from './Contact.module.css'

const INFO = [
  { icon: '📧', label: SITE.email,    href: `mailto:${SITE.email}`, type: 'email' },
  { icon: '📞', label: SITE.phone,    href: `tel:${SITE.phone.replace(/\s+/g, '')}`, type: 'phone' },
  { icon: '📍', label: SITE.location },
  {
    icon: '💼',
    label: SITE.linkedinName || 'Theophilus N.L Quarcoopome',
    href: SITE.linkedin,
    type: 'link',
  },
]

const INIT = { name: '', email: '', service: '', location: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INIT)
  const [sent, setSent] = useState(false)
  const [lRef, lVis] = useReveal()
  const [rRef, rVis] = useReveal()

  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    // Save message to localStorage for admin dashboard
    const msgs = JSON.parse(localStorage.getItem('pworld_messages') || '[]')
    msgs.unshift({
      id: Date.now().toString(),
      ...form,
      date: new Date().toISOString(),
      read: false,
      reply: '',
    })
    localStorage.setItem('pworld_messages', JSON.stringify(msgs))
    setSent(true)
    setTimeout(() => { setSent(false); setForm(INIT) }, 3500)
  }

  return (
    <section id="contact" className={s.section}>
      {/* Moody background — electrical engineer at control panel */}
      <div
        className={s.bg}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=70&auto=format&fit=crop')`,
        }}
      />

      <div className="container">
        <div className={s.grid}>

          {/* Contact info */}
          <div ref={lRef} className={`reveal ${lVis ? 'in' : ''}`}>
            <p className="sec-tag" style={{ marginBottom: 14, position: 'relative', zIndex: 2 }}>
              Contact
            </p>
            <h2 className={s.heading}>
              Let's Work<br /><span>Together.</span>
            </h2>
            <p className={s.sub}>
              Available for full-time roles, freelance contracts, project consultancy and
              long-term maintenance partnerships. Based in the field — ready to deploy anywhere.
            </p>
            <ul className={s.infoList}>
              {INFO.map(item => (
                <li key={item.label} className={s.infoItem}>
                  <div className={s.infoIcon}>{item.icon}</div>
                  <div className={s.infoContent}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={s.infoLink}
                        {...(item.type === 'link' ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    {item.type === 'phone' && (
                      <button
                        type="button"
                        className={s.copyBtn}
                        onClick={() => navigator.clipboard && navigator.clipboard.writeText(item.label)}
                      >
                        Copy
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div
            ref={rRef}
            className={`reveal ${rVis ? 'in' : ''}`}
            style={{ transitionDelay: '.14s' }}
          >
            <form className={s.form} onSubmit={submit} noValidate>
              <div className={s.row}>
                <label className={s.field}>
                  <span className={s.lbl}>Full Name</span>
                  <input
                    name="name" value={form.name} onChange={change}
                    className={s.input} placeholder="John Smith" required
                  />
                </label>
                <label className={s.field}>
                  <span className={s.lbl}>Email Address</span>
                  <input
                    type="email" name="email" value={form.email} onChange={change}
                    className={s.input} placeholder="john@company.com" required
                  />
                </label>
              </div>

              <label className={s.field}>
                <span className={s.lbl}>Service Needed</span>
                <input
                  name="service" value={form.service} onChange={change}
                  className={s.input} placeholder="e.g. Solar Installation, Automation, Maintenance…"
                />
              </label>

              <label className={s.field}>
                <span className={s.lbl}>Project Location</span>
                <input
                  name="location" value={form.location} onChange={change}
                  className={s.input} placeholder="City, Country"
                />
              </label>

              <label className={s.field}>
                <span className={s.lbl}>Message</span>
                <textarea
                  name="message" value={form.message} onChange={change}
                  className={s.textarea}
                  placeholder="Describe your project or requirements in detail…"
                  required
                />
              </label>

              <button
                type="submit"
                className={`btn-primary ${s.submit} ${sent ? s.sentBtn : ''}`}
              >
                {sent ? '✓ Message Sent!' : '⚡ Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
