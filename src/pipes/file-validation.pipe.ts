import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ParseFilePipeBuilder } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly fileValidationPipe;

  constructor() {
    this.fileValidationPipe = new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /(jpg|jpeg|png|gif)$/, 
      })
      .addMaxSizeValidator({
        maxSize: 5 * 1024 * 1024, 
      })
      .build({
        exceptionFactory: (errors) => new BadRequestException(errors),
      });
  }

  transform(file: Express.Multer.File): Express.Multer.File {
    return this.fileValidationPipe.transform(file);
  }
}
