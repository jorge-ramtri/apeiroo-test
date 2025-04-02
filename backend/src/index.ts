import app from './app';
import config from './config';
import logger from './config/simpleLogger';

const PORT = config.backend.port;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', error);
  process.exit(1);
});

// Unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', reason instanceof Error ? reason : new Error(String(reason)));
  process.exit(1);
});

