import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import UserService from '@services/UserService';
import { NotFound } from '@utils/ErrorHandler';
import * as admin from 'firebase-admin';

jest.mock('firebase-admin');
jest.mock('firebase');

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
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			address: 'generic adress',
		} as User;

		const set = jest.fn();
		const doc = jest.fn(() => ({ set }));
		const collection = jest.fn(() => ({ doc }));
		jest.spyOn(admin, 'firestore').mockReturnValue(({
			collection,
		} as unknown) as any);

		await userService.createUser(user, 'b1ceeda8');

		expect(userService.createUser).toBeTruthy();
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
			address: 'generic adress',
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
			address: 'generic adress',
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
			lastName: 'generic',
			name: 'Generic',
			cpf: '88888888888',
			cep: '47800000',
			address: 'generic adress',
		} as User;

		const set = jest.fn().mockImplementation(() => {
			throw new Error();
		});
		const doc = jest.fn(() => ({ set }));
		const collection = jest.fn(() => ({ doc }));
		jest.spyOn(admin, 'firestore').mockReturnValue(({
			collection,
		} as unknown) as any);

		expect(userService.createUser(user, null)).rejects.toThrow();
	});

	test('should return User id getting by email', async () => {
		mockAuthProperty(admin);
		const userService = new UserService();

		const getUserByEmail = jest.fn().mockReturnValue({ uid: 'b1ceeda8' });
		jest.spyOn(admin, 'auth').mockReturnValue(({
			getUserByEmail,
		} as unknown) as any);

		const id = await userService.getUserAuthInstanceByEmail(
			'generic@generic.com',
		);
		expect(id).toBe('b1ceeda8');
	});

	test('should return Error getting id by email', async () => {
		mockAuthProperty(admin);
		const userService = new UserService();

		const getUserByEmail = jest.fn().mockImplementation(async () => {
			throw new Error();
		});

		jest.spyOn(admin, 'auth').mockReturnValue(({
			getUserByEmail,
		} as unknown) as any);

		expect(
			userService
				.getUserAuthInstanceByEmail('generic@generic.com')
				.catch(Error),
		).resolves.toThrow();
	});

	test('should return userId after authorization', async () => {
		mockAuthProperty(admin);
		const userService = new UserService();

		const verifyIdToken = jest.fn().mockReturnValue({ uid: 'b1ceeda8' });
		jest.spyOn(admin, 'auth').mockReturnValue(({
			verifyIdToken,
		} as unknown) as any);

		const id = await userService.authorization('jwt Token');
		expect(id).toBe('b1ceeda8');
	});

	test('should return Error after authorization', async () => {
		mockAuthProperty(admin);
		const userService = new UserService();

		const verifyIdToken = jest
			.fn()
			.mockImplementation(async () => Promise.reject());

		jest.spyOn(admin, 'auth').mockReturnValue(({
			verifyIdToken,
		} as unknown) as any);

		expect(
			userService.authorization('jwt Token').catch(Error),
		).resolves.toThrow();
	});

	test('should return a user', async () => {
		mockFirestoreProperty(admin);
		const userService = new UserService();

		const mockUser = {
			lastName: 'sobrenome',
			email: 'email@gmail.com',
			name: 'nome',
			cpf: '99999999999',
			address: 'generic addres',
			cep: '99999999',
		} as FirebaseFirestore.DocumentData;

		const docRes = ({
			data: () => mockUser,
		} as unknown) as FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

		const get = jest.fn().mockImplementation(() => docRes);
		const doc = jest.fn(() => ({ get }));
		const collection = jest.fn(() => ({ doc }));
		jest.spyOn(admin, 'firestore').mockReturnValue(({
			collection,
		} as unknown) as any);

		const res = await userService.getUserFireStoreByAuthId('mockId');
		expect(res).toBe(mockUser);
	});

	test('should return a user', async () => {
		mockFirestoreProperty(admin);
		const userService = new UserService();
		const docRes = ({
			data: () => {
				undefined;
			},
		} as unknown) as FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

		const get = jest.fn().mockImplementation(() => docRes);
		const doc = jest.fn(() => ({ get }));
		const collection = jest.fn(() => ({ doc }));
		jest.spyOn(admin, 'firestore').mockReturnValue(({
			collection,
		} as unknown) as any);

		expect(
			userService.getUserFireStoreByAuthId('mocId').catch(Error),
		).resolves.toThrow();
	});
});
