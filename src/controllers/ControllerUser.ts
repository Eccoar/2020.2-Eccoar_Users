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
				'address',
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
				email: req.body.email,
				lastName: req.body.lastName,
				name: req.body.name,
				cpf: req.body.cpf,
				cep: req.body.cep,
				address: req.body.address,
			} as User;

			const resolvePromise = [];

			const createUser = this.userService.createUser(user, uuidAuth);
			const sendMail = this.userService.signInAfterCreate(
				req.body.email,
				req.body.password,
			);
			resolvePromise.push(createUser, sendMail);

			Promise.all(resolvePromise);

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

			await this.userService.getUserAuthInstanceByEmail(email);

			const jwt = await this.userService.signIn(email, password);

			return res.status(200).json({ token: jwt });
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

	async getUserbyAuthId(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response> {
		try {
			const user = await this.userService.getUserFireStoreByAuthId(
				req.params.id,
			);
			return res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
}
