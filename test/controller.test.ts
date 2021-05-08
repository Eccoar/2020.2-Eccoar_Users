import ControllerUser from '@controllers/ControllerUser';
import UserService from '@services/UserService';
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
