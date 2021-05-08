import { User } from '@schemas/User';
import { UserAuth } from '@schemas/UserAuth';
import {
	BadRequest,
	Forbidden,
	NotFound,
	Unauthorized,
} from '@utils/ErrorHandler';
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

	async createUser(user: User, userId: string): Promise<void> {
		try {
			await admin.firestore().collection('users').doc(userId).set(user);
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

	async signInAfterCreate(email: string, password: string): Promise<void> {
		try {
			const { user } = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password);
			user.sendEmailVerification();
		} catch (error) {
			throw new BadRequest('Failed to send email');
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
			if (
				error.message == 'User not verified' ||
				error.message ==
					'The password is invalid or the user does not have a password.'
			)
				throw new Unauthorized(error.message);

			throw new BadRequest(error.message);
		}
	}

	async authorization(jwt: string): Promise<string> {
		try {
			const user = await admin.auth().verifyIdToken(jwt);
			return user.uid;
		} catch (error) {
			throw new Forbidden('Access denied');
		}
	}

	async getUserFireStoreByAuthId(
		id: string,
	): Promise<FirebaseFirestore.DocumentData> {
		try {
			const userRef = await admin
				.firestore()
				.collection('users')
				.doc(id)
				.get();

			if (userRef.data() == undefined) throw new Error('User not found');

			return userRef.data();
		} catch (error) {
			throw new NotFound(error.message);
		}
	}
}
