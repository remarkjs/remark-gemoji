'use strict';

var test = require('tape');
var unified = require('unified');
var parse = require('remark-parse');
var gemoji = require('.');

test('remark-gemoji', function (t) {
  t.throws(
    function () {
      unified().use(gemoji).freeze();
    },
    /^Error: Missing parser to attach `remark-gemoji` to/,
    'should throw if without parser'
  );

  t.deepEqual(
    unified()
      .use(parse, {pedantic: true, position: false})
      .use(gemoji)
      .parse(':a_b_c:'),
    {
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
    },
    'should ignore unknown gemoji'
  );

  t.deepEqual(
    unified()
      .use(parse, {pedantic: true, position: false})
      .use(gemoji)
      .parse(':heavy_check_mark:'),
    {
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
    },
    'should support gemoji'
  );

  t.end();
});
