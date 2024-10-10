# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo
WORKDIR /app

# Copia los archivos locales al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto 3001
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
