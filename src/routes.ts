import { Router, Request, Response } from 'express';

import ControllerUser from '@controllers/ControllerUser';

const routers = Router();
const controller = new ControllerUser();

routers.get('/api/ping', (req: Request, resp: Response) => {
	controller.pong(req, resp);
});

export default routers;
