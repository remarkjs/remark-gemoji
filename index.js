import {nameToEmoji} from 'gemoji'
import {visit} from 'unist-util-visit'

const find = /:(\+1|[-\w]+):/g

const own = {}.hasOwnProperty

export default function remarkGemoji() {
  return transform
}

function transform(tree) {
  visit(tree, 'text', ontext)
}

function ontext(node) {
  const value = node.value
  const slices = []
  find.lastIndex = 0
  let match = find.exec(value)
  let start = 0

  while (match) {
    const position = match.index

    if (own.call(nameToEmoji, match[1])) {
      if (start !== position) {
        slices.push(value.slice(start, position))
      }

      slices.push(nameToEmoji[match[1]])
      start = position + match[0].length
    } else {
      find.lastIndex = position + 1
    }

    match = find.exec(value)
  }

  if (slices.length > 0) {
    slices.push(value.slice(start))
    node.value = slices.join('')
  }
}
