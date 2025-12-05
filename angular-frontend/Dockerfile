# Usamos una imagen oficial de Node.js (versión 20)
FROM node:20-alpine

# Establecemos el directorio de trabajo DENTRO del contenedor
WORKDIR /app

# Instalamos el Angular CLI (la herramienta de comandos de Angular)
# de forma global DENTRO del contenedor.
RUN npm install -g @angular/cli

# Exponemos el puerto 4200 (el que usa 'ng serve')
EXPOSE 4200

# El comando que se ejecutará cuando el contenedor arranque.
# 'ng serve' arranca el servidor de desarrollo.
# '--host 0.0.0.0' es CRUCIAL para que sea accesible desde fuera del contenedor.
# '--poll 2000' ayuda a detectar cambios cuando usamos Docker.
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]