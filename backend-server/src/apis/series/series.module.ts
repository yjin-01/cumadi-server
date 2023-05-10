import { Module } from '@nestjs/common';
import { SeriesResolver } from './series.resolver';

@Module({
  imports: [],
  providers: [SeriesResolver],
})
export class SeriesModule {}
