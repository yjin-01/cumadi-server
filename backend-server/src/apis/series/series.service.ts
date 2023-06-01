import {
  Inject,
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { In, Repository } from 'typeorm';
import { SeriesCategoriesService } from '../seriesCategories/seriesCategories.service';
import {
  ISeriesServiceCreate,
  ISeriesServiceDelete,
  ISeriesServiceFindByCategory,
  ISeriesServiceFindByUser,
  ISeriesServiceFindOne,
  ISeriesServiceUpdate,
  ISeriesServicefindAllByCart,
} from './interfaces/series-service.interface';
import { PostsService } from '../posts/posts.service';
import { IFetchSeriesReturn } from './interfaces/series-return.type';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,

    private readonly seriesCategoriesService: SeriesCategoriesService,

    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  findAll(): Promise<Series[]> {
    return this.seriesRepository.find({
      relations: ['category', 'user'],
      order: { createdAt: 'desc' },
    });
  }

  async findBest(): Promise<Series[]> {
    const result = await this.seriesRepository
      .createQueryBuilder('series')
      .select()
      .leftJoinAndSelect('series.category', 'category')
      .leftJoinAndSelect('series.user', 'user')
      .leftJoin('series.payments', 'payments')
      .groupBy('payments.series')
      .addGroupBy('series.seriesId')
      .orderBy('Count(payments.series)', 'DESC')
      .addOrderBy('series.createdAt', 'DESC')
      .getMany();

    return result;
  }

  async findOne({
    seriesId,
  }: ISeriesServiceFindOne): Promise<IFetchSeriesReturn> {
    const series = await this.seriesRepository.findOne({
      where: { seriesId },
      relations: ['category', 'user'],
    });

    const post = await this.postsService.findBySeries({ seriesId });

    if (post.length !== 0) {
      series['post'] = [...post];
      return series;
    }

    return series;
  }

  findAllByCart({
    seriesList,
  }: ISeriesServicefindAllByCart): Promise<Series[]> {
    return this.seriesRepository.find({
      where: { seriesId: In(seriesList) },
      relations: ['category', 'user'],
    });
  }

  findFreeSeries({ categoryId }): Promise<Series[]> {
    return this.seriesRepository.find({
      where: { paid: false, category: { categoryId } },
      relations: ['category', 'user'],
    });
  }

  findByUser({ user }: ISeriesServiceFindByUser): Promise<Series[]> {
    return this.seriesRepository.find({
      where: { user: { userId: user } },
      relations: ['category', 'user'],
    });
  }

  findByCategory({
    categoryId,
  }: ISeriesServiceFindByCategory): Promise<Series[]> {
    return this.seriesRepository.find({
      where: { category: { categoryId } },
      relations: ['category', 'user'],
    });
  }

  async create({
    createSeriesInput,
    user,
  }: ISeriesServiceCreate): Promise<Series> {
    const { categoryId, posts, ...rest } = createSeriesInput;
    const category = await this.seriesCategoriesService.findOne({ categoryId });

    if (!category)
      throw new UnprocessableEntityException("Category dosen't exist");

    if (posts.length == 0)
      throw new UnprocessableEntityException("Post dosen't exist");

    const series = await this.seriesRepository.save({
      ...rest,
      category: category,
      user: { userId: user },
    });

    const postArr = [];
    if (posts) {
      posts.forEach((el) => {
        postArr.push({ postId: el, series: series.seriesId });
      });
    }

    await this.postsService.updateSeries({
      postArr,
    });

    return series;
  }

  async update({
    updateSeriesInput,
    seriesId,
  }: ISeriesServiceUpdate): Promise<Series> {
    const { categoryId, posts, ...rest } = updateSeriesInput;

    const series = await this.findOne({ seriesId });

    const category = await this.seriesCategoriesService.findOne({ categoryId });

    const updateSeries = await this.seriesRepository.save({
      ...series,
      ...rest,
      category: category,
    });

    const postArr = [];
    if (posts) {
      posts.forEach((el) => {
        postArr.push({ postId: el, series: series.seriesId });
      });
    }

    await this.postsService.updateSeries({
      postArr,
    });

    return updateSeries;
  }

  async delete({ seriesId }: ISeriesServiceDelete) {
    const result = await this.seriesRepository.softDelete({ seriesId });
    return result.affected ? true : false;
  }
}
