import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private readonly statisticsRepository: Repository<Statistics>,
  ) {}

  // 조회수 증가
  async updateView({ postId }): Promise<boolean> {
    const curTime = new Date();
    const utc = curTime.getTime() + curTime.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const nowDate = new Date(new Date(utc + KR_TIME_DIFF).setHours(0, 0, 0, 0));

    let todayViews = await this.statisticsRepository.findOne({
      where: { date: nowDate, post: { postId } },
      relations: ['post'],
    });

    if (!todayViews) {
      todayViews = await this.statisticsRepository.save({
        post: postId,
        date: nowDate,
        view: 0,
      });
    }

    await this.statisticsRepository.update(todayViews.statisticId, {
      view: ++todayViews.view,
    });

    return true;
  }

  // 유저 특정 포스트 통계
  async postStatistics({
    fetchStatisticsInput,
    userId,
  }): Promise<Statistics[]> {
    const { startDate, endDate, postId } = fetchStatisticsInput;

    const result = await this.statisticsRepository.find({
      where: {
        post: { postId },
        date: Between(new Date(startDate), new Date(endDate)),
      },
      order: { date: 'ASC' },
      relations: ['post', 'post.user'],
    });

    const check = result.find((el) => el.post?.user.userId !== userId);
    if (check) throw new UnauthorizedException();

    return result;
  }

  // 유저 전체 포스트 통계
  async postsStatistics({
    startDate, //
    endDate,
    userId,
  }): Promise<Statistics[]> {
    const result = await this.statisticsRepository.find({
      where: {
        date: Between(new Date(startDate), new Date(endDate)),
      },
      order: { date: 'ASC' },
      relations: ['post', 'post.user'],
    });

    const userFiltered = result.filter((el) => el.post?.user.userId === userId);

    return userFiltered;
  }
}
