export function formatObjectToString(obj: Record<string, any>): string {
  let resultString = ''
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      let displayValue: string

      if (value === null) {
        displayValue = '<未設定>'
      } else if (typeof value === 'object' && value !== null && 'label' in value) {
        // 假設 SelectedOption 這樣的物件會有一個 'label' 屬性來顯示
        displayValue = value.label
      } else if (typeof value === 'object' && value !== null) {
        // 其他物件類型，使用 JSON.stringify 來顯示
        displayValue = JSON.stringify(value)
      } else {
        displayValue = String(value)
      }
      resultString += `${key}: ${displayValue}\n`
    }
  }
  return resultString.trim() // 移除最後多餘的換行符
}
