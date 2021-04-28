import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import { BadRequest, NotFound, Unauthorized } from '@utils/ErrorHandler';
import { admin, firebase } from '../firebaseDB';

export default class UserService {
	async createUserAuth(userAuth: UserAuth): Promise<string> {
		try {
			const userRecord = await admin.auth().createUser({
				email: userAuth.email,
				password: userAuth.password,
				displayName: `${userAuth.name} ${userAuth.lastName}`,
			});
			return userRecord.uid;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async createUser(user: User): Promise<string> {
		try {
			const resp = await admin.firestore().collection('users').add(user);
			return resp.id;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async getUserAuthInstanceByEmail(email: string): Promise<string> {
		try {
			const userRecord = await admin.auth().getUserByEmail(email);
			return userRecord.uid;
		} catch (error) {
			throw new NotFound('User not found');
		}
	}

	async signIn(email: string, password: string): Promise<string> {
		try {
			const { user } = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			if (!user.emailVerified) {
				user.sendEmailVerification();
				throw new Error('User not verified');
			}
			return await user.getIdToken(true);
		} catch (error) {
			throw new BadRequest(error);
		}
	}

	async authorization(jwt: string): Promise<string> {
		try {
			const user = await admin.auth().verifyIdToken(jwt);
			return user.uid;
		} catch (error) {
			throw new Unauthorized('Access denied');
		}
	}
}
