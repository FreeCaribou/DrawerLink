import { IsString, IsEmail } from "class-validator";

export class SignUpUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly pseudo: string;
}