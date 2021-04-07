import { Request, Response } from 'express';
import { UserRepository } from '@repositories/UserRepository';

export default class ControllerUser {
	userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	async pong(req: Request, resp: Response): Promise<void> {
		const pingPong = {
			ping: 'pong',
		};
		resp.status(200).json(pingPong);
	}

	async findUserByName(req: Request, resp: Response): Promise<void> {
		const name = req.query.name.toString();
		const surname = req.query.surname.toString();
		try {
			const user = await this.userRepository.findByName(name, surname);
			resp.status(200).json(user);
		} catch (e) {
			new Error('Request Error');
		}
	}
}
