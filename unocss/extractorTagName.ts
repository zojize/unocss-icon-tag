import type { Extractor } from 'unocss'
import { parse } from '@vue/compiler-sfc'
import type { TemplateChildNode } from '@vue/compiler-core'

export default () => <Extractor>({
  name: 'tag-name',
  extract: async (ctx) => {
    if (!ctx.id?.endsWith('vue'))
      return undefined

    const ast = parse(ctx.code).descriptor.template?.ast

    if (!ast)
      return undefined

    const result = new Set<string>()

    const todo: TemplateChildNode[] = [ast]
    while (todo.length) {
      const node = todo.pop()!
      if ('children' in node) {
        for (const child of node.children) {
          if (typeof child !== 'object')
            continue

          if (child.type === /** @type {NodeTypes.ELEMENT} */ 1)
            result.add(child.tag)

          if ('children' in child)
            todo.push(child)
        }
      }
    }

    return result
  },
  // desired custom escape api
  // escape: (selector: string) => selector,
})

