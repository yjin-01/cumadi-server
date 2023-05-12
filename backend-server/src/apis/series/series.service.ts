import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { Repository } from 'typeorm';
import { SeriesCategoriesService } from '../seriesCategories/seriesCategories.service';
import {
  ISeriesServiceCreate,
  ISeriesServiceDelete,
  ISeriesServiceFindByUser,
  ISeriesServiceFindOne,
  ISeriesServiceUpdate,
} from './interfaces/series-service.interface';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,

    private readonly seriesCategoriesService: SeriesCategoriesService,
  ) {}

  findAll(): Promise<Series[]> {
    return this.seriesRepository.find({
      relations: ['category', 'user'],
    });
  }

  findOne({ seriesId }: ISeriesServiceFindOne): Promise<Series> {
    return this.seriesRepository.findOne({
      where: { seriesId },
      relations: ['category', 'user'],
    });
  }

  findByUser({ user }: ISeriesServiceFindByUser): Promise<Series[]> {
    return this.seriesRepository.find({
      where: { user: { userId: user } },
      relations: ['category', 'user'],
    });
  }

  async create({
    createSeriesInput,
    user,
  }: ISeriesServiceCreate): Promise<Series> {
    const { categoryId, ...rest } = createSeriesInput;
    const category = await this.seriesCategoriesService.findOne({ categoryId });

    return this.seriesRepository.save({
      ...rest,
      category: category,
      user: { userId: user },
    });
  }

  async update({
    updateSeriesInput,
    seriesId,
  }: ISeriesServiceUpdate): Promise<Series> {
    const { categoryId, ...rest } = updateSeriesInput;
    const series = await this.findOne({ seriesId });

    const category = await this.seriesCategoriesService.findOne({ categoryId });

    return this.seriesRepository.save({
      ...series,
      ...rest,
      category: category,
    });
  }

  async delete({ seriesId }: ISeriesServiceDelete) {
    const result = await this.seriesRepository.delete({ seriesId });
    return result.affected ? true : false;
  }
}
