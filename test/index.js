import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import process from 'node:process'
import test from 'node:test'
import {nameToEmoji} from 'gemoji'
import {remark} from 'remark'
import remarkGemoji from 'remark-gemoji'

test('remarkGemoji', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('remark-gemoji')).sort(), [
      'default'
    ])
  })

  /** @type {string} */
  let name

  for (name in nameToEmoji) {
    if (Object.hasOwn(nameToEmoji, name)) {
      await t.test(
        '`:' + name + ':` > `' + nameToEmoji[name] + '`',
        async function () {
          assert.equal(
            String(
              await remark()
                .use(remarkGemoji)
                .process('Lorem :' + name + ': ipsum.')
            ),
            'Lorem ' +
              (name === 'asterisk' ? '\\' : '') +
              nameToEmoji[name] +
              ' ipsum.\n'
          )
        }
      )
    }
  }
})

test('fixtures', async function (t) {
  const base = new URL('fixtures/', import.meta.url)
  const folders = await fs.readdir(base)

  let index = -1

  while (++index < folders.length) {
    const folder = folders[index]

    if (folder.startsWith('.')) continue

    await t.test(folder, async function () {
      const folderUrl = new URL(folder + '/', base)
      const inputUrl = new URL('input.md', folderUrl)
      const outputUrl = new URL('output.md', folderUrl)

      const input = String(await fs.readFile(inputUrl))
      const actual = String(await remark().use(remarkGemoji).process(input))

      /** @type {string} */
      let output

      try {
        if ('UPDATE' in process.env) {
          throw new Error('Updating…')
        }

        output = String(await fs.readFile(outputUrl))
      } catch {
        output = actual
        await fs.writeFile(outputUrl, actual)
      }

      assert.equal(actual, String(output))
    })
  }
})
