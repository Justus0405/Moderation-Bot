FROM node:20-alpine

USER node

WORKDIR /home/node/llm-bot

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

CMD ["node", "src/index.js"]