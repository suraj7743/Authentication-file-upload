import { Application, json, urlencoded } from "express";
import { RegisterRoutes } from "../../build/routes";
import EnvConfiguration, { Environment } from "../config/env.config";
import errorHandler from "./errorhandler.middleware";
import bodyParser from "body-parser";

const middleware = async (app: Application) => {
  app.use(bodyParser.json());
  // Use body parser to read sent json payloads
  app.use(
    urlencoded({
      extended: true,
    })
  );

  RegisterRoutes(app);

  if (EnvConfiguration.NODE_ENV === Environment.DEVELOPMENT) {
    // Swagger config.
    const swaggerUi = require("swagger-ui-express");
    const swaggerDocument = require("../../build/swagger.json");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  app.use(errorHandler);
};

export default middleware;
