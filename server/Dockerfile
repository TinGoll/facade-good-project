FROM node:16-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm install
RUN npm rebuild --verbose sharp
RUN npm run build

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app ./

# Установка Chromium
RUN apk add --no-cache \
    libstdc++ \
    chromium

ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

EXPOSE 3000

CMD ["npm", "run", "start:prod"]