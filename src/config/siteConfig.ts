import { siteConfig as exampleSiteConfig } from '../siteConfig.example'
import type { SiteConfig } from './siteConfigTypes'

type SiteConfigModule = {
  siteConfig: SiteConfig
}

const localConfigModules = import.meta.glob<SiteConfigModule>('../siteConfig.ts', {
  eager: true,
})

const localSiteConfig = localConfigModules['../siteConfig.ts']?.siteConfig

export const siteConfig = localSiteConfig ?? exampleSiteConfig

const isBlank = (value: string) => value.trim().length === 0

const addMissingString = (missing: string[], label: string, value: string) => {
  if (isBlank(value)) missing.push(label)
}

const addMissingStringArray = (missing: string[], label: string, values: string[]) => {
  if (values.length === 0 || values.some(isBlank)) missing.push(label)
}

export function validateSiteConfig(config: SiteConfig, usingExample: boolean) {
  const missing: string[] = []

  if (usingExample) {
    missing.push('src/siteConfig.ts')
  }

  addMissingString(missing, 'brand.name', config.brand.name)
  addMissingString(missing, 'brand.shortName', config.brand.shortName)
  addMissingString(missing, 'brand.role', config.brand.role)
  addMissingString(missing, 'hero.tag', config.hero.tag)
  addMissingString(missing, 'hero.title', config.hero.title)
  addMissingString(missing, 'hero.subtitle', config.hero.subtitle)
  addMissingString(missing, 'hero.primaryCtaLabel', config.hero.primaryCtaLabel)
  addMissingString(missing, 'hero.primaryCtaLink', config.hero.primaryCtaLink)
  addMissingString(missing, 'hero.secondaryCtaLabel', config.hero.secondaryCtaLabel)
  addMissingString(missing, 'hero.secondaryCtaLink', config.hero.secondaryCtaLink)
  addMissingStringArray(missing, 'techStack', config.techStack)
  addMissingString(missing, 'sections.techTitle', config.sections.techTitle)
  addMissingString(missing, 'sections.clientsIntro', config.sections.clientsIntro)
  addMissingStringArray(missing, 'sections.clients', config.sections.clients)
  addMissingString(missing, 'sections.servicesTitle', config.sections.servicesTitle)
  addMissingString(missing, 'sections.projectsTitle', config.sections.projectsTitle)
  addMissingString(missing, 'sections.processTitle', config.sections.processTitle)
  addMissingString(missing, 'sections.contactLead', config.sections.contactLead)
  addMissingString(missing, 'sections.terminalTitle', config.sections.terminalTitle)
  addMissingString(missing, 'sections.terminalIntro', config.sections.terminalIntro)
  addMissingString(missing, 'consulting.title', config.consulting.title)
  addMissingString(missing, 'consulting.description', config.consulting.description)
  addMissingStringArray(missing, 'contact.whatsappParts', config.contact.whatsappParts)
  addMissingString(missing, 'contact.whatsappMessage', config.contact.whatsappMessage)
  addMissingString(missing, 'footer.note', config.footer.note)

  if (config.stats.length === 0) {
    missing.push('stats')
  }
  config.stats.forEach((item, index) => {
    addMissingString(missing, `stats[${index}].label`, item.label)
    addMissingString(missing, `stats[${index}].value`, item.value)
  })

  if (config.services.length === 0) {
    missing.push('services')
  }
  config.services.forEach((item, index) => {
    addMissingString(missing, `services[${index}].title`, item.title)
    addMissingString(missing, `services[${index}].description`, item.description)
  })

  if (config.process.length === 0) {
    missing.push('process')
  }
  config.process.forEach((item, index) => {
    addMissingString(missing, `process[${index}].title`, item.title)
    addMissingString(missing, `process[${index}].description`, item.description)
  })

  if (config.projects.length === 0) {
    missing.push('projects')
  }
  config.projects.forEach((item, index) => {
    addMissingString(missing, `projects[${index}].title`, item.title)
    addMissingString(missing, `projects[${index}].description`, item.description)
    addMissingString(missing, `projects[${index}].result`, item.result)
  })

  return {
    isReady: missing.length === 0,
    missing,
    usingExample,
  }
}

export const siteConfigStatus = validateSiteConfig(siteConfig, !localSiteConfig)
