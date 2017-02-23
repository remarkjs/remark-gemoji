'use strict';

var has = require('has');
var gemoji = require('gemoji').name;

module.exports = plugin;

var colon = ':';

function plugin() {
  var proto = this.Parser.prototype;
  var methods = proto.inlineMethods;

  proto.inlineTokenizers.gemojiShortCode = tokenize;

  methods.splice(methods.indexOf('strong'), 0, 'gemojiShortCode');
}

function tokenize(eat, value, silent) {
  var subvalue;
  var pos;

  /* Check if we’re at a short-code. */
  if (value.charAt(0) !== colon) {
    return;
  }

  pos = value.indexOf(colon, 1);

  if (pos === -1) {
    return;
  }

  subvalue = value.slice(1, pos);

  if (!has(gemoji, subvalue)) {
    return;
  }

  /* Yup, it’s a short-code.  Exit with true in silent
   * mode. */

  /* istanbul ignore if */
  if (silent) {
    return true;
  }

  /* Eat a text-node. */
  subvalue = colon + subvalue + colon;

  return eat(subvalue)({
    type: 'text',
    value: subvalue
  });
}

tokenize.locator = locate;

function locate(value, fromIndex) {
  return value.indexOf(colon, fromIndex);
}
