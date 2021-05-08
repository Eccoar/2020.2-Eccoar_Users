import express from 'express';
import cors from 'cors';
import routers from './routes';
import handleErrors from '@utils/ErrorHandler';
import morgan from 'morgan';

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());
app.use(routers);
app.use(handleErrors);
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
