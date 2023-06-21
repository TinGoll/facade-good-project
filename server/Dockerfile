FROM zenika/alpine-chrome AS builder

FROM node:16-alpine

WORKDIR /app

# Установка зависимостей Chrome для Puppeteer
RUN apk add --no-cache \
        udev \
        ttf-freefont \
        chromium \
        harfbuzz \
        nss \
        freetype \
        freetype-dev \
        zlib \
        dbus \
        xvfb

# Копирование зависимостей Chrome из образа builder
COPY --from=builder /usr/bin/chromium-browser /usr/bin/chromium-browser
COPY --from=builder /usr/lib/libstdc++.so.6 /usr/lib/libstdc++.so.6

# Установка зависимостей приложения
COPY package.json package-lock.json ./
RUN npm install --production

# Копирование остальных файлов приложения
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]