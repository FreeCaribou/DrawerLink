import { IsOptional, IsString } from "class-validator";
import { Drawer } from "../../drawers/entities/drawer.entity";

export class CreateLinkDto {
  @IsString()
  readonly url: string;
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly description: string;
  @IsString()
  readonly drawerUuid: Drawer;
}