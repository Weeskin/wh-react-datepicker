import { useEffect, useRef } from "react"
import type { KeyboardEvent, ReactNode } from "react"

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface FocusTrapProps {
  isActive: boolean
  children: ReactNode
}

// --- PIÈGE DE FOCUS RÉUTILISABLE : CONFINE LE FOCUS CLAVIER (TAB) À SES ENFANTS QUAND isActive. ---
export default function FocusTrap({ isActive, children }: FocusTrapProps) {
  // State et constantes
  const containerRef = useRef<HTMLDivElement>(null)

  // Comportement

  // --- PLACE LE FOCUS SUR LE PREMIER ÉLÉMENT FOCUSABLE À L'ACTIVATION. ---
  useEffect(() => {
    if (!isActive) { return }
    const focusables = containerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    focusables?.[0]?.focus()
  }, [isActive])

  // --- FAIT BOUCLER LE FOCUS ENTRE LE PREMIER ET LE DERNIER ÉLÉMENT FOCUSABLE. ---
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isActive || e.key !== "Tab") { return }
    const container = containerRef.current
    if (!container) { return }
    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (focusables.length === 0) { return }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  // Rendu du composant
  return (
    <div ref={containerRef} onKeyDown={handleKeyDown}>
      {children}
    </div>
  )
}
