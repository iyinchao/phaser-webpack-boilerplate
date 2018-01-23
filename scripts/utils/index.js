const pathLib = require('path')
const fs = require('fs')
const chalk = require('chalk')
const babel = require('babel-core')
const requireFromString = require('require-from-string')

exports.path = (...locations) => {
  return pathLib.join(__dirname, '../../', ...locations)
}

exports.env = () => {
  return {
    nodeEnv: process.env.NODE_ENV || 'develop',
    buildTarget: process.env.BUILD_TARGET || 'web'
  }
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

const requireCache = {}

// Transform es6 module (pre-compile) into commonjs module
exports.requireES6 = (path, isRelativeToRoot = true) => {
  let p = path
  if (isRelativeToRoot) {
    p = exports.path(path)
  }

  const babelrc = {
    plugins: [
      'transform-inline-environment-variables',
      ['transform-es2015-modules-commonjs', {
        loose: true
      }]
    ]
  }

  // TODO: auto detect 'index' files if 'p' is a folder
  try {
    const stats = fs.lstatSync(p)
    if (stats.isFile()) {
      if (requireCache[p] === undefined) {
        let text
        text = fs.readFileSync(p, 'utf8')
        const compiled = babel.transform(text, babelrc)
        requireCache[p] = requireFromString(compiled.code).default
      }

      return requireCache[p]
    } else {
      throw Error(`Failed to require, ${p} is not a directory.`)
    }
  } catch (e) {
    console.error(e)
  }
}
