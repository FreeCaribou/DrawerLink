import { IsOptional, IsString } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateDrawerDto {
  @IsString()
  readonly label: string;
  @IsOptional()
  @IsString()
  readonly description: string;
  user: User;
}