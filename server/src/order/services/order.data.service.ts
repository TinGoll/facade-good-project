import { Injectable } from '@nestjs/common';
import { OrderData } from '../entities/order.data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable, from, of, switchMap } from 'rxjs';


@Injectable()
export class OrderDataService {
  constructor(
    @InjectRepository(OrderData)
    private readonly repository: Repository<OrderData>,
  ) {}

  set<Data extends object = object>(
    name: string,
    data: Data,
  ): Observable<OrderData> {
    return this.find_by_name(name).pipe(
      switchMap((candidate) => {
        if (!candidate) {
          const newData = this.repository.create();
          newData.name = name;
          newData.data = data;
          return this.save(newData);
        }
        candidate.data = data;
        return this.save(candidate);
      }),
    );
  }

  get<Data extends object = object>(
    name: string,
    defaultData: Data,
  ): Observable<Data> {
    return this.find_by_name(name).pipe(
      switchMap((entity) => {
        if (entity) {
          return of(entity.data as Data);
        }
        return of(defaultData);
      }),
    );
  }

  private save(entity: OrderData) {
    return from(this.repository.save(entity));
  }

  private find_by_name(name: string) {
    return from(
      this.repository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name })
        .getOne(),
    );
  }
}
