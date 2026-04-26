import { useCallback, useEffect, useRef, useState } from 'react'

type Line =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string; link?: { href: string; label: string } }

type Props = {
  title: string
  intro: string
  techStack: string[]
  services: string[]
  projects: { title: string; result: string }[]
  whatsappUrl: string
}

const TYPE_MS = 14

export function SiteTerminal({ title, intro, techStack, services, projects, whatsappUrl }: Props) {
  const [lines, setLines] = useState<Line[]>([])
  const [typingLine, setTypingLine] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const reduceMotionRef = useRef(false)

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const typeText = useCallback(async (text: string, signal?: AbortSignal) => {
    const dead = () => signal?.aborted ?? false
    if (reduceMotionRef.current) {
      if (!dead()) setLines((l) => [...l, { kind: 'out', text }])
      return
    }
    if (dead()) return
    setTypingLine('')
    for (let i = 1; i <= text.length; i++) {
      if (dead()) {
        setTypingLine(null)
        return
      }
      setTypingLine(text.slice(0, i))
      await new Promise((r) => setTimeout(r, TYPE_MS))
    }
    if (dead()) {
      setTypingLine(null)
      return
    }
    setLines((l) => [...l, { kind: 'out', text }])
    setTypingLine(null)
  }, [])

  useEffect(() => {
    const ac = new AbortController()
    setLines([])
    setTypingLine(null)
    setInput('')
    setBusy(true)
    ;(async () => {
      await typeText('portfolio-shell · digite help', ac.signal)
      if (!ac.signal.aborted) setBusy(false)
    })()
    return () => ac.abort()
  }, [typeText])

  useEffect(() => {
    if (busy) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 80)
    return () => window.clearTimeout(t)
  }, [busy])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines, typingLine])

  const runCommand = async (raw: string) => {
    const cmd = raw
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
    if (!cmd || busy) return
    setBusy(true)
    setLines((l) => [...l, { kind: 'cmd', text: raw.trim() }])
    setInput('')

    const helpText =
      'Comandos: help · stack · servicos · projetos · contato · whatsapp · clear · exit.'

    if (cmd === 'help') {
      await typeText(helpText)
    } else if (cmd === 'stack') {
      await typeText(techStack.join(', '))
    } else if (cmd === 'servicos') {
      await typeText(services.map((service) => `- ${service}`).join('\n'))
    } else if (cmd === 'projetos') {
      await typeText(projects.map((project) => `- ${project.title}: ${project.result}`).join('\n'))
    } else if (cmd === 'contato') {
      await typeText('Vamos conversar pelo WhatsApp.')
      setLines((l) => [
        ...l,
        {
          kind: 'out',
          text: 'WhatsApp: ',
          link: { href: whatsappUrl, label: 'Abrir conversa' },
        },
      ])
    } else if (cmd === 'whatsapp') {
      setLines((l) => [
        ...l,
        {
          kind: 'out',
          text: 'WhatsApp: ',
          link: { href: whatsappUrl, label: 'Abrir conversa' },
        },
      ])
    } else if (cmd === 'clear') {
      setLines([])
    } else if (cmd === 'exit' || cmd === 'quit') {
      await typeText('O portfólio continua na página — role para explorar.')
    } else {
      await typeText(`comando não encontrado: ${raw.trim()}. Tente help.`)
    }
    setBusy(false)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    void runCommand(input)
  }

  return (
    <section id="console" className="terminal-block section-surface" aria-labelledby="terminal-heading">
      <h2 id="terminal-heading" className="terminal-block__title">
        {title}
      </h2>
      <p className="terminal-block__intro">{intro}</p>
      <div className="term-panel term-panel--inline">
        <div className="term-panel__head term-panel__head--inline">
          <span>shell</span>
        </div>
        <div className="term-panel__body term-panel__body--inline" ref={bodyRef} aria-live="polite">
          {lines.map((line, i) => (
            <div key={i} className={line.kind === 'cmd' ? 'term-line term-line--cmd' : 'term-line'}>
              {line.kind === 'cmd' ? (
                `$ ${line.text}`
              ) : (
                <>
                  {line.text}
                  {line.link ? (
                    <a
                      href={line.link.href}
                      className="term-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {line.link.label}
                    </a>
                  ) : null}
                </>
              )}
            </div>
          ))}
          {typingLine !== null && <div className="term-line term-line--typing">{typingLine}</div>}
        </div>
        <form className="term-panel__form" onSubmit={onSubmit}>
          <span className="term-panel__prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            className="term-panel__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            autoComplete="off"
            spellCheck={false}
            placeholder="help"
            aria-label="Comando"
          />
        </form>
      </div>
    </section>
  )
}
