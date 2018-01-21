const path = require('path')
const chalk = require('chalk')

exports.path = (...locations) => {
  return path.join(__dirname, '../../', ...locations)
}

exports.env = () => {

}

exports.logger = (level, message, extraInfo = null) => {
  let msg = '\n'
  switch (level) {
    case 'success':
      msg += chalk.bgGreen(chalk.black(' SUCCESS '))
      msg += chalk.green(` ${message}`)
      break
    case 'error':
      msg += chalk.bgRed(chalk.black(' ERROR '))
      msg += chalk.red(` ${message}`)
      if (extraInfo) {
        if (extraInfo.stack) {
          msg += '\n\nStack trace:\n\n'
          msg += chalk.red(extraInfo.stack)
        } else {
          msg += '\n\nError info:\n\n'
          msg += extraInfo + ''
        }
      }
      break
    case 'warn':
      msg += chalk.bgYellow(chalk.black(' WARN '))
      msg += chalk.yellow(` ${message}`)
      break
    case 'info':
    default:
      msg += chalk.bgBlue(chalk.black(' INFO '))
      msg += chalk.blue(` ${message}`)
  }

  console.log(msg)
}

exports.requireES6 = () => {

}
