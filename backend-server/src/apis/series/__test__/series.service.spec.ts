import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from '../series.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post, UnprocessableEntityException } from '@nestjs/common';
import { Series } from '../entities/series.entity';
import { PaymentDetailsModule } from 'src/apis/paymentDetails/paymentDetails.module';
import { SeriesModule } from '../series.module';
import { SeriesCategoriesService } from 'src/apis/seriesCategories/seriesCategories.service';
import { SeriesCategory } from 'src/apis/seriesCategories/entities/seriesCategories.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/apis/posts/posts.service';

class SeriesMockRepository {
  seriesDB = [
    {
      title: '시리즈1',
      introduction: '시리즈1소개',
      image: '이미지1',
      price: 1000,
      paid: true,
    },

    {
      title: '시리즈2',
      introduction: '시리즈2소개',
      image: '이미지2',
      price: 2000,
      paid: true,
    },
  ];
}

class CategoryMockRepository {
  categoryDB = [
    { categoryId: '33143ac1-a295-45df-9c14-026cf392e245', name: '카테고리1' },
  ];

  findOne({ categoryId }) {
    const category = this.categoryDB.filter(
      (el) => el.categoryId === categoryId,
    );
    return category;
  }
}

class PostMockRepository {
  postDB = [];
}

class PaymentDetailMockRepository {
  paymentDetailDB = [];
}

describe('seriesService', () => {
  let seriesService: SeriesService;

  // let PostsService: jest.Mocked<PostsService>;

  beforeEach(async () => {
    const seriesModule: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        SeriesCategoriesService,

        {
          provide: getRepositoryToken(Series),
          useClass: SeriesMockRepository, // Mock 데이터 설정
        },
        {
          provide: getRepositoryToken(SeriesCategory),
          useClass: CategoryMockRepository,
        },
        {
          provide: PostsService,
          useValue: { findOne: jest.fn(), find: jest.fn(), save: jest.fn() },
        },
      ],
    }).compile();

    seriesService = seriesModule.get<SeriesService>(SeriesService);
  });

  describe('create', () => {
    it('시리즈 생성시 포스트 지정 검증', async () => {
      const myData = {
        createSeriesInput: {
          title: '시리즈1',
          introduction: '시리즈1소개',
          image: '이미지1',
          price: 1000,
          paid: true,
          posts: [],
          categoryId: '33143ac1-a295-45df-9c14-026cf392e245',
        },

        user: 'userId',
      };

      try {
        await seriesService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
