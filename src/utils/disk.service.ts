import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as Path from 'path';
import * as cfsign from 'aws-cloudfront-sign';
import { customAlphabet } from 'nanoid';
import { DateTime } from 'luxon';

const nanoid = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  16,
);

@Injectable()
export class DiskService {
  private storage: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.storage = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_DEFAULT_REGION'),
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    const { originalname, mimetype } = file;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.configService.get('AWS_BUCKET'),
      Key: `shots/${nanoid()}${Path.extname(originalname)}`,
      Body: file.buffer,
      ContentType: mimetype,
      ContentDisposition: 'inline',
    };

    try {
      const s3Response = await this.storage.upload(params).promise();
      return s3Response.Key;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  public getFileUrl(reference: string) {
    const signingParams = {
      keypairId: this.configService.get('CLOUDFRONT_KEY_PAIR_ID'),
      privateKeyPath: Path.join(
        __dirname,
        this.configService.get('CLOUDFRONT_PRIVATE_KEY_PATH'),
      ),
      expireTime: DateTime.now().plus({ hours: 24 }),
    };

    return cfsign.getSignedUrl(
      `${this.configService.get('CLOUDFRONT_HOST')}/${reference}`,
      signingParams,
    );
  }
}
