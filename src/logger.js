import moment from 'moment';

class Logger {
  message(msg) {
    console.log(`[${moment().format('DD/MM/YYYY - HH:mm:ss')}] ${msg}`);
  }
}

export default new Logger();
