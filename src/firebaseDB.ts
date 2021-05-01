import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// @ts-expect-error file must not be commited, so commits should not be blocked by this line
import serviceAccount from '../service-account.json';

const firebaseCred = serviceAccount as ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(firebaseCred),
});

export default admin;
