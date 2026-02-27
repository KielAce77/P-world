import { useState, useEffect } from 'react'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import Stats            from './components/Stats'
import Specializations  from './components/Specializations'
import About            from './components/About'
import Services         from './components/Services'
import Projects         from './components/Projects'
import Contact          from './components/Contact'
import Footer           from './components/Footer'
import AdminPage        from './components/AdminPage'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const fn = () => setHash(window.location.hash)
    window.addEventListener('hashchange', fn)
    return () => window.removeEventListener('hashchange', fn)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()
  const isAdmin = hash === '#admin'

  const exitAdmin = () => {
    window.history.pushState(null, '', window.location.pathname)
    window.dispatchEvent(new Event('hashchange'))
  }

  if (isAdmin) {
    return <AdminPage onExit={exitAdmin} />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <div className="divider" />
        <Specializations />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Services />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
