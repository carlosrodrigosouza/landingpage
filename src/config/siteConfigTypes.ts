export type SiteTheme = 'default' | 'bootstrap' | 'minimal'

export type SiteConfig = {
  theme: SiteTheme
  brand: {
    name: string
    shortName: string
    role: string
  }
  hero: {
    tag: string
    title: string
    subtitle: string
    primaryCtaLabel: string
    primaryCtaLink: string
    secondaryCtaLabel: string
    secondaryCtaLink: string
  }
  stats: Array<{
    label: string
    value: string
  }>
  techStack: string[]
  sections: {
    techTitle: string
    clientsIntro: string
    clients: string[]
    servicesTitle: string
    projectsTitle: string
    processTitle: string
    contactLead: string
    terminalTitle: string
    terminalIntro: string
  }
  services: Array<{
    title: string
    description: string
  }>
  process: Array<{
    title: string
    description: string
  }>
  consulting: {
    title: string
    description: string
  }
  contact: {
    whatsappParts: string[]
    whatsappMessage: string
  }
  projects: Array<{
    title: string
    description: string
    result: string
  }>
  footer: {
    note: string
  }
}
