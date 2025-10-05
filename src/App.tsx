import { useEffect, useRef, useState } from 'react'
import { projects } from './data/projects'
import { motion } from 'framer-motion'

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Achievements', href: '#achievements' },
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
    <button
      onClick={() => setIsDark((v) => !v)}
      className="rounded-md border px-3 py-1 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {isDark ? 'Light' : 'Dark'} Mode
    </button>
  )
}

function Header({ active }: { active: string }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-brand">Ananya Goyal</h1>
        <nav className="hidden gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold hover:text-brand ${active === item.href ? 'text-brand' : ''}`}
              aria-current={active === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            className="rounded-md bg-brand px-3 py-1 text-white text-sm font-semibold hover:bg-brand-dark"
            href="#contact"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="mx-auto max-w-5xl px-4 py-16 md:py-24" aria-labelledby="home-heading">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 id="home-heading" className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Ananya Goyal
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Computer Science Student</p>
          <p className="mt-4 text-sm font-medium">Email: ananya@gmail.com • Course: BCA Hons.</p>
          <div className="mt-6 flex gap-3 items-center">
            <a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer" className="rounded-md border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2">
              <img src="/linkedin.png" alt="LinkedIn" className="h-4 w-4 rounded-full" />
              LinkedIn
            </a>
            <a href="https://stackoverflow.com/" target="_blank" rel="noreferrer" className="rounded-md border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-2">
              <img src="/stackoverflow.png" alt="StackOverflow" className="h-4 w-4 rounded-full" />
              StackOverflow
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-48 w-48 overflow-hidden rounded-full ring-4 ring-brand" aria-hidden="true">
            <img src="/profile.png" alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-12" aria-labelledby={`${id}-heading`}>
      <h3 id={`${id}-heading`} className="text-2xl font-bold text-brand">{title}</h3>
      <div className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-200">{children}</div>
    </section>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, idx) => (
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            key={p.title}
            href={p.link || p.source || '#'}
            target={p.link || p.source ? '_blank' : undefined}
            rel={p.link || p.source ? 'noreferrer' : undefined}
            className="group rounded-lg border border-black/10 dark:border-white/10 p-4 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold">{p.title}</h4>
              <span className="text-xs text-brand">View</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const message = String(form.get('message') || '')

    if (!name || !email || !message) return

    setStatus('sending')

    const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const emailJsService = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const emailJsTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

    if (!emailJsPublicKey || !emailJsService || !emailJsTemplate) {
      window.location.href = `mailto:ananya@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`
      setStatus('idle')
      return
    }

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: emailJsService,
        template_id: emailJsTemplate,
        user_id: emailJsPublicKey,
        template_params: { name, email, message },
      }),
    })
      .then((r) => (r.ok ? setStatus('sent') : Promise.reject()))
      .catch(() => setStatus('error'))
  }

  return (
    <Section id="contact" title="Contact">
      <form onSubmit={onSubmit} className="grid gap-3 max-w-lg" aria-label="Contact form">
        <label className="sr-only" htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" required />
        <label className="sr-only" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Your email" className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" required />
        <label className="sr-only" htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" rows={5} className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2" required />
        <div className="flex items-center gap-3">
          <button disabled={status === 'sending'} className="rounded-md bg-brand px-4 py-2 text-white text-sm font-semibold hover:bg-brand-dark disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {status === 'sent' && <span className="text-xs text-green-600" role="status">Sent!</span>}
          {status === 'error' && <span className="text-xs text-red-600" role="alert">Failed. Try mailto.</span>}
        </div>
      </form>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        To enable direct send, add env variables: VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID
      </p>
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

  return (
    <div className="min-h-dvh">
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-white">Skip to content</a>
      <Header active={active} />
      <main>
        <Hero />
        <Section id="about" title="About Me">
          I am currently studying at Christ University, Yeswanthpur campus, and I am passionate about learning cyber hacks and gaining hands-on experience.
        </Section>
        <Projects />
        <Section id="hobbies" title="Hobbies">
          Reading about cybersecurity, building small web apps, sketching UI ideas, and participating in CTF-style challenges.
        </Section>
        <Section id="achievements" title="Achievements">
          Dean's list 2024, organized a college cybersecurity workshop, and contributed answers on StackOverflow.
        </Section>
        <Contact />
      </main>
      <footer className="mt-16 border-t border-black/10 dark:border-white/10 py-6 text-center text-xs text-gray-600 dark:text-gray-300">
        © 2025 Ananya Goyal. All rights reserved.
      </footer>
    </div>
  )
}
