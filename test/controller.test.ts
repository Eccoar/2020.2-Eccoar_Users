import ControllerUser from '@controllers/ControllerUser';
import UserService from '@services/UserService';
import { NotFound, Unauthorized } from '@utils/ErrorHandler';
import { NextFunction, Request, Response } from 'express';
jest.mock('@services/UserService');

const mockResponse = () => {
	const res: Response = {} as Response;
	res.sendStatus = jest.fn().mockReturnValue(res);
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('pong', () => {
	test('should return ping-pong for pong()', async () => {
		const controller = new ControllerUser();
		const mReq = {} as Request;
		const mResp = mockResponse();
		await controller.pong(mReq, mResp);
		expect(mResp.status).toHaveBeenCalledWith(200);
		expect(mResp.json).toHaveBeenCalledWith({ ping: 'pong' });
	});
});

describe('Create User Route', () => {
	test('should return statuscode 201', async () => {
		const controller = new ControllerUser();
		const mReq = {} as Request;
		mReq.body = {
			email: 'generic@generic.com.br',
			password: '1234567',
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			adress: 'generic adress',
		};
		const mResp = mockResponse();
		jest.spyOn(
			UserService.prototype,
			'createUserAuth',
		).mockImplementation(() => Promise.resolve('mockUId'));
		jest.spyOn(UserService.prototype, 'createUser').mockImplementation(() =>
			Promise.resolve('mockId'),
		);
		const mNext = jest.fn();
		await controller.createUser(mReq, mResp, mNext);
		expect(mResp.sendStatus).toHaveBeenCalledWith(201);
	});

	test('should return statuscode 400', async () => {
		const controller = new ControllerUser();
		const mReq = {} as Request;
		mReq.body = {};
		const mResp = mockResponse();
		const mNext = () => {
			mResp.status(400).json({ err: 'err' });
		};
		await controller.createUser(mReq, mResp, mNext as NextFunction);
		expect(mResp.status).toBeCalledWith(400);
	});
});

describe('Sign in Route', () => {
	test('should return jwt and userId', async () => {
		const controller = new ControllerUser();
		const mReq = {} as Request;
		mReq.body = {
			email: 'generic@generic.com',
			password: 'genPass',
		};
		const mResp = mockResponse();
		const mNext = jest.fn();

		jest.spyOn(
			UserService.prototype,
			'getUserAuthInstanceByEmail',
		).mockImplementation(() => Promise.resolve('mockUId'));

		jest.spyOn(UserService.prototype, 'signIn').mockImplementation(() =>
			Promise.resolve('mockJwt'),
		);

		await controller.signin(mReq, mResp, mNext);
		expect(mResp.status).toBeCalledWith(200);
		expect(mResp.json).toHaveBeenCalledWith({
			token: 'mockJwt',
			userId: 'mockUId',
		});
	});

	test('should return Status 404', async () => {
		const controller = new ControllerUser();

		const mReq = {} as Request;
		mReq.body = {
			email: 'generic@generic.com',
			password: 'genPass',
		};
		const mResp = mockResponse();
		const mNext: NextFunction = jest.fn();

		jest.spyOn(
			UserService.prototype,
			'getUserAuthInstanceByEmail',
		).mockImplementationOnce(() => Promise.reject(new Error('not found')));

		await controller.signin(mReq, mResp, mNext);
		expect(mNext).toBeCalledWith(Error('not found'));
	});
});

describe('Sign in Route', () => {
	test('should return jwt and userId', async () => {
		const controller = new ControllerUser();
		const mReq = {} as Request;
		mReq.body = {
			token: 'JwtTokenMock',
		};
		const mResp = mockResponse();
		const mNext = jest.fn();

		jest.spyOn(
			UserService.prototype,
			'authorization',
		).mockImplementation(() => Promise.resolve('mockUId'));

		await controller.authorizationHandler(mReq, mResp, mNext);
		expect(mResp.status).toBeCalledWith(200);
		expect(mResp.json).toHaveBeenCalledWith('mockUId');
	});

	test('should return Status 404', async () => {
		const controller = new ControllerUser();

		const mReq = {} as Request;
		mReq.body = {
			token: 'JwtTokenMock',
		};
		const mResp = mockResponse();
		const mNext: NextFunction = jest.fn();

		jest.spyOn(
			UserService.prototype,
			'authorization',
		).mockImplementationOnce(() =>
			Promise.reject(new Error('Access Denied')),
		);

		await controller.authorizationHandler(mReq, mResp, mNext);
		expect(mNext).toBeCalledWith(Error('Access Denied'));
	});
});
