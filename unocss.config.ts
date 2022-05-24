import { defineConfig, extractorSplit } from 'unocss'
import extractorTagName from './unocss/extractorTagName'

export default defineConfig({
  shortcuts: [
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  extractors: [
    extractorSplit,
    extractorTagName(),
  ],
})
