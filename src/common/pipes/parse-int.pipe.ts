import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

//Create Custom ParseIntPipe (already exist by for Learning purposes)

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10); //parse the value to integer
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer"`,
      );
    }
    return val;
  }
}
