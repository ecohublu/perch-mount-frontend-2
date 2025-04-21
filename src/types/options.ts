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

export function convertBehaviorsToSelectedOptions(behaviors: Behavior[]): SelectedOption[] {
  const options = [] as SelectedOption[]
  for (const behavior of behaviors) {
    options.push({
      code: behavior.id,
      name: behavior.name,
    })
  }
  return options
}
