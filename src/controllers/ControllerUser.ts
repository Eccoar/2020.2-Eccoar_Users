import { Request, Response } from 'express';

import UserService from '@services/UserService';
import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import { CheckFields } from '@utils/CheckFields';

export default class ControllerUser {
	userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async pong(req: Request, resp: Response): Promise<void> {
		const pingPong = {
			ping: 'pong',
		};
		resp.status(200).json(pingPong);
	}

	async createUser(req: Request, res: Response): Promise<Response | void> {
		try {
			const fields = [
				'email',
				'name',
				'lastName',
				'password',
				'cpf',
				'cep',
				'adress',
			];

			const missingFields = CheckFields(fields, req.body);

			if (missingFields.length > 0) {
				return res
					.status(400)
					.json({ msg: `Missing fields [${missingFields}]` });
			}

			const userAuth = {
				email: req.body.email,
				password: req.body.password,
				name: req.body.name,
				lastName: req.body.lastName,
			} as UserAuth;

			const uuidAuth = await this.userService.createUserAuth(userAuth);

			const user = {
				userAuthId: uuidAuth,
				email: req.body.email,
				lastName: req.body.lastName,
				name: req.body.name,
				cpf: req.body.cpf,
				cep: req.body.cep,
				adress: req.body.adress,
			} as User;

			const resp = await this.userService.createUser(user);
			return res.status(201).json(resp);
		} catch (error) {
			return res.status(400).json({ err: error.message });
		}
	}
}
