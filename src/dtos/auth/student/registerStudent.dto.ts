import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterStudentDTO {
  @IsNotEmpty({ message: "Email field should not be empty" })
  @IsEmail({}, { message: "Should be valid email address" })
  email: string;

  @IsStrongPassword({}, { message: "Password should be strong" })
  @IsNotEmpty({ message: "Password field should not be empty" })
  password: string;

  @IsString()
  @MaxLength(20)
  studentFirstName: string;

  @IsOptional()
  @MaxLength(20)
  studentMiddleName: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  studentLastName: string;

  @IsString()
  studentAgentDetailsId: string;

  @IsString()
  @MinLength(5)
  @MaxLength(200)
  location: string;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  contactNumber: string;
}
