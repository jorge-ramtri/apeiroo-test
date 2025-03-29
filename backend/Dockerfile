# Usar la imagen oficial de Node.js como base
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Exponer el puerto en el que la aplicación se ejecutará (por ejemplo, 4000)
EXPOSE 4000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "dist/index.js"]
