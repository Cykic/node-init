/* eslint-disable no-console */
const dotenv = require('dotenv');
const ProcessError = require('./src/error/ProcessError');
const DB = require('./src/db/db');

dotenv.config({ path: './config.env' });

const { DATABASE_URL, PORT } = process.env;
// Exit process for UncaughtException
ProcessError.unCaughtException();
// Connect Mongo DB
DB.connectMongoDB(DATABASE_URL);

const app = require('./app');

const port = PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
// Exit(1)
ProcessError.unHandledRejection(server);
ProcessError.SIGTERM(server);
console.log(process.env.NODE_ENV);
