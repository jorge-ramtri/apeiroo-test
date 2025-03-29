import express from 'express';
import router from './routes/hello';

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
