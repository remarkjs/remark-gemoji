/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:gemoji
 * @fileoverview Test suite for `remark-gemoji`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var gemoji = require('./index.js');

/*
 * Tests.
 */

test('remark-gemoji', function (t) {
    var processor = remark().use(gemoji);

    t.deepEqual(processor.parse(':a_b_c:', {
        'pedantic': true,
        'position': false
    }), {
        'type': 'root',
        'position': undefined,
        'children': [{
            'type': 'paragraph',
            'position': undefined,
            'children': [
                {'type': 'text', 'position': undefined, 'value': ':a'},
                {
                    'type': 'emphasis',
                    'position': undefined,
                    'children': [{
                        'type': 'text',
                        'position': undefined,
                        'value': 'b'
                    }]
                },
                {'type': 'text', 'position': undefined, 'value': 'c:'}
            ]
        }]
    });

    t.deepEqual(processor.parse(':heavy_check_mark:', {
        'pedantic': true,
        'position': false
    }), {
        'type': 'root',
        'position': undefined,
        'children': [{
            'type': 'paragraph',
            'position': undefined,
            'children': [
                {
                    'type': 'text',
                    'position': undefined,
                    'value': ':heavy_check_mark:'
                }
            ]
        }]
    });

    t.end();
});
