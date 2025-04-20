export function parseGoogleMapPointURL(latitude: number, longitude: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${longitude}%2C${latitude}`
}
