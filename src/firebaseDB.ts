import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../service-account.json';

const firebaseCred = serviceAccount as ServiceAccount;

admin.initializeApp({
	credential: admin.credential.cert(firebaseCred),
});

export default admin;
