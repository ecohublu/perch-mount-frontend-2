export function getDaysBetween(startISO: string, endISO: string): number {
  const startDate = new Date(startISO)
  const endDate = new Date(endISO)

  const msPerDay = 1000 * 60 * 60 * 24
  const diffMs = endDate.getTime() - startDate.getTime()

  return Math.floor(diffMs / msPerDay)
}
