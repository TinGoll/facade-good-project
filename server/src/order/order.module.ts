import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderDataService } from './services/order.data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderData } from './entities/order.data.entity';
import { PdfCreator } from './pdf.creator';

@Module({
  imports: [TypeOrmModule.forFeature([OrderData])],
  controllers: [OrderController],
  providers: [OrderDataService, PdfCreator],
})
export class OrderModule {}
