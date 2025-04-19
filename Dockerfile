FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY tsconfig.json ./
COPY src/ ./src/

RUN pnpm build:ts

EXPOSE 3000

CMD ["node", "dist/index.js"]
