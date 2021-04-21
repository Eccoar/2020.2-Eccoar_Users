import { Router, Request, Response } from 'express';

import ControllerUser from '@controllers/ControllerUser';

const routers = Router();
const controller = new ControllerUser();

routers.get('/api/ping', (req: Request, resp: Response) => {
	controller.pong(req, resp);
});

routers.post('/api/users', async (req: Request, res: Response) => {
	controller.createUser(req, res);
});

export default routers;
