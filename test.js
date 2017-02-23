'use strict';

var test = require('tape');
var remark = require('remark');
var gemoji = require('./index.js');

test('remark-gemoji', function (t) {
  t.deepEqual(
    remark()
      .data('settings', {pedantic: true, position: false})
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
    }
  );

  t.deepEqual(
    remark()
      .data('settings', {pedantic: true, position: false})
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
    }
  );

  t.end();
});
