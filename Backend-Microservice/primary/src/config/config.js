const path = require('path');

module.exports = {
    development: {
        username: 'postgres',
        password: 'admin',
        database: 'your_database',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrationStorage: 'json',
        migrationStoragePath: path.join(__dirname, '../src/migrations')
    },
    production: {
        username: 'your_username',
        password: 'your_password',
        database: 'your_database',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrationStorage: 'json',
        migrationStoragePath: path.join(__dirname, '../src/migrations')
    }
};
