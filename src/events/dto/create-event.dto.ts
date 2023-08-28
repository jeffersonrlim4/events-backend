import { Length, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255)
  name: string;

  @IsString()
  @Length(5, 255)
  description: string;

  @IsString()
  @Length(5, 255)
  when: string;

  @IsString()
  @Length(5, 255)
  address: string;
}
