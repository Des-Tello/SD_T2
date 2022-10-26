FROM node:14

WORKDIR /home/node

COPY . .

RUN npm install
RUN npm install -g nodemon
CMD [ "npm", "start" ]