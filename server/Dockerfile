FROM node:16-alpine AS builder
USER node
WORKDIR /app
COPY /*.json ./
COPY . .
RUN npm install
RUN npm rebuild --verbose sharp
RUN mkdir -p /app/assets/images \
    && chown -R node:node /app/assets/images \
    && chmod -R 755 /app/assets/images
RUN npm run build

FROM node:16-alpine
USER node
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]