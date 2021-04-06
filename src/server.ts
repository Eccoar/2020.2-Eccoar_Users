import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import routers from './routes';
import { initializeDB } from './db';

const app = express();
const PORT = process.env.APP_PORT || 5002;

initializeDB();

app.use(express.json());
app.use(cors());
app.use(routers);
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
