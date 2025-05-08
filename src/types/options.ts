export interface Option {
  name?: string
  model_name?: string
  id: string
}

export interface Camera {
  model_name: string
  id: string
}

export interface MountType {
  name: string
  id: string
}

export interface Behavior {
  name: string
  id: string
}

export interface Event {
  name: string

  id: string
}

export interface SelectedOption {
  code: string
  name: string
}
export type Severity = 'error' | 'secondary' | 'info' | 'success' | 'warn' | 'contrast'

export function convertOptionsToSelectedOptions(options: Option[]): SelectedOption[] {
  const selectedOptions = [] as SelectedOption[]
  for (const option of options) {
    selectedOptions.push({
      code: option.id,
      name: option.name ? option.name! : option.model_name!,
    })
  }
  return selectedOptions
}
