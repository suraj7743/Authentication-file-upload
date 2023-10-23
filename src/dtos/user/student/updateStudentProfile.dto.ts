import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";
import { RegisterStudentDTO } from "../../auth/student/registerStudent.dto";

export class UpdateStudentDTO implements RegisterStudentDTO {
  @IsOptional()
  @IsEmail({}, { message: "Should be valid email address" })
  email: string;

  @IsStrongPassword({}, { message: "Password should be strong" })
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  studentFirstName: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  studentMiddleName: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  studentLastName: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  location: string;

  @IsString()
  @IsOptional()
  studentAgentDetailsId: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(15)
  contactNumber: string;
}
