import { Test, TestingModule } from '@nestjs/testing';
import { SeriesService } from '../series.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { Series } from '../entities/series.entity';
import { SeriesCategoriesService } from 'src/apis/seriesCategories/seriesCategories.service';
import { SeriesCategory } from 'src/apis/seriesCategories/entities/seriesCategories.entity';
import { PostsService } from 'src/apis/posts/posts.service';
import {
  Mock_Post,
  Mock_Series,
  Mock_Series_Category,
  Mock_Series_Repository,
  Mock_User,
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

describe('seriesService', () => {
  let seriesService: SeriesService;
  let postsService: PostsService;

  beforeEach(async () => {
    const seriesModule: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        SeriesCategoriesService,

        {
          provide: getRepositoryToken(Series),
          useValue: Mock_Series_Repository, // Mock 데이터 설정
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
    postsService = seriesModule.get<PostsService>(PostsService);
  });

  describe('시리즈 전체 조회', () => {
    it('findAll', () => {
      const result = seriesService.findAll();

      expect(result).toBe(Mock_Series_Repository.seriesDB);
    });
  });

  describe('시리즈 생성', () => {
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
        seriesId: '1',
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

      const postArr = [
        {
          postId: Mock_Post.postId,
          series: Mock_Series.seriesId,
        },
      ];
      expect(postsService.updateSeries).toBeCalled();

      expect(postsService.updateSeries).toHaveBeenCalledWith({
        postArr,
      });

      expect(result).toStrictEqual(newSeries);
    });
  });

  describe('시리즈 수정', () => {
    it('시리즈 수정', async () => {
      const updateSeriesInput: UpdateSeriesInput = {
        title: '시리즈 수정',
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
      expect(postsService.updateSeries).toBeCalled();
      expect(postsService.updateSeries).toHaveBeenCalledWith({
        postArr: [],
      });

      expect(result).toStrictEqual(updateSeries);
    });
  });

  describe('시리즈 삭제', () => {
    it('delete', async () => {
      const result = await seriesService.delete({
        seriesId: '1',
      });

      expect(result).toBe(true);

      expect(Mock_Series_Repository.softDelete).toBeCalledWith({
        seriesId: Mock_Series.seriesId,
      });
    });
  });
});
