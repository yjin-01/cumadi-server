import { Module } from '@nestjs/common';
import { Statistics } from './entities/statistics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { StatisticsResolver } from './statistics.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Statistics, //
    ]),
  ],
  providers: [
    StatisticsResolver, //
    StatisticsService,
  ],
  exports: [
    StatisticsService, //
  ],
})
export class StatisticModule {}
