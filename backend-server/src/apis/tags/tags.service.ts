import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { In, InsertResult, Repository } from 'typeorm';
import {
  ITagsServiceBulkInsert,
  ITagsServiceFindByNames,
} from './interfaces/tag-service.interface';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async findByNames({
    tagNames, //
  }: ITagsServiceFindByNames): Promise<Tag[]> {
    return await this.tagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: ITagsServiceBulkInsert): Promise<InsertResult> {
    return this.tagsRepository.insert(names);
  }

  async tagGenerator({ tags }) {
    const tagNames = tags ? tags.map((el) => el.replace('#', '')) : [];
    const prevTags = await this.findByNames({ tagNames });

    const tagsBucket = [];
    tagNames.forEach((el) => {
      const isExist = prevTags.find((prev) => el === prev.name);
      if (!isExist) tagsBucket.push({ name: el });
    });

    const newTags = await this.bulkInsert({ names: tagsBucket });
    const completeTags = [...prevTags, ...newTags.identifiers];

    return completeTags;
  }
}
