export function shuffleArrayKeepFirst(arr: string[]): string[] {
  // 如果陣列為空或只有一個元素，無需排列，直接回傳副本
  if (arr.length <= 1) {
    return [...arr] // 使用展開語法創建副本
  }

  // 創建一個原始陣列的副本，避免修改原始陣列
  const shuffledArray = [...arr]

  // Fisher-Yates 洗牌演算法，但只對索引 1 到最後一個元素進行操作
  // 從倒數第二個元素 (index = length - 1) 開始往前迭代到索引 1
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // 隨機選擇一個索引 j，範圍從 1 到 i（包含 i）
    // Math.random() * i 會產生 0 到 i 之間 (不含 i) 的浮點數
    // Math.floor() 取整數，得到 0 到 i-1 之間的整數
    // + 1 將範圍移至 1 到 i
    const j = Math.floor(Math.random() * i) + 1

    // 交換索引 i 和索引 j 的元素
    // 使用解構賦值來交換，語法更簡潔
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  // 回傳排列後的新陣列
  return shuffledArray
}
