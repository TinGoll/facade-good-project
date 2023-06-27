import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderDataService } from './services/order.data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderData } from './entities/order.data.entity';
import { Order } from './entities/order.entity';
import { PdfCreator } from './pdf.creator';
import { OrderService } from './services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderData, Order])],
  controllers: [OrderController],
  providers: [OrderDataService, PdfCreator, OrderService],
})
export class OrderModule {}
