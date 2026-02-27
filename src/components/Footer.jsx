import { SITE } from '../data'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <span className={s.logo}>P-<span>World</span></span>
      <p className={s.copy}>
        &copy; {new Date().getFullYear()} &middot; {SITE.name} &middot; All Rights Reserved
      </p>
      <p className={s.copy}>Built with precision ⚡</p>
      <div className={s.socials}>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer"
          className={s.socialLink}
          aria-label="LinkedIn"
        >
          in
        </a>
        <a
          href="https://wa.me/233557628942"
          target="_blank"
          rel="noreferrer"
          className={s.socialLink}
          aria-label="WhatsApp"
        >
          WA
        </a>
        <a
          href="https://x.com/NiiPhilus"
          target="_blank"
          rel="noreferrer"
          className={s.socialLink}
          aria-label="X (Twitter)"
        >
          X
        </a>
        <a
          href="https://web.facebook.com/kelvin.quarcoopome.7"
          target="_blank"
          rel="noreferrer"
          className={s.socialLink}
          aria-label="Facebook"
        >
          FB
        </a>
      </div>
    </footer>
  )
}
