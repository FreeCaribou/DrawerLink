import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateLinkDto {
  @IsString()
  readonly url: string;
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly description: string;
  @IsArray()
  readonly tags: string[];
  @IsString()
  readonly drawerUuid: string;
}