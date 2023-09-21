/**
 * @typedef {import('mdast').Root} Root
 */

import {nameToEmoji} from 'gemoji'
import {findAndReplace} from 'mdast-util-find-and-replace'

/**
 * Turn gemoji shortcodes (`:+1:`) into emoji (`👍`).
 *
 * @returns
 *   Transform.
 */
export default function remarkGemoji() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    findAndReplace(tree, [
      /:(\+1|[-\w]+):/g,
      /**
       * @param {string} _
       * @param {string} $1
       */
      function (_, $1) {
        return Object.hasOwn(nameToEmoji, $1) ? nameToEmoji[$1] : false
      }
    ])
  }
}
