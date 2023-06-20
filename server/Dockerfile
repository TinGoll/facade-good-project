FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm rebuild --verbose sharp
RUN npm run build

FROM buildkite/ffmpeg:4
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]