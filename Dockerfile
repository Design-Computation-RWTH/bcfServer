FROM node:latest

WORKDIR /app
#/usr/src/app
#COPY package.json .
#COPY nodemon.json .
#COPY package-lock.json .
COPY ["package.json", "package-lock.json*", "nodemon.json", "./"]
RUN npm install

COPY . /app

EXPOSE 3000

# ENTRYPOINT ["node"]

CMD ["npm", "start"]
