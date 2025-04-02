const { REACT_APP_BACKEND_URL }= process.env;
/*
In order to add a new configuration, follow this setps:

1. If the values are sensible, use ENV_VARS, and add those variables to the validations.
2. If needed, create a new type, or update the existing ones.
3. Add the new configurations to the Config definition.
4. Set the value or env_var to the object.

*/

// Vaiidate env variables
if (!REACT_APP_BACKEND_URL) {
  throw new Error('REACT_APP_BACKEND_URL is not defined');
}

// Types ---------------------------------

// Config object definition ---------------
interface Config {
  API_URL: string;
}

// config object setting ------------------
const config: Config = {
  API_URL: REACT_APP_BACKEND_URL
}

export default config;
