import { ref } from 'vue'

export function useBooleansSelector() {
  const selects = ref<boolean[]>([])
  const lastSelection = ref<number>(0)
  const init = (length: number) => {
    selects.value = Array(length).fill(false)
  }
  const select = (index: number) => {
    selects.value[index] = !selects.value[index]
    if (selects.value[index]) {
      lastSelection.value = index
    }
  }
  const updatelast = (index: number) => {
    if (selects.value[index]) {
      lastSelection.value = index
    }
  }
  const selectFromLast = (index: number) => {
    for (
      let i = Math.min(lastSelection.value, index);
      i < Math.max(lastSelection.value, index);
      i++
    ) {
      selects.value[i] = true
    }
  }
  const useTrueIndexes = (): number[] => {
    return selects.value.reduce((acc, value, index) => {
      if (value) acc.push(index)
      return acc
    }, [] as number[])
  }
  const cancelAll = () => {
    selects.value.forEach((selected, index) => {
      selects.value[index] = false
    })
  }

  return {
    selects,
    lastSelection,
    init,
    select,
    updatelast,
    selectFromLast,
    useTrueIndexes,
    cancelAll,
  }
}
