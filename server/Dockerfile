FROM node:16-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm install
RUN npm rebuild --verbose sharp
RUN npm run build

FROM pptrdocker/pptr-alpine:latest
WORKDIR /app
COPY --from=builder /app ./

# Установка зависимостей для Chromium
RUN apk add --no-cache \
    libstdc++ \
    chromium

# Установка переменной среды для Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

EXPOSE 3000

CMD ["npm", "run", "start:prod"]