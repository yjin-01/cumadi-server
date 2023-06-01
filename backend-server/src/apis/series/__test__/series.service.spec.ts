import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from '../series.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { Series } from '../entities/series.entity';
import { SeriesCategoriesService } from 'src/apis/seriesCategories/seriesCategories.service';
import { SeriesCategory } from 'src/apis/seriesCategories/entities/seriesCategories.entity';
import { PostsService } from 'src/apis/posts/posts.service';
import {
  Mock_Series_Category,
  Mock_User,
  SeriesMockRepository,
} from './series.mocking';
import { CreateSeriesInput } from '../dto/create-series.input';
import { UpdateSeriesInput } from '../dto/update-series.input';

class CategoryMockRepository {
  categoryDB = [
    { categoryId: '33143ac1-a295-45df-9c14-026cf392e245', name: '개발' },
  ];

  findOne({ where }) {
    const category = this.categoryDB.filter((el) => {
      return el.categoryId === where.categoryId;
    });

    return category.length === 0 ? undefined : this.categoryDB[0];
  }
}

class PostMockRepository {
  postDB = [
    {
      postId: '1d01042d-7a20-4469-ab71-e532eea30538',
      title: '포스트1',
      image: '포스트이미지1',
      description: '포스트1설명',
      content: '포스트1내용',
    },
  ];
}

class PaymentDetailMockRepository {
  paymentDetailDB = [];
}

describe('seriesService', () => {
  let seriesService: SeriesService;

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
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            updateSeries: jest.fn(),
            findBySeries: jest.fn(() => {
              const post = [];
              return post;
            }),
          },
        },
      ],
    }).compile();

    seriesService = seriesModule.get<SeriesService>(SeriesService);
  });

  describe('create', () => {
    it('시리즈 생성시 포스트를 선택했는지 검증', async () => {
      const createSeriesInput: CreateSeriesInput = {
        title: '시리즈',
        introduction: '시리즈소개',
        image: '이미지',
        price: 1000,
        paid: true,
        posts: [],
        categoryId: '33143ac1-a295-45df-9c14-026cf392e245',
      };

      try {
        await seriesService.create({
          createSeriesInput,
          user: Mock_User.userId,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('올바른 카테코리를 선택했는지 검증', async () => {
      const createSeriesInput: CreateSeriesInput = {
        title: '시리즈',
        introduction: '시리즈소개',
        image: '이미지',
        price: 1000,
        paid: true,
        posts: ['18d4cddf-acab-4b50-a831-44272da4185a'],
        categoryId: '1234',
      };

      try {
        await seriesService.create({
          createSeriesInput,
          user: Mock_User.userId,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });

    it('시리즈 저장', async () => {
      const createSeriesInput: CreateSeriesInput = {
        title: '시리즈',
        introduction: '시리즈소개',
        image: '이미지',
        price: 1000,
        paid: true,
        posts: ['18d4cddf-acab-4b50-a831-44272da4185a'],
        categoryId: '33143ac1-a295-45df-9c14-026cf392e245',
      };

      const newSeries = {
        seriesId: '1234',
        title: '시리즈',
        introduction: '시리즈소개',
        image: '이미지',
        price: 1000,
        paid: true,
        category: Mock_Series_Category,
        user: { userId: '66b02ed8-a171-490a-9d03-6a5d1cc579cc' },
      };

      const result = await seriesService.create({
        createSeriesInput,
        user: Mock_User.userId,
      });

      expect(result).toStrictEqual(newSeries);
    });
  });

  describe('update', () => {
    it('시리즈 수정', async () => {
      const updateSeriesInput: UpdateSeriesInput = {
        title: '시리즈 수정',
        posts: [],
      };

      const updateSeries = {
        seriesId: '1',
        title: '시리즈 수정',
        introduction: '시리즈1소개',
        image: '이미지1',
        price: 1000,
        paid: true,
        category: Mock_Series_Category,
        user: { userId: '66b02ed8-a171-490a-9d03-6a5d1cc579cc' },
      };

      const result = await seriesService.update({
        updateSeriesInput,
        seriesId: '1',
      });
      expect(result).toStrictEqual(updateSeries);
    });
  });
  // describe('delete', () => {
  //   it('delete', () => {

  //   });
  // });
});
