import * as fs from 'fs';
import * as path from 'path';

class SimpleLogger {
  private stream: fs.WriteStream;

  constructor(logFilePath: string) {
    this.stream = fs.createWriteStream(logFilePath, { flags: 'a' });
  }

  private log(level: string, message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}${error ? ' - ' + error.stack : ''}\n`;
    this.stream.write(logMessage);
    console.log(logMessage);
  }

  info(message: string): void {
    this.log('info', message);
  }

  error(message: string, error?: Error): void {
    this.log('error', message, error);
  }

  close(): void {
    this.stream.end();
  }
}

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logFilePath = path.join(logDir, 'app.log');
const logger = new SimpleLogger(logFilePath);
export default logger;
