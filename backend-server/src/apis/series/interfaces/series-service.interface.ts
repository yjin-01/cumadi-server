import { CreateSeriesInput } from '../dto/create-series.input';
import { UpdateSeriesInput } from '../dto/update-series.input';

export interface ISeriesServiceFindOne {
  seriesId: string;
}

export interface ISeriesServiceFindByUser {
  user: string;
}

export interface ISeriesServiceCreate {
  createSeriesInput: CreateSeriesInput;
  user: string;
}

export interface ISeriesServiceUpdate {
  updateSeriesInput: UpdateSeriesInput;
  seriesId: string;
}

export interface ISeriesServiceDelete {
  seriesId: string;
}
