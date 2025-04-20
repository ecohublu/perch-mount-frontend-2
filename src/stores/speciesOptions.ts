import { defineStore } from 'pinia'
import type { SearchResult } from '@/types/species'

export const useSpeciesOptionsStore = defineStore('speciesOptions', {
  state: () => ({
    options: [
      {
        chinese_common_name: '黑領椋鳥',
        code: 27252,
      },
      {
        chinese_common_name: '黑眉柳鶯',
        code: 24432,
      },
      {
        chinese_common_name: '黑枕藍鶲',
        code: 20184,
      },
      {
        chinese_common_name: '黑鳶',
        code: 8086,
      },
      {
        chinese_common_name: '黑翅山椒鳥',
        code: 18383,
      },
      {
        chinese_common_name: '黑翅鳶',
        code: 7575,
      },
      {
        chinese_common_name: '黑面琵鷺',
        code: 7537,
      },
      {
        chinese_common_name: '黑頭/褐頭鵐',
        code: 32030,
      },
      {
        chinese_common_name: '黑頭鵐',
        code: 32027,
      },
      {
        chinese_common_name: '黑頭文鳥',
        code: 30469,
      },
      {
        chinese_common_name: '黑頭織雀',
        code: 30199,
      },
      {
        chinese_common_name: '黑頭翡翠',
        code: 9725,
      },
      {
        chinese_common_name: '黑頭白䴉',
        code: 7507,
      },
      {
        chinese_common_name: '黑冠椋鳥',
        code: 27265,
      },
      {
        chinese_common_name: '黑冠鵑隼',
        code: 7655,
      },
      {
        chinese_common_name: '黑冠麻鷺',
        code: 7460,
      },
      {
        chinese_common_name: '黑鸛',
        code: 7053,
      },
      {
        chinese_common_name: '黑白水薙鳥類',
        code: 7032,
      },
      {
        chinese_common_name: '黑叉尾海燕',
        code: 6842,
      },
      {
        chinese_common_name: '黑腳信天翁',
        code: 6789,
      },
      {
        chinese_common_name: '黑背三趾翠鳥',
        code: 9599,
      },
      {
        chinese_common_name: '黑背白腹穴鳥',
        code: 6960,
      },
      {
        chinese_common_name: '黑背信天翁',
        code: 6788,
      },
      {
        chinese_common_name: '黑喉鴝',
        code: 29055,
      },
      {
        chinese_common_name: '黑喉噪眉',
        code: 26217,
      },
      {
        chinese_common_name: '黑喉潛鳥',
        code: 6715,
      },
      {
        chinese_common_name: '黑玄燕鷗',
        code: 6517,
      },
      {
        chinese_common_name: '黑嘴端鳳頭燕鷗',
        code: 6675,
      },
      {
        chinese_common_name: '黑嘴鷗',
        code: 6366,
      },
      {
        chinese_common_name: '黑腹燕鷗',
        code: 6604,
      },
      {
        chinese_common_name: '黑腹濱鷸',
        code: 6010,
      },
      {
        chinese_common_name: '黑尾鷗',
        code: 6414,
      },
      {
        chinese_common_name: '黑尾鷸',
        code: 5962,
      },
      {
        chinese_common_name: '黑林鴿',
        code: 1917,
      },
      {
        chinese_common_name: '黑頸x赤頸鶇(雜交)',
        code: 28155,
      },
      {
        chinese_common_name: '黑頸鸊鷉',
        code: 1834,
      },
      {
        chinese_common_name: '黑長尾雉',
        code: 1396,
      },
      {
        chinese_common_name: '黑天鵝',
        code: 355,
      },
    ] as Array<SearchResult>,
  }),
})
