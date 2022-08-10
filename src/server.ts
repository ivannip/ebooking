import express from "express";
import path  from "path";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import backOfficerRoutes from "./routes/backOfficeRoutes";
import centerRoutes from "./routes/centerRoutes";
import publicRoutes from "./routes/publicRoutes";
import authRoutes from "./routes/authRoutes";
//import * as MySQLConnector from "./util/mysql.connect";
import * as MongoDBConnector from "./util/mongodb.connect";
import {logger} from "./util/logger";

const app = express();

if (process.env.NODE_ENV !== "production") {   
    require("dotenv").config();
}
const PORT = process.env.PORT || "3001";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SECRET))

//MySQLConnector.connectDB();
MongoDBConnector.connectDB();

app.use("/center", centerRoutes);

app.use("/public", publicRoutes);

app.use("/office", backOfficerRoutes);

app.use("/auth", authRoutes);

// if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
    });
// }

app.listen(PORT, () => {
    logger.info(`Server started at port ${PORT}`);
})


