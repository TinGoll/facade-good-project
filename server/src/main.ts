import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { HttpExceptionFilter } from './http-exception-filter/http-exception.filter';

async function bootstrap() {
  const httpsOptions = getHttpsOptions();

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
        // callback(new Error('Blocked by CORS'));
      }
    },
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Observe',
      'Authorization',
      'access-control-allow-origin',
    ],
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port | 3000, () =>
    console.log(`app started on port: ${port}`),
  );
}
bootstrap();

function getHttpsOptions() {
  try {
    return {
      key: fs.readFileSync('/etc/letsencrypt/live/facade-good.ru/privkey.pem'),
      cert: fs.readFileSync(
        '/etc/letsencrypt/live/facade-good.ru/fullchain.pem',
      ),
    };
  } catch (error) {
    console.log('Ошибка получения ключей:', error.message);
  }
}
