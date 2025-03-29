import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
/*
In order to add a new configuration, follow this setps:

1. If the values are sensible, use ENV_VARS, and add those variables to the validations.
2. If needed, create a new type, or update the existing ones.
3. Add the new configurations to the Config definition.
4. Set the value or env_var to the object.

*/

// Vaiidate env variables
const { BACK_PORT, FRONT_PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!BACK_PORT || !FRONT_PORT || !DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error('Missing some enviroment variable');
}

//Validate ports
[ BACK_PORT, FRONT_PORT, DB_PORT].forEach((element) => { 
  const port = parseInt(element, 10)
  if (isNaN(port)) {
    throw new Error('Ports must be a valid number.');
  }
});

// Types ---------------------------------
interface BackendConfig {
  port: number;
}

interface FrontendConfig {
  port: number;
}

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
  backend: BackendConfig;
  frontend: FrontendConfig;
  database: DatabaseConfig;
}

// config object setting ------------------
const config: Config = {
  backend: {
    port: parseInt(BACK_PORT, 10)
  },
  frontend: {
    port: parseInt(FRONT_PORT, 10)
  },
  database: {
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    user: DB_USER,
    password: DB_PASSWORD,
    name: DB_NAME,
  },
};

export default config;
