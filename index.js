'use strict'

var gemoji2emoji = require('gemoji/name-to-emoji')

module.exports = gemoji

var colon = ':'
var own = {}.hasOwnProperty

tokenize.locator = locate

function gemoji() {
  var parser = this.Parser
  var proto

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `remark-gemoji` to')
  }

  proto = this.Parser.prototype

  proto.inlineTokenizers.gemojiShortCode = tokenize
  proto.inlineMethods.splice(
    proto.inlineMethods.indexOf('strong'),
    0,
    'gemojiShortCode'
  )
}

function tokenize(eat, value, silent) {
  var subvalue
  var pos

  // Check if we are at a shortcode.
  if (value.charAt(0) !== colon) {
    return
  }

  pos = value.indexOf(colon, 1)

  if (pos === -1) {
    return
  }

  subvalue = value.slice(1, pos)

  if (!own.call(gemoji2emoji, subvalue)) {
    return
  }

  /* istanbul ignore if - Yup, it’s a shortcode.  Exit with true in silent mode. */
  if (silent) {
    return true
  }

  // Eat a text.
  subvalue = colon + subvalue + colon

  return eat(subvalue)({type: 'text', value: subvalue})
}

function locate(value, fromIndex) {
  return value.indexOf(colon, fromIndex)
}

function isRemarkParser(parser) {
  return Boolean(
    parser && parser.prototype && parser.prototype.inlineTokenizers
  )
}
