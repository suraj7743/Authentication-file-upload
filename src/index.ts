import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import EnvConfiguration from "./config/env.config";
import AppDataSource from "./config/database.config";
import UserService from "./services/admin/AdminAccessService";
import { RegisterRoutes } from "../build/routes";
import middleware from "./middlewares";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: EnvConfiguration.FRONTEND_URL,
  })
);
app.use(express.static("public"));

const intializeMiddleware = async (app: Application): Promise<any> => {
  await middleware(app);
};

intializeMiddleware(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(EnvConfiguration.PORT, () => {
      console.log("Server has started 🚀 ");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

// <li>{ user_type?stuent && Files}</li>
// <li>{user_type?agency && student List</li>}
