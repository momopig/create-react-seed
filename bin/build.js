#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const { exec } = require('child_process')
const { gitUrl } = require('./config.js')

program.version('0.1.0')
program
  .option('-p, --pc', 'dowload react-seed for pc')
  .option('-m, --mobile', 'download react-seed for mobile')
  .option('-h, --help', '')

program.parse(process.argv)

let gitAddress = ''
if (program.mobile) {
  gitAddress = 'http://git.sz.haizhi.com/department/frontend/react-seed-mobile.git'
} else {
  gitAddress = 'http://git.sz.haizhi.com/department/frontend/react-seed-pc.git'
}
const nameOfNewProject = program.args[0]
if (nameOfNewProject) {
  const cloneCommand = `git clone ${gitAddress} ${nameOfNewProject}`
  const spinner = ora('正在初始项目中').start()

  exec(cloneCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.redBright('error: ' + error))
      spinner.fail('初始项目失败').stop()
      return
    }
    spinner.succeed('初始项目完成').stop()
    const removeOriginCommand = `cd  ${nameOfNewProject}&&rm -rf .git`
    exec(removeOriginCommand)
  })
} else {
  if (program.help) {
    console.log('--help')
  } else {
    console.log('the project name should not be empty!')
  }
}


