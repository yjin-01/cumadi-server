import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Series } from '../series/entities/series.entity';
import { SeriesService } from '../series/series.service';
import {
  IShoppingCartServiceDelete,
  IShoppingCartServiceFindAll,
  IShoppingCartServiceInsert,
} from './interfaces/shoppingCart-service.interface';

@Injectable()
export class shoppingCartService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly seriesService: SeriesService,
  ) {}

  async findAll({ user }: IShoppingCartServiceFindAll): Promise<Series[]> {
    const seriesList: [string] = await this.cacheManager.get(
      `cart:${user.userId}`,
    );

    if (!seriesList) {
      return [];
    }

    return this.seriesService.findAllByCart({ seriesList });
  }

  async insert({
    seriesId,
    user,
  }: IShoppingCartServiceInsert): Promise<Series> {
    let cartValue: [string?] = await this.cacheManager.get(
      `cart:${user.userId}`,
    );

    if (!cartValue) {
      cartValue = [];
    }

    cartValue.push(seriesId);

    await this.cacheManager.set(`cart:${user.userId}`, cartValue, { ttl: 0 });

    const series = await this.seriesService.findOne({ seriesId });

    return series;
  }

  async delete({
    seriesId,
    user,
  }: IShoppingCartServiceDelete): Promise<boolean> {
    const cartVal: [string] = await this.cacheManager.get(
      `cart:${user.userId}`,
    );

    if (!cartVal) {
      return false;
    }

    const seriesIndex = cartVal.indexOf(seriesId);
    if (seriesIndex > -1) {
      cartVal.splice(seriesIndex, 1);
      await this.cacheManager.set(`cart:${user.userId}`, cartVal, { ttl: 0 });
    }
    return true;
  }
}
