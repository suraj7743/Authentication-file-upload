import "reflect-metadata";
import { DataSource } from "typeorm";
import EnvConfiguration from "./env.config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: EnvConfiguration.DB_HOST,
  port: +EnvConfiguration.DB_PORT,
  username: EnvConfiguration.DB_USERNAME,
  password: EnvConfiguration.DB_PASSWORD,
  database: EnvConfiguration.DB_NAME,
  entities: [process.cwd() + "/src/entities/**/*.ts"],
  synchronize: true,
  migrations: [process.cwd() + "/src/migrations/*.ts"],
  // dropSchema: true,
});

// console.log(AppDataSource);

export default AppDataSource;
