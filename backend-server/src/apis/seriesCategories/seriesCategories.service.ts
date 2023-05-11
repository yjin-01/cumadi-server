import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeriesCategory } from './entities/seriesCategories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesCategoriesService {
  constructor(
    @InjectRepository(SeriesCategory)
    private readonly seriesCategoryRepository: Repository<SeriesCategory>,
  ) {}

  findAll(): Promise<SeriesCategory[]> {
    return this.seriesCategoryRepository.find();
  }

  findOne({ categoryId }): Promise<SeriesCategory> {
    return this.seriesCategoryRepository.findOne({ where: { categoryId } });
  }

  create({ name }): Promise<SeriesCategory> {
    return this.seriesCategoryRepository.save({ name });
  }
}
