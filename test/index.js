import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {nameToEmoji} from 'gemoji'
import {remark} from 'remark'
import gemoji from '../index.js'

const own = {}.hasOwnProperty

test('remark-gemoji', (t) => {
  const base = path.join('test', 'fixtures')
  const files = fs
    .readdirSync(base)
    .filter((basename) => /\.input\.md$/.test(basename))
  let index = -1

  while (++index < files.length) {
    const basename = files[index]
    const input = String(fs.readFileSync(path.join(base, basename)))
    const outputPath = path
      .join(base, basename)
      .replace(/\.input\./, '.output.')
    /** @type {string} */
    let expected

    try {
      expected = String(fs.readFileSync(outputPath))
    } catch {
      expected = input
    }

    const actual = remark().use(gemoji).processSync(input).toString()

    t.equal(actual, expected, basename)
  }

  t.end()
})

test('gemoji', (t) => {
  /** @type {keyof nameToEmoji} */
  let name

  for (name in nameToEmoji) {
    if (own.call(nameToEmoji, name)) {
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
  }

  t.end()
})
