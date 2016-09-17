/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:gemoji
 * @fileoverview Gemoji short-code support in remark.
 */

'use strict';

/* Dependencies. */
var has = require('has');
var gemoji = require('gemoji').name;

/* Expose. */
module.exports = plugin;

/* Constants. */
var C_COLON = ':';

/**
 * Attach.
 *
 * @param {Remark} remark - Instance.
 */
function plugin(remark) {
  var proto = remark.Parser.prototype;
  var methods = proto.inlineMethods;

  /* Add a tokenizer to the `Parser`. */
  proto.inlineTokenizers.gemojiShortCode = tokenize;

  methods.splice(methods.indexOf('strong'), 0, 'gemojiShortCode');
}

/**
 * Tokenize a short-code.
 *
 * @example
 *   shortCode(eat, '@foo'); // 4
 *
 * @property {Function} locator - Mention locator.
 * @param {function(string)} eat - Eater.
 * @param {string} value - Rest of content.
 * @param {boolean?} [silent] - Whether this is a dry run.
 * @return {Node?|boolean} - `delete` node.
 */
function tokenize(eat, value, silent) {
  var subvalue;
  var pos;

  /* Check if we’re at a short-code. */
  if (value.charAt(0) !== C_COLON) {
    return;
  }

  pos = value.indexOf(C_COLON, 1);

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
  subvalue = C_COLON + subvalue + C_COLON;

  return eat(subvalue)({
    type: 'text',
    value: subvalue
  });
}

tokenize.locator = locate;

/**
 * Find a possible gemoji short-code.
 *
 * @example
 *   locate('foo :bar:'); // 4
 *
 * @param {string} value - Value to search.
 * @param {number} fromIndex - Index to start searching at.
 * @return {number} - Location of possible mention sequence.
 */
function locate(value, fromIndex) {
  return value.indexOf(C_COLON, fromIndex);
}
