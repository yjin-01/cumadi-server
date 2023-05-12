import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSeriesInput } from './create-series.input';

@InputType()
export class UpdateSeriesInput extends PartialType(CreateSeriesInput) {}
