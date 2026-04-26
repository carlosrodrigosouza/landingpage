import { useState } from 'react'

const VARIANTS = [
  'yp',
  'yn',
  'xp',
  'xn',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
] as const

type Props = {
  title: string
  description: string
}

export function ServiceFlipCard({ title, description }: Props) {
  const [flipVariant, setFlipVariant] = useState<(typeof VARIANTS)[number] | null>(null)

  const onMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    if (flipVariant !== null) return
    setFlipVariant(VARIANTS[Math.floor(Math.random() * VARIANTS.length)])
  }

  const onAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return
    if (!String(e.animationName).includes('service-flip-')) return
    setFlipVariant(null)
  }

  const flipClass = flipVariant ? `service-card--flip-${flipVariant}` : ''

  return (
    <article className={`card ${flipClass}`.trim()} onMouseEnter={onMouseEnter} onAnimationEnd={onAnimationEnd}>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  )
}
