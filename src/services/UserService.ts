import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import admin from '../firebaseDB';

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
}
