import { IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  readonly uuid: number;
  @IsOptional()
  readonly pseudo: string;
  @IsOptional()
  readonly email: string;
}