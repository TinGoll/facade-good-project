import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/facade-good.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/facade-good.ru/fullchain.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  app.enableCors({
    origin: (origin, callback) => {
      if (origin) {
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        callback(null, true);
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, access-control-allow-origin',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  await app.listen(port | 3000, () =>
    console.log(`app started on port: ${port}`),
  );
}
bootstrap();
