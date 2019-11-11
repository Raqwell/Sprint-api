import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import path from "path";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import cors from "cors";

const MongoStore = mongo(session);

// Controllers (route handlers)
import { apiController }  from "./controllers/apiController";
import { userController } from "./controllers/userController";
import { sprintController } from "./controllers/sprintController";


// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
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


/**
 * API examples routes.
 */
app.get("/api", apiController.getApi);


/**
 * User routes.
 */
app.get("/users", userController.getAllUsers);


/**
 * Sprint routes.
 */
app.get("/sprints", sprintController.getAllSprints);



export default app;
