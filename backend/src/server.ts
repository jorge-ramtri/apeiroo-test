import app from './app';
import config from './config';
import logger from './config/simpleLogger';

const PORT = config.backend.port;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    logger.info(`Server running on port ${PORT}`);
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


// Close logs
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing server');
  server.close(() => {
    logger.info('Server closed');
    logger.close();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing server');
  server.close(() => {
    logger.info('Server closed');
    logger.close();
    process.exit(0);
  });
});
