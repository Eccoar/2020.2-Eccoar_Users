import "reflect-metadata";
import * as express from 'express';
import routers from './routes';
import { initializeDB } from "./db";

const app = express();
const PORT = process.env.APP_PORT || 5000;

initializeDB();

app.use(express.json());
app.use(routers);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});

