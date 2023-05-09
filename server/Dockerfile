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
EXPOSE 3000

# добавлены строки для сохранения изображений в папку assets
RUN mkdir -p /app/assets/images
RUN chown -R node:node /app/assets

USER node

CMD ["npm", "run", "start:prod"]