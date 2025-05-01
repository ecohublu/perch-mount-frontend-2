import type { SelectedOption } from '@/types/options'

export const selectOptionWithCode = (
  code: string,
  options: SelectedOption[],
): SelectedOption | null => {
  for (const option of options) {
    if (option.code === code) {
      return option
    }
  }
  return null
}
