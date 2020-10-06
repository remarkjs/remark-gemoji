'use strict'

var gemoji2emoji = require('gemoji/name-to-emoji')
var visit = require('unist-util-visit')

module.exports = gemoji

var find = /:(\+1|[-\w]+):/g

var own = {}.hasOwnProperty

function gemoji() {
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

    if (own.call(gemoji2emoji, match[1])) {
      if (start !== position) {
        slices.push(value.slice(start, position))
      }

      slices.push(gemoji2emoji[match[1]])
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
