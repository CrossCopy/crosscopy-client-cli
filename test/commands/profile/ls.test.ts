import {expect, test} from '@oclif/test'

describe('profile/ls', () => {
  test
  .stdout()
  .command(['profile/ls'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['profile/ls', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
