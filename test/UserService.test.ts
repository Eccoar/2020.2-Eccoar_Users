import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import UserService from '@services/UserService';
import * as admin from 'firebase-admin';

jest.mock('firebase-admin');

describe('Test User Service', () => {
	const mockFirestoreProperty = (admin: any) => {
		const firestore = jest.fn();
		Object.defineProperty(admin, 'firestore', {
			get: jest.fn(() => firestore),
			configurable: true,
		});
	};

	const mockAuthProperty = (admin: any) => {
		const auth = jest.fn();
		Object.defineProperty(admin, 'auth', {
			get: jest.fn(() => auth),
			configurable: true,
		});
	};

	test('should return a user Id for createUser', async () => {
		const userService = new UserService();
		mockFirestoreProperty(admin);

		const user = {
			email: 'generic@generic.com.br',
			userAuthId: '123-456-78945-68',
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			adress: 'generic adress',
		} as User;

		const add = jest.fn().mockReturnValue({ id: 'b1ceeda8' });
		const collection = jest.fn(() => ({ add }));
		jest.spyOn(admin, 'firestore').mockReturnValue(({
			collection,
		} as unknown) as any);

		const id = await userService.createUser(user);
		expect(id).toBe('b1ceeda8');
	});

	test('should return a user Id for createUserAuth', async () => {
		mockAuthProperty(admin);
		const userService = new UserService();

		const user = {
			email: 'generic@generic.com.br',
			password: '123456789',
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			adress: 'generic adress',
		} as UserAuth;

		const createUser = jest.fn().mockReturnValue({ uid: 'b1ceeda8' });
		jest.spyOn(admin, 'auth').mockReturnValue(({
			createUser,
		} as unknown) as any);

		const id = await userService.createUserAuth(user);
		expect(id).toBe('b1ceeda8');
	});

	test('should return a Error for createUserAuth', async () => {
		mockAuthProperty(admin);
		const userService = new UserService();

		const user = {
			email: 'generic@generic.com.br',
			password: '123456789',
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			adress: 'generic adress',
		} as UserAuth;

		const createUser = jest.fn().mockImplementation(() => {
			throw new Error();
		});
		jest.spyOn(admin, 'auth').mockReturnValue(({
			createUser,
		} as unknown) as any);

		expect(userService.createUserAuth(user)).rejects.toThrow();
	});

	test('should return a Error for createUser', async () => {
		mockFirestoreProperty(admin);
		const userService = new UserService();

		const user = {
			email: 'generic@generic.com.br',
			userAuthId: '123-456-78945-68',
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			adress: 'generic adress',
		} as User;

		const add = jest.fn().mockImplementation(() => {
			throw new Error();
		});
		const collection = jest.fn(() => ({ add }));
		jest.spyOn(admin, 'firestore').mockReturnValue(({
			collection,
		} as unknown) as any);

		expect(userService.createUser(user)).rejects.toThrow();
	});
});
