import {nameToEmoji} from 'gemoji'
import {visit} from 'unist-util-visit'

var find = /:(\+1|[-\w]+):/g

var own = {}.hasOwnProperty

export default function remarkGemoji() {
  return transform
}

function transform(tree) {
  visit(tree, 'text', ontext)
}

function ontext(node) {
  var value = node.value
  var slices = []
  var start = 0
  var match
  var position

  find.lastIndex = 0
  match = find.exec(value)

  while (match) {
    position = match.index

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

  if (slices.length) {
    slices.push(value.slice(start))
    node.value = slices.join('')
  }
}
