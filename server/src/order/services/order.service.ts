import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { from } from 'rxjs';
import { OrderCreateinput } from '../inputs/order.create.input';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  create(input: OrderCreateinput) {
    return from(this.repository.save(input));
  }
}
