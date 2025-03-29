import app from './app';
import config from './config';

const PORT = config.backend.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
