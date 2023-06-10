import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HDBK_CACHE_KEY, HdbkService } from './hdbk.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/hdbk')
@UseInterceptors(CacheInterceptor)
export class HdbkController {
  constructor(private readonly hdbkService: HdbkService) {}

  @Post('accessories')
  @UseGuards(JwtAuthGuard)
  createAccessorie(@Body() input: any) {
    return this.hdbkService.createAccessorie(input);
  }
  @Delete('accessories/:id')
  @UseGuards(JwtAuthGuard)
  deleteAccessorie(@Param('id') id: string) {
    return this.hdbkService.deleteAccessorie(Number(id));
  }
  @Post('colors')
  @UseGuards(JwtAuthGuard)
  createColor(@Body() input: any) {
    return this.hdbkService.createColor(input);
  }
  @Delete('colors/:id')
  @UseGuards(JwtAuthGuard)
  deleteColor(@Param('id') id: string) {
    return this.hdbkService.deleteColor(Number(id));
  }
  @Post('facades')
  @UseGuards(JwtAuthGuard)
  createFacade(@Body() input: any) {
    return this.hdbkService.createFacade(input);
  }
  @Delete('facades/:id')
  @UseGuards(JwtAuthGuard)
  deleteFacade(@Param('id') id: string) {
    return this.hdbkService.deleteFacade(Number(id));
  }
  @Post('glossiness')
  @UseGuards(JwtAuthGuard)
  createGlossiness(@Body() input: any) {
    return this.hdbkService.createGlossiness(input);
  }
  @Delete('glossiness/:id')
  @UseGuards(JwtAuthGuard)
  deleteGlossiness(@Param('id') id: string) {
    return this.hdbkService.deleteGlossiness(Number(id));
  }
  @Post('materials')
  @UseGuards(JwtAuthGuard)
  createMaterial(@Body() input: any) {
    return this.hdbkService.createMaterial(input);
  }
  @Delete('materials/:id')
  @UseGuards(JwtAuthGuard)
  deleteMaterial(@Param('id') id: string) {
    return this.hdbkService.deleteMaterial(Number(id));
  }
  @Post('models')
  @UseGuards(JwtAuthGuard)
  createModel(@Body() input: any) {
    return this.hdbkService.createModel(input);
  }
  @Delete('models/:id')
  @UseGuards(JwtAuthGuard)
  deleteModel(@Param('id') id: string) {
    return this.hdbkService.deleteModel(Number(id));
  }
  @Post('patinas')
  @UseGuards(JwtAuthGuard)
  createPatina(@Body() input: any) {
    return this.hdbkService.createPatina(input);
  }
  @Delete('patinas/:id')
  @UseGuards(JwtAuthGuard)
  deletePatina(@Param('id') id: string) {
    return this.hdbkService.deletePatina(Number(id));
  }

  @Get('get-all')
  @CacheKey(HDBK_CACHE_KEY)
  @CacheTTL(0)
  getAll() {
    return this.hdbkService.getAll();
  }
}
