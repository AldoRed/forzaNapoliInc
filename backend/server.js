import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import MongoDbSession from "connect-mongodb-session";
import indexRouter from "./features/user-auth/index.js";
import authRouter from "./features/user-auth/auth.js";
import historyRouter from "./features/order-history/history-router.js";
import ticketRouter from "./features/submit-ticket/ticket-router.js";
import cartRouter from "./features/cart-management/cart-router.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const MongoDbStore = MongoDbSession(session);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const mClient = import("./mongodb/mongodb.js");

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  databaseName: "Data",
  collection: "FNSession",
});

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:5000"
  ]
}));
app.use(morgan("combined"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

app.set("view engine", "ejs");

//Setting up the session

app.use(passport.authenticate("session"));
app.use(passport.session());

//Setting up the router

app.use("/", indexRouter);
app.use("/", authRouter);
app.use(historyRouter);
app.use(ticketRouter);
app.use(cartRouter);

//Setting up the listener

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
