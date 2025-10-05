FROM node:20-alpine

RUN addgroup -S bot && adduser -S bot -G bot

WORKDIR /usr/src/bot

COPY package.json ./

RUN chown -R bot:bot /usr/src/bot

USER bot

RUN npm install

COPY --chown=bot:bot . .

CMD ["node", "src/index.js"]