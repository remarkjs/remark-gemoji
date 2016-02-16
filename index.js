/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:gemoji
 * @fileoverview Gemoji short-code support in remark.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var gemoji = require('gemoji').name;

/*
 * Methods.
 */

var has = Object.prototype.hasOwnProperty;

/*
 * Constants.
 */

var C_COLON = ':';

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
    var self = this;
    var subvalue;
    var pos;

    /*
     * Check if we’re at a short-code.
     */

    if (value.charAt(0) !== C_COLON) {
        return;
    }

    pos = value.indexOf(C_COLON, 1);

    if (pos === -1) {
        return;
    }

    subvalue = value.slice(1, pos);

    if (!has.call(gemoji, subvalue)) {
        return;
    }

    /*
     * Yup, it’s a short-code.  Exit with true in silent
     * mode.
     */

    /* istanbul ignore if */
    if (silent) {
        return true;
    }

    /*
     * Eat a text-node.
     */

    subvalue = C_COLON + subvalue + C_COLON;

    return eat(subvalue)(self.renderRaw('text', subvalue));
}

tokenize.locator = locate;

/**
 * Attach.
 *
 * @param {Remark} remark - Instance.
 */
function plugin(remark) {
    var proto = remark.Parser.prototype;
    var methods = proto.inlineMethods;

    /*
     * Add a tokenizer to the `Parser`.
     */

    proto.inlineTokenizers.gemojiShortCode = tokenize;

    methods.splice(methods.indexOf('strong'), 0, 'gemojiShortCode');
}

/*
 * Expose `plugin`.
 */

module.exports = plugin;
