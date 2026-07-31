import { describe, it, expect } from "vitest"
import {
  parseDisplay,
  parseISO,
  toISO,
  formatDisplay,
  isSameDay,
  isWithinRange,
  addDays,
  daysInMonth,
} from "../date-utils"

describe("parseDisplay", () => {
  it("parse une date valide MM/DD/YYYY", () => {
    const result = parseDisplay("01/15/2000")
    expect(result).not.toBeNull()
    expect(result!.getFullYear()).toBe(2000)
    expect(result!.getMonth()).toBe(0)
    expect(result!.getDate()).toBe(15)
  })

  it("retourne null pour un mois invalide (13/01/2000)", () => {
    expect(parseDisplay("13/01/2000")).toBeNull()
  })

  it("retourne null pour un jour invalide (02/30/2000)", () => {
    expect(parseDisplay("02/30/2000")).toBeNull()
  })

  it("retourne null pour un format incorrect (YYYY-MM-DD)", () => {
    expect(parseDisplay("2000-01-15")).toBeNull()
  })

  it("retourne null pour une chaîne non-date (abc)", () => {
    expect(parseDisplay("abc")).toBeNull()
  })

  it("retourne null pour une chaîne vide", () => {
    expect(parseDisplay("")).toBeNull()
  })
})

describe("parseISO", () => {
  it("parse une date ISO valide YYYY-MM-DD", () => {
    const result = parseISO("2000-01-15")
    expect(result).not.toBeNull()
    expect(result!.getFullYear()).toBe(2000)
    expect(result!.getMonth()).toBe(0)
    expect(result!.getDate()).toBe(15)
  })

  it("retourne null pour un jour débordant (2000-02-30)", () => {
    expect(parseISO("2000-02-30")).toBeNull()
  })

  it("retourne null pour un format incorrect", () => {
    expect(parseISO("01/15/2000")).toBeNull()
  })

  it("retourne null pour une chaîne vide", () => {
    expect(parseISO("")).toBeNull()
  })
})

describe("toISO", () => {
  it("formate une date en YYYY-MM-DD avec padding", () => {
    expect(toISO(new Date(2000, 0, 5))).toBe("2000-01-05")
  })

  it("formate correctement décembre (mois 11)", () => {
    expect(toISO(new Date(2023, 11, 31))).toBe("2023-12-31")
  })
})

describe("formatDisplay", () => {
  it("formate une date en MM/DD/YYYY avec padding", () => {
    expect(formatDisplay(new Date(2000, 0, 5))).toBe("01/05/2000")
  })

  it("formate correctement décembre", () => {
    expect(formatDisplay(new Date(2023, 11, 31))).toBe("12/31/2023")
  })
})

describe("isSameDay", () => {
  it("retourne true pour deux objets Date du même jour", () => {
    expect(isSameDay(new Date(2000, 0, 15), new Date(2000, 0, 15))).toBe(true)
  })

  it("retourne false pour deux jours différents", () => {
    expect(isSameDay(new Date(2000, 0, 15), new Date(2000, 0, 16))).toBe(false)
  })

  it("retourne false pour le même jour mais des mois différents", () => {
    expect(isSameDay(new Date(2000, 0, 15), new Date(2000, 1, 15))).toBe(false)
  })
})

describe("isWithinRange", () => {
  const date = new Date(2000, 5, 15)
  const before = new Date(2000, 4, 1)
  const after = new Date(2000, 6, 1)

  it("retourne true si aucune borne n'est définie", () => {
    expect(isWithinRange(date, null, null)).toBe(true)
  })

  it("retourne false si la date est avant le min", () => {
    expect(isWithinRange(before, date, null)).toBe(false)
  })

  it("retourne false si la date est après le max", () => {
    expect(isWithinRange(after, null, date)).toBe(false)
  })

  it("retourne true pour la date exactement égale au min (borne inclusive)", () => {
    expect(isWithinRange(date, date, null)).toBe(true)
  })

  it("retourne true pour la date exactement égale au max (borne inclusive)", () => {
    expect(isWithinRange(date, null, date)).toBe(true)
  })

  it("retourne true si la date est entre min et max", () => {
    expect(isWithinRange(date, before, after)).toBe(true)
  })
})

describe("addDays", () => {
  it("ajoute des jours normalement", () => {
    const result = addDays(new Date(2000, 0, 10), 5)
    expect(isSameDay(result, new Date(2000, 0, 15))).toBe(true)
  })

  it("gère le passage de mois (31 jan + 1 = 1 fév)", () => {
    const result = addDays(new Date(2000, 0, 31), 1)
    expect(isSameDay(result, new Date(2000, 1, 1))).toBe(true)
  })

  it("gère les valeurs négatives (recul dans le temps)", () => {
    const result = addDays(new Date(2000, 1, 1), -1)
    expect(isSameDay(result, new Date(2000, 0, 31))).toBe(true)
  })
})

describe("daysInMonth", () => {
  it("retourne 28 pour février 2001 (année non bissextile)", () => {
    expect(daysInMonth(2001, 1)).toBe(28)
  })

  it("retourne 29 pour février 2000 (année bissextile)", () => {
    expect(daysInMonth(2000, 1)).toBe(29)
  })

  it("retourne 31 pour janvier", () => {
    expect(daysInMonth(2000, 0)).toBe(31)
  })

  it("retourne 30 pour avril", () => {
    expect(daysInMonth(2000, 3)).toBe(30)
  })
})
