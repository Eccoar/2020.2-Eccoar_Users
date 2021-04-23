import { Router, Request, Response, NextFunction } from 'express';

import ControllerUser from '@controllers/ControllerUser';

const routers = Router();
const controller = new ControllerUser();

routers.get('/api/ping', (req: Request, resp: Response) => {
	controller.pong(req, resp);
});

routers.post(
	'/api/users',
	async (req: Request, res: Response, next: NextFunction) => {
		controller.createUser(req, res, next);
	},
);

export default routers;
