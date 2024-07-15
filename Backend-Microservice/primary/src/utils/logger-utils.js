const chalk = require('chalk');
const customLogger = (msg) => {
    const formattedMsg = msg.replace(/(\r\n|\n|\r)/gm, " "); // Remove newlines
    console.log(chalk.blue(`[Sequelize] ${formattedMsg}`));
};

module.export = {
    customLogger
}