import { Module } from '@nestjs/common';
import { HdbkController } from './hdbk.controller';
import { HdbkService } from './hdbk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accessorie } from './entities/accessorie.entity';
import { Color } from './entities/color.entity';
import { Facade } from './entities/facade.entity';
import { Glossiness } from './entities/glossiness.entity';
import { Material } from './entities/material.entity';
import { Model } from './entities/model.entity';
import { Patina } from './entities/patina.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accessorie,
      Color,
      Facade,
      Glossiness,
      Material,
      Model,
      Patina,
    ]),
  ],
  controllers: [HdbkController],
  providers: [HdbkService],
})
export class HdbkModule {}
