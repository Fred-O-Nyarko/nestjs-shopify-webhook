import { Prisma } from '@prisma/client';
import { IsInt, IsJSON, IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class CreateDumpDto {
  @IsJSON()
  @IsNotEmpty()
  dump: Prisma.JsonObject;

  @IsInt()
  @IsNotEmpty()
  id: number;
}
