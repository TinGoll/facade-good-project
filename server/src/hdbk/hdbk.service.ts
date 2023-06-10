import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accessorie } from './entities/accessorie.entity';
import { Color } from './entities/color.entity';
import { Facade } from './entities/facade.entity';
import { Glossiness } from './entities/glossiness.entity';
import { Material } from './entities/material.entity';
import { Model } from './entities/model.entity';
import { Patina } from './entities/patina.entity';
import { Observable, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import HDBK from './hdbk.types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export const HDBK_CACHE_KEY = 'hdbk';

@Injectable()
export class HdbkService {
  constructor(
    @InjectRepository(Accessorie)
    private readonly accessorieRepsitory: Repository<Accessorie>,

    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,

    @InjectRepository(Facade)
    private readonly facadeRepository: Repository<Facade>,

    @InjectRepository(Glossiness)
    private readonly glossinessRepository: Repository<Glossiness>,

    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,

    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,

    @InjectRepository(Patina)
    private readonly patinaRepository: Repository<Patina>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  createAccessorie(input: any): Observable<any> {
    return from(
      this.accessorieRepsitory
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.accessorieRepsitory.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }

  deleteAccessorie(id: number): Observable<number> {
    return from(this.accessorieRepsitory.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  createColor(input: any): Observable<any> {
    return from(
      this.colorRepository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.colorRepository.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }
  deleteColor(id: number): Observable<number> {
    return from(this.colorRepository.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  createFacade(input: any): Observable<any> {
    return from(
      this.facadeRepository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.facadeRepository.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }
  deleteFacade(id: number): Observable<number> {
    return from(this.facadeRepository.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  createGlossiness(input: any): Observable<any> {
    return from(
      this.glossinessRepository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.glossinessRepository.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }
  deleteGlossiness(id: number): Observable<number> {
    return from(this.glossinessRepository.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  createMaterial(input: any): Observable<any> {
    return from(
      this.materialRepository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.materialRepository.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }
  deleteMaterial(id: number): Observable<number> {
    return from(this.materialRepository.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  createModel(input: any): Observable<any> {
    return from(
      this.modelRepository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.modelRepository.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }
  deleteModel(id: number): Observable<number> {
    return from(this.modelRepository.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  createPatina(input: any): Observable<any> {
    return from(
      this.patinaRepository
        .createQueryBuilder()
        .where('LOWER(name) = LOWER(:name)', { name: input.name })
        .getOne(),
    ).pipe(
      switchMap((candidate) => {
        if (candidate) {
          throw new HttpException(
            `Элемент с таким названием уже существует`,
            HttpStatus.CONFLICT,
          );
        }
        return from(this.patinaRepository.save(input)).pipe(
          tap(() => this.removeCache()),
        );
      }),
    );
  }
  deletePatina(id: number): Observable<number> {
    return from(this.patinaRepository.delete(id)).pipe(
      map(() => id),
      tap(() => this.removeCache()),
    );
  }

  getAll(): Observable<HDBK.Data> {
    const $accessories = from(this.accessorieRepsitory.find());
    const $colors = from(this.colorRepository.find());
    const $facades = from(this.facadeRepository.find());
    const $glossiness = from(this.glossinessRepository.find());
    const $materials = from(this.materialRepository.find());
    const $models = from(this.modelRepository.find());
    const $patinas = from(this.patinaRepository.find());

    return forkJoin([
      $accessories,
      $colors,
      $facades,
      $glossiness,
      $materials,
      $models,
      $patinas,
    ]).pipe(
      map(
        ([
          accessories,
          colors,
          facades,
          glossiness,
          materials,
          models,
          patinas,
        ]) => ({
          accessories,
          colors,
          facades,
          glossiness,
          materials,
          models,
          patinas,
        }),
      ),
    );
  }

  private removeCache() {
    this.cacheManager.del(HDBK_CACHE_KEY);
  }
}
