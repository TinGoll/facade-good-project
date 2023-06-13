import {
  Body,
  Controller,
  HttpException,
  Param,
  Post,
  Get,
  UploadedFiles,
  UseInterceptors,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateGalleryItemInput } from '../inputs/create.item.input';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GalleryService } from '../services/gallery.service';
import { SharpPipe } from '../pipes/sharp.pipe';
import { UpdateGalleryItemInput } from '../inputs/update.item.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('items')
  find(@Query('tag') tag?: string, @Query('category') category?: string) {
    return this.galleryService.find({
      tag,
      category,
    });
  }

  @Get('items/:id')
  findToId(@Param('id') id: string) {
    return this.galleryService.findOne(Number(id));
  }

  @Delete('items/:id')
  // @UseGuards(JwtAuthGuard)
  removeItem(@Param('id') id: string) {
    return this.galleryService.removeItem(Number(id));
  }

  @Delete('images/:id')
  // @UseGuards(JwtAuthGuard)
  removeImage(@Param('id') id: string) {
    return this.galleryService.removeImage(Number(id));
  }

  @Post('items')
  // @UseGuards(JwtAuthGuard)
  create(@Body() input: CreateGalleryItemInput) {
    return this.galleryService.create(input);
  }

  @Put('items')
  // @UseGuards(JwtAuthGuard)
  update(@Body() item: UpdateGalleryItemInput) {
    return this.galleryService.update(item);
  }

  @Post('images/:itemId')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  addImage(
    @Param('itemId') id: string,
    @UploadedFiles(SharpPipe) files: Array<Express.Multer.File>,
    @Body('index') index: string,
  ) {
    try {
      return this.galleryService.addImage(
        Number(id),
        (files || []).map((f) => ({
          ...f,
          index: Boolean(index) ? Number(index) : 0,
        })),
      );
    } catch (error) {
      throw new HttpException(
        'addImage:' + (<Error>error)?.message || 'Ошибка загрузки.',
        500,
      );
    }
  }
}
