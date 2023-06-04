import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OrderInterceptor } from './order.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/orders')
export class OrderController {

  @Post('/')
  @UseInterceptors(FilesInterceptor('files'), OrderInterceptor) // Добавьте FormDataInterceptor
  async uploadFiles(@UploadedFiles() files, @Body() formData) {
 

    // Обработка данных FormData и файлов
    // Ваш код для конвертации данных в HTML и отправки на почту

    // Удаление загруженных файлов
    for (const file of files) {
      // Ваш код для удаления файла

    }
  }


}
