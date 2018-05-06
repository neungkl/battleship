FROM node:8

RUN useradd -ms /bin/bash battleship

WORKDIR /home/battleship/backend

COPY package.json .
COPY package-lock.json .

RUN yarn

COPY . .

CMD ["npm", "start"]