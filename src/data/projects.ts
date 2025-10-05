export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  source?: string
}

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'Responsive portfolio with React, Tailwind, and animations.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    link: '#',
  },
  {
    title: 'Cybersecurity Notes',
    description: 'Curated notes and demos exploring basic cyber hacks safely.',
    tags: ['Security', 'Notes', 'Web'],
  },
  {
    title: 'Mini UI Components',
    description: 'Small library of accessible components built with Headless patterns.',
    tags: ['UI', 'Accessibility', 'TypeScript'],
    source: '#',
  },
]
