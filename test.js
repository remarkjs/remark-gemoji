/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:gemoji
 * @fileoverview Test suite for `remark-gemoji`.
 */

'use strict';

/* Dependencies. */
var test = require('tape');
var remark = require('remark');
var gemoji = require('./index.js');

/* Tests. */
test('remark-gemoji', function (t) {
  var processor = remark().use(gemoji);

  t.deepEqual(processor.parse(':a_b_c:', {
    pedantic: true,
    position: false
  }), {
    type: 'root',
    children: [{
      type: 'paragraph',
      children: [
        {type: 'text', value: ':a'},
        {
          type: 'emphasis',
          children: [{
            type: 'text',
            value: 'b'
          }]
        },
        {type: 'text', value: 'c:'}
      ]
    }]
  });

  t.deepEqual(processor.parse(':heavy_check_mark:', {
    pedantic: true,
    position: false
  }), {
    type: 'root',
    children: [{
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: ':heavy_check_mark:'
        }
      ]
    }]
  });

  t.end();
});
