import type { SiteConfig } from './config/siteConfigTypes'

export const siteConfig = {
  theme: 'bootstrap',
  brand: {
    name: '',
    shortName: '',
    role: '',
  },
  hero: {
    tag: '',
    title: '',
    subtitle: '',
    primaryCtaLabel: '',
    primaryCtaLink: '#contato',
    secondaryCtaLabel: '',
    secondaryCtaLink: '#entregas',
  },
  stats: [
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ],
  techStack: [''],
  sections: {
    techTitle: '',
    clientsIntro: '',
    clients: [''],
    servicesTitle: '',
    projectsTitle: '',
    processTitle: '',
    contactLead: '',
    terminalTitle: '',
    terminalIntro: '',
  },
  services: [
    {
      title: '',
      description: '',
    },
  ],
  process: [
    {
      title: '',
      description: '',
    },
  ],
  consulting: {
    title: '',
    description: '',
  },
  contact: {
    whatsappParts: ['', '', '', ''],
    whatsappMessage: '',
  },
  projects: [
    {
      title: '',
      description: '',
      result: '',
    },
  ],
  footer: {
    note: '',
  },
} satisfies SiteConfig
