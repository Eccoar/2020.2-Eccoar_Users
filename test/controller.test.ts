import ControllerUser from '@controllers/ControllerUser';
import UserService from '@services/UserService';
import { NextFunction, Request, Response } from 'express';
jest.mock('@services/UserService');

const mockResponse = () => {
	const res: Response = {} as Response;
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
		expect(mResp.status).toHaveBeenCalledWith(201);
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
