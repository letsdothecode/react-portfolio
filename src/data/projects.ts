export type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  source?: string
}

export const projects: Project[] = [
  {
    title: 'Metis Lab Management System',
    description: 'Automated lab access and management with secure role-based auth, real-time logs, and resource tracking.',
    tags: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Portfolio Website',
    description: 'Responsive personal site with a resume layout and accessible UI.',
    tags: ['React', 'CSS', 'Vite'],
  },
]
