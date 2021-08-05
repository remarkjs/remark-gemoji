import fs from 'fs'
import path from 'path'
import test from 'tape'
import {nameToEmoji} from 'gemoji'
import remark from 'remark'
import gemoji from '../index.js'

test('remark-gemoji', function (t) {
  var base = path.join('test', 'fixtures')

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
  Object.keys(nameToEmoji).forEach(each)

  t.end()

  function each(name) {
    t.equal(
      remark()
        .use(gemoji)
        .processSync('Lorem :' + name + ': ipsum.')
        .toString(),
      'Lorem ' +
        (name === 'asterisk' ? '\\' : '') +
        nameToEmoji[name] +
        ' ipsum.\n',
      '`:' + name + ':` > `' + nameToEmoji[name] + '`'
    )
  }
})
