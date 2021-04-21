import { Request, Response } from 'express';

export default class ControllerUser {
	async pong(req: Request, resp: Response): Promise<void> {
		const pingPong = {
			ping: 'pong',
		};
		resp.status(200).json(pingPong);
	}
}
