import { useState, useEffect, useRef } from 'react'
import { useScrollY } from '../hooks'
import s from './Navbar.module.css'

const LINKS = [
  { href: '#specializations', label: 'Skills'    },
  { href: '#about',           label: 'About'     },
  { href: '#services',        label: 'Services'  },
  { href: '#projects',        label: 'Projects'  },
  { href: '#contact',         label: 'Contact'   },
]

function scrollTo(href) {
  const el = document.querySelector(href)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrollY = useScrollY()
  const drawerRef = useRef(null)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on outside click
  useEffect(() => {
    const fn = (e) => {
      if (open && drawerRef.current && !drawerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  const handle = (href) => (e) => { e.preventDefault(); setOpen(false); scrollTo(href) }

  return (
    <>
      <header className={`${s.bar} ${scrollY > 24 ? s.solid : ''}`}>
        <a href="#hero" className={s.logo} onClick={handle('#hero')}>
          P-<span>World</span>
        </a>

        {/* Desktop nav */}
        <nav className={s.deskNav} aria-label="Main navigation">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className={s.link} onClick={handle(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={s.actions}>
          <a href="#contact" className={`btn-primary ${s.hireCta}`} onClick={handle('#contact')}>
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className={`${s.burger} ${open ? s.burgerOpen : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`${s.drawer} ${open ? s.drawerOpen : ''}`}
        aria-hidden={!open}
      >
        <nav className={s.drawerNav}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className={s.drawerLink} onClick={handle(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className={s.drawerCta} onClick={handle('#contact')}>
          ⚡ Hire Me Now
        </a>
      </div>
    </>
  )
}
