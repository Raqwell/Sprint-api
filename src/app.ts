import express from "express";
import jwt from "express-jwt";
import compression from "compression";  // compresses requests
import session from "express-session";
import favicon from "serve-favicon";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongo from "connect-mongo";
import path from "path";
import passport from "passport";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, HASH_SECRET, SESSION_SECRET } from "./util/secrets";
import cors from "cors";
//import * as swaggerUi from "swagger-ui-express";
//import { RegisterRoutes } from "./config/routes"; // tsoa

//import * as swaggerDocument from "../api/dist/swagger.json";

const MongoStore = mongo(session);

// Route handlers
import userRouter from "./routes/user";
import sprintRouter from "./routes/sprint";
import authRouter from "./routes/auth";
import { sprintController } from "./controllers/sprintController";
const router = express.Router();

// API keys and Passport configuration
//import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useFindAndModify: false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log("Successfully connected to database");
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

//Swagger routes
//RegisterRoutes(app); 
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// User routes
app.use("/api/users", userRouter);

// Sprint routes.
app.use("/api/sprints", sprintRouter);

// Authentication routes.

app.use("/api/auth", authRouter);


// Error handlers
// [SH] Catch unauthorised errors
app.use(function (err: any, req: any, res: any, next: any) {
    if (err.name === "UnauthorizedError") {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });
  
  // development error handler
  // will print stacktrace
  if (app.get("env") === "development") {
      app.use(function(err: any, req: any, res: any, next: any) {
          res.status(err.status || 500);
          res.render("error", {
              message: err.message,
              error: err
          });
      });
  }
  
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err: any, req: any, res: any, next: any) {
      res.status(err.status || 500);
      res.render("error", {
          message: err.message,
          error: {}
      });
  });


export default app;
