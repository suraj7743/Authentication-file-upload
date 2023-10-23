import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class UserDTO {
  @IsString()
  @MinLength(3)
  firstName: string;

  @IsString()
  @MinLength(3)
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
