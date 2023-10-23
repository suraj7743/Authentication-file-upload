import bcrypt from "bcryptjs";

class BcryptService {
  async hash(password: string): Promise<any> {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      return new Error("Error in hasing (bcrypt)");
    }
  }

  async compare(password: string, hash: string): Promise<any> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      return new Error("Invalid password ");
    }
  }
}

export default BcryptService;
