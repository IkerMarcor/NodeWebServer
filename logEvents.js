// From NPM packages CommonJS format Import
const { format } = require('date-fns');
const { v4 : uuid } = require('uuid');

// From Node packages CommonJS format Import
const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
const path = require('node:path');

const logEvents = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        //asks if the dir does not exists will create a dir with the name 'logs'
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', fileName), logItem);
    } catch (err) {
        console.error(err);
    }
}

module.exports = logEvents;