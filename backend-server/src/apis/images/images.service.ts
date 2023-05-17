import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as crypto from 'crypto';

@Injectable()
export class ImagesService {
  async uploadFile({
    file, //
  }) {
    const uniqueId = crypto.randomUUID();

    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: 'ap-northeast-2',
    });

    const { createReadStream, filename } = file;
    const fileStream = createReadStream();

    const params = {
      Bucket: 'mcb-image-bucket',
      Key: `image/${uniqueId}-${filename}`,
      Body: fileStream,
      ContentType: 'image/png',
    };

    const response = await s3.upload(params).promise();

    return response.Location;
  }
}
