import { Module } from '@nestjs/common';
import { shoppingCartResolver } from './shoppingCart.resolver';
import { shoppingCartService } from './shoppingCart.service';
import { SeriesModule } from '../series/series.module';

@Module({
  imports: [
    SeriesModule, //
  ],
  providers: [
    shoppingCartResolver, //
    shoppingCartService,
  ],
  exports: [shoppingCartService],
})
export class shoppingCartModule {}
