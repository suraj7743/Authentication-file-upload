import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterAdminDTO {
  @IsNotEmpty({ message: "Email field should not be empty" })
  @IsEmail({}, { message: "Should be valid email address" })
  email: string;

  @IsStrongPassword({}, { message: "Password should be strong" })
  @IsNotEmpty({ message: "Password field should not be empty" })
  password: string;
}
