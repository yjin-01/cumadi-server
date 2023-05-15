export interface ITagsServiceFindByNames {
  tagNames: string[];
}

export interface ITagsServiceBulkInsert {
  names: { name: string }[];
}
