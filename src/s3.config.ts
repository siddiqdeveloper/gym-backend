import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.awsS3Bucket;
  s3 = new AWS.S3({
    accessKeyId: process.env.awsS3Key,
    secretAccessKey: process.env.awsS3Secret,
    region: 'ap-south-1',
  });

  async getFile(key) {
    return await this.s3
      .getObject(
        {
          Bucket: this.AWS_S3_BUCKET,
          Key: '',
        },
        function (err, data) {
          console.log('D: ', data);
          return data;
        },
      )
      .createReadStream();
  }

  async uploadFile(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log(e);
    }
  }
}
