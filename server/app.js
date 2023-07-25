import express from "express";
const members = require("./routes/members");
const events = require("./routes/events");
const sendMail = require("./routes/sendMail");
const addMemberToEvent = require("./routes/addMemberToEvent");
const attendance = require("./routes/attendance");

import apiRouter from "./api";
import config from "./utils/config";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware";

const apiRoot = "/api";

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	// app.use(httpsOnly());
}

app.use(apiRoot, apiRouter);
app.use("/health", (_, res) => res.sendStatus(200));
app.use("/api/members", members);
app.use("/api/events", events);
app.use("/api/add-member-to-event", addMemberToEvent);
app.use("/api/attendance", attendance);
app.use("/api/sendmail", sendMail);
app.use(clientRouter(apiRoot));

app.use(logErrors());

export default app;
