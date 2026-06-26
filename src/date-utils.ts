// Utilitaires de date purs (sans React) — extractibles tels quels avec le futur package npm.

const pad = (n: number): string => String(n).padStart(2, "0")

// --- CONVERTIT UNE Date EN CHAÎNE ISO "YYYY-MM-DD". ---
export const toISO = (date: Date): string => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1) // getMonth() est 0-indexé : 0 = janvier, d'où le +1
  const day = pad(date.getDate())
  return `${year}-${month}-${day}`
}

// --- PARSE UNE CHAÎNE ISO "YYYY-MM-DD" EN Date (null si invalide). ---
export const parseISO = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value) // capture année, mois, jour ; null si le format ne colle pas
  if (!match) { return null }

  const year = Number(match[1])
  const month = Number(match[2]) - 1 // -1 car les mois sont 0-indexés côté Date
  const day = Number(match[3])
  const date = new Date(year, month, day) // date LOCALE (cohérent avec le reste du fichier)

  // Garde-fou : new Date(2026, 1, 30) "déborde" sur le 2 mars sans erreur.
  // On revérifie que les composantes correspondent à ce qui a été saisi.
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }
  return date
}

// --- FORMATE UNE Date POUR L'AFFICHAGE "MM/DD/YYYY". ---
export const formatDisplay = (date: Date): string => {
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

// --- PARSE UNE SAISIE "MM/DD/YYYY" EN Date (null si invalide). ---
export const parseDisplay = (value: string): Date | null => {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!match) { return null }

  const month = Number(match[1]) - 1 // 0-indexé
  const day = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month, day)

  // Même garde-fou que parseISO : vérifie qu'il n'y a pas de débordement silencieux
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }
  return date
}

// --- NOMBRE DE JOURS DANS LE MOIS (month : 0 = janvier). Astuce : new Date(y, m+1, 0).getDate(). ---
export const daysInMonth = (year: number, month: number): number => {
  // Le jour 0 du mois suivant = dernier jour du mois courant
  return new Date(year, month + 1, 0).getDate()
}

// --- JOUR DE SEMAINE DU 1ER DU MOIS (0 = dimanche). Astuce : new Date(y, m, 1).getDay(). ---
export const startWeekday = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay()
}

// --- RENVOIE UNE NOUVELLE Date DÉCALÉE DE n JOURS. ---
export const addDays = (date: Date, n: number): Date => {
  // On passe par les composantes locales pour éviter les dérives DST
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n)
}

// --- VRAI SI LES DEUX DATES SONT LE MÊME JOUR. ---
export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

// --- VRAI SI date EST DANS LES BORNES [min, max] (inclusives, bornes optionnelles). ---
export const isWithinRange = (date: Date, min: Date | null, max: Date | null): boolean => {
  const time = date.getTime()
  if (min !== null && time < new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime()) { return false }
  if (max !== null && time > new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime()) { return false }
  return true
}
