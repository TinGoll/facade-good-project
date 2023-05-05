FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run clean
RUN npm rebuild
RUN npm run build

FROM nginx:stable-alpine AS deploy


WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/public .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]