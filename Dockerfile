#para desplegar la aplicacion
# dockerfile nos ayuda crear una imagen del codigo fuente
FROM node:16
#que version de docker 



#para crear el directorio
WORKDIR /usr/src/app

#copia el package.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]