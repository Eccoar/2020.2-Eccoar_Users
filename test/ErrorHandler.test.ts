import { NextFunction, Response, Request } from 'express';
import handleErrors, {
	NotFound,
	BadRequest,
	Unauthorized,
} from '@utils/ErrorHandler';

const mockResponse = () => {
	const res = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

const mockRequest = () => {
	const req = {} as Request;
	return req;
};

describe('Error handling', () => {
	test('Return BadRequest', () => {
		const error = new BadRequest('error');
		expect(error.message).toBe('error');
		expect(error.getCode()).toBe(400);
	});

	test('Return NotFound', () => {
		const error = new NotFound('error');
		expect(error.message).toBe('error');
		expect(error.getCode()).toBe(404);
	});

	test('Return Unauthorized', () => {
		const error = new Unauthorized('error');
		expect(error.message).toBe('error');
		expect(error.getCode()).toBe(401);
	});
});

describe('Error handler middleware', () => {
	const nextFunction: NextFunction = jest.fn();

	test('handle error when error includes statusCode', async () => {
		const error: Error = {
			name: 'error',
			message: 'string',
		};
		const mResp = mockResponse();
		const mReq = mockRequest();
		handleErrors(error, mReq, mResp, nextFunction);
		expect(mResp.status).toHaveBeenCalledWith(500);
		expect(nextFunction).not.toHaveBeenCalled();
	});
});
