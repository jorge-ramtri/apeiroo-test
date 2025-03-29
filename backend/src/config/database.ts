import { Pool } from 'pg';
import config from '../config';

// 
const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
});

// Manejo de errores en clientes inactivos del pool.
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

export default pool;

// Función para cerrar la conexión, útil en tests.
export const closeDb = async (): Promise<void> => {
  await pool.end();
};
