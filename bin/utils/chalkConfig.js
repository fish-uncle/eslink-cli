const chalk = require('chalk')

module.exports = {
  chalkError: msg => console.log(chalk.red(msg)),
  chalkSuccess: msg => console.log(chalk.green(msg)),
  chalkWarning: msg => console.log(chalk.yellow(msg)),
  chalkProcessing: msg => console.log(chalk.blue(msg))
}