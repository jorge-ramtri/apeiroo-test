import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
/*
In order to add a new configuration, follow this setps:

1. If the values are sensible, use ENV_VARS, and add those variables to the validations.
2. If needed, create a new type, or update the existing ones.
3. Add the new configurations to the Config definition.
4. Set the value or env_var to the object.

*/

// Vaiidate env variables
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Faltan variables de entorno requeridas en el archivo .env');
}

//Validate port
const port = parseInt(DB_PORT, 10);
if (isNaN(port)) {
  throw new Error('La variable DB_PORT debe ser un número válido');
}

// Types ---------------------------------
// Config for PostgreSQL Pool type object.
interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

// Config object definition ---------------
interface Config {
  database: DatabaseConfig
  // En el futuro podemos añadir aquí más secciones de config
}

// config object setting
const config: Config = {
  database: {
    host: DB_HOST,
    port: port,
    user: DB_USER,
    password: DB_PASSWORD,
    name: DB_NAME,
  },
};

export default config;
