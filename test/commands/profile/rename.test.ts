import {expect, test} from '@oclif/test'

describe('profile/rename', () => {
  test
  .stdout()
  .command(['profile/rename'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['profile/rename', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
