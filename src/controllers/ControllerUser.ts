import { NextFunction, Request, Response } from 'express';

import UserService from '@services/UserService';
import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import { CheckFields } from '@utils/CheckFields';
import { BadRequest } from '@utils/ErrorHandler';

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

	async createUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | void> {
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
				const errorMessage = `Missing fields [${missingFields}]`;
				throw new BadRequest(errorMessage);
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

			await this.userService.createUser(user);
			return res.sendStatus(201);
		} catch (error) {
			next(error);
		}
	}

	async signin(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response> {
		try {
			const { email, password } = req.body;

			const id = await this.userService.getUserAuthInstanceByEmail(email);

			const jwt = await this.userService.signIn(email, password);

			return res.status(200).json({ token: jwt, userId: id });
		} catch (error) {
			next(error);
		}
	}

	async authorizationHandler(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response> {
		try {
			const userId = await this.userService.authorization(
				req.headers.authorization,
			);

			return res.status(200).json(userId);
		} catch (error) {
			next(error);
		}
	}
}
