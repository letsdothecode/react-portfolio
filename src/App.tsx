import { useEffect, useRef, useState } from 'react'
import { projects } from './data/projects'
import { motion } from 'framer-motion'

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Summary', href: '#summary' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button onClick={() => setIsDark((v) => !v)} className="btn btn-outline" aria-label="Toggle theme">
      {isDark ? 'Light' : 'Dark'} Mode
    </button>
  )
}

function Header({ active }: { active: string }) {
  return (
    <header>
      <div className="page-container" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'rgb(var(--primary))' }}>Ananya Goyal</h1>
        <nav aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${active === item.href ? 'active' : ''}`}
              aria-current={active === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ThemeToggle />
          <a className="btn btn-primary" href="#contact">Contact</a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="section hero hero-gradient" aria-labelledby="home-heading">
      <div className="hero-grid" data-animate>
        <div>
          <h2 id="home-heading" className="heading-2" style={{ fontSize: '3rem' }}>Ananya Goyal</h2>
          <p className="lead muted typing">Full Stack Developer • Cybersecurity Enthusiast</p>
          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', fontWeight: 600 }}>Phone: 8085017419 • Email: ananyagoyal291@gmail.com</p>
          <div className="social" style={{ marginTop: '1rem' }}>
            <a href="https://linkedin.com/in/ananya-goyal-6ba92a302" target="_blank" rel="noreferrer" className="btn btn-outline">
              <img src="/linkedin.png" alt="LinkedIn" />
              LinkedIn
            </a>
            <a href="https://github.com/letsdothecode" target="_blank" rel="noreferrer" className="btn btn-outline no-icon">
              GitHub
            </a>
            <a href="#projects" className="btn btn-primary">View Projects</a>
          </div>
        </div>
        <div className="avatar">
          <div className="avatar-ring" aria-hidden="true">
            <img
              src="/profile.png"
              alt="Profile"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                img.onerror = null
                img.src = 'https://ui-avatars.com/api/?name=Ananya+Goyal&background=4C7DF0&color=fff&size=256'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} className="text-2xl font-bold text-brand tracking-tight">{title}</h3>
      <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: 1.8 }}>{children}</div>
    </section>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="projects-grid">
        {projects.map((p, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            key={p.title}
            className="card tech"
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
              <h4 className="text-lg font-semibold">{p.title}</h4>
            </div>
            <p className="subtle" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{p.description}</p>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
              {p.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="card-actions">
              <span className="muted" style={{ fontSize: '0.8rem' }}>Tech stack</span>
              {p.source && (
                <a className="btn btn-outline" href={p.source} target="_blank" rel="noreferrer">View Code</a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending'>('idle')
  const [opened, setOpened] = useState<boolean>(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const subject = String(form.get('subject') || `Portfolio Contact from ${name}`)
    const message = String(form.get('message') || '')

    if (!name || !email || !message) return

    setStatus('sending')

    const body = `${message}\n\nFrom: ${name} <${email}>`
    const mailto = `mailto:ananyagoyal291@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setOpened(true)
    setTimeout(() => setStatus('idle'), 400)
  }

  return (
    <Section id="contact" title="Contact">
      <div className="contact-bg" data-animate>
      <form onSubmit={onSubmit} className="contact-form">
        <label className="sr-only" htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" className="rounded-md" style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0.5rem 0.75rem' }} required />
        <label className="sr-only" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Your email" className="rounded-md" style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0.5rem 0.75rem' }} required />
        <label className="sr-only" htmlFor="subject">Subject</label>
        <input id="subject" name="subject" placeholder="Subject (optional)" className="rounded-md" style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0.5rem 0.75rem' }} />
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" rows={5} className="rounded-md" style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0.5rem 0.75rem' }} required />
        <div className="contact-actions">
          <button disabled={status === 'sending'} className="btn btn-primary">
            {status === 'sending' ? 'Opening mail…' : 'Send'}
          </button>
        </div>
        {opened && (
          <p className="muted" style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Your mail app should have opened. If not, email me directly at
            <a className="link" href="mailto:ananyagoyal291@gmail.com" style={{ marginLeft: 4 }}>ananyagoyal291@gmail.com</a>.
          </p>
        )}
      </form>
      </div>
    </Section>
  )
}

export default function App() {
  const [active, setActive] = useState<string>('#home')
  const sectionsRef = useRef<Record<string, Element | null>>({})

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace('#', ''))
    ids.forEach((id) => {
      sectionsRef.current['#' + id] = document.getElementById(id)
    })
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive('#' + visible.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    Object.values(sectionsRef.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Reveal-on-scroll for elements marked with [data-animate]
  useEffect(() => {
    const animated = Array.from(document.querySelectorAll<HTMLElement>('[data-animate]'))
    if (animated.length === 0) return
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    )
    animated.forEach((el) => revealObserver.observe(el))
    return () => revealObserver.disconnect()
  }, [])

  return (
    <div className="min-h-dvh">
      <Header active={active} />
      <main>
        <Hero />
        <Section id="summary" title="Professional Summary">
          Passionate and detail‑oriented Full Stack Developer with a foundation in software engineering, cybersecurity, and cloud. Experienced collaborating in agile teams, analyzing requirements, and delivering secure, scalable web solutions.
        </Section>
        <Projects />
        <Section id="experience" title="Experience">
          <div className="timeline" data-animate>
            <div className="timeline-item">
              <p><strong>Business Analyst (Part‑Time) — Dyadic Health</strong> <span className="muted">Feb 2025 – Sep 2025</span></p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                <li>Analyzed and documented business processes, improving efficiency via workflow optimization.</li>
                <li>Partnered with engineering and design to align solutions with business goals.</li>
                <li>Supported data‑driven decisions using dashboards and analytics.</li>
              </ul>
            </div>
            <div className="timeline-item">
              <p><strong>Marketing Intern — KaigenX</strong> <span className="muted">Feb 2025 – May 2025</span></p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                <li>Performed market and competitor research to refine product positioning.</li>
                <li>Contributed to branding, UI/UX research, and prototypes in Figma.</li>
                <li>Helped create user personas, journeys, and feature requirement docs.</li>
              </ul>
            </div>
          </div>
        </Section>
        <Section id="skills" title="Skills">
          <div className="skills-grid" data-animate>
            {[
              'Python', 'C++', 'Java', 'JavaScript/TypeScript',
              'React', 'HTML', 'CSS', 'Tailwind', 'Accessibility',
              'MySQL', 'SQL Server', 'SQLite',
              'GCP', 'AWS (basics)',
              'VS Code', 'GitHub', 'Postman', 'Power BI', 'Cursor', 'Figma', 'Canva', 'Jira',
              'OWASP Basics', 'Secure UI'
            ].map((s) => (
              <span key={s} className="skill-chip">{s}</span>
            ))}
          </div>
        </Section>
        <Section id="education" title="Education">
          <p><strong>Christ University, Bangalore</strong> — Bachelor of Computer Applications (Hons) <span className="muted">(Pursuing, GPA: TBD)</span></p>
          <p><strong>Carmel Convent Sr. Sec. School, Gwalior</strong> — Class 12: 92%, Class 10: 84%</p>
        </Section>
        <Contact />
      </main>
      <footer>
        <div className="section" style={{ textAlign: 'center', fontSize: '0.8rem' }}>
          <div className="footer-actions">
            <a href="https://linkedin.com/in/ananya-goyal-6ba92a302" target="_blank" rel="noreferrer" className="btn btn-outline">LinkedIn</a>
            <a href="https://github.com/letsdothecode" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
          </div>
          © 2025 Ananya Goyal. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
