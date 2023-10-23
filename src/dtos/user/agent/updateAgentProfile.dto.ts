import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";
import { RegisterAgencyDTO } from "../../auth/agency/registerAgency.dto";

export default class UpdateAgentDto implements RegisterAgencyDTO {
  @IsOptional()
  @IsEmail({}, { message: "Should be valid email address" })
  email: string;

  @IsOptional()
  @IsStrongPassword({}, { message: "Password should be strong" })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  agencyName: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  panVatNo: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  agencyOwnerName: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(200)
  location: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  contactNumber: string;
}
