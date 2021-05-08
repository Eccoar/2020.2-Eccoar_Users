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

routers.post(
	'/api/signin',
	async (req: Request, res: Response, next: NextFunction) => {
		controller.signin(req, res, next);
	},
);

routers.get(
	'/api/authorization',
	async (req: Request, res: Response, next: NextFunction) => {
		controller.authorizationHandler(req, res, next);
	},
);

routers.get(
	'/api/user/:id',
	async (req: Request, res: Response, next: NextFunction) => {
		controller.getUserbyAuthId(req, res, next);
	},
);

export default routers;
