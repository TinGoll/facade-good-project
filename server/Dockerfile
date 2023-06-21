FROM node:16-alpine AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm install
RUN npm rebuild --verbose sharp
RUN npm run build

FROM zenika/alpine-chrome

# Установка зависимостей Chrome для Puppeteer
RUN apk add --no-cache \
        udev \
        ttf-freefont \
        harfbuzz \
        nss \
        freetype \
        freetype-dev \
        zlib \
        dbus \
        xvfb

# Добавление пользователя и группы
RUN addgroup -S myuser && adduser -S -G myuser myuser
USER myuser

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]