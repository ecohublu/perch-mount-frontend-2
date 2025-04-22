export const roundToDecimalPlaces = (num: number, decimals: number = 4): number => {
  if (isNaN(num) || !isFinite(num)) {
    return 0
  }
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}
