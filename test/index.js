'use strict'

var fs = require('fs')
var path = require('path')
var test = require('tape')
var gemoji2emoji = require('gemoji/name-to-emoji')
var remark = require('remark')
var gemoji = require('..')

test('remark-gemoji', function (t) {
  var base = path.join(__dirname, 'fixtures')

  fs.readdirSync(base)
    .filter((basename) => /\.input\.md$/.test(basename))
    .forEach(each)

  t.end()

  function each(basename) {
    var input = String(fs.readFileSync(path.join(base, basename)))
    var outputPath = path.join(base, basename).replace(/\.input\./, '.output.')
    var expected
    var actual

    try {
      expected = String(fs.readFileSync(outputPath))
    } catch (_) {
      expected = input
    }

    actual = remark().use(gemoji).processSync(input).toString()

    t.equal(actual, expected, basename)
  }
})

test('gemoji', function (t) {
  Object.keys(gemoji2emoji).forEach(each)

  t.end()

  function each(name) {
    t.equal(
      remark()
        .use(gemoji)
        .processSync('Lorem :' + name + ': ipsum.')
        .toString(),
      'Lorem ' +
        (name === 'asterisk' ? '\\' : '') +
        gemoji2emoji[name] +
        ' ipsum.\n',
      '`:' + name + ':` > `' + gemoji2emoji[name] + '`'
    )
  }
})
