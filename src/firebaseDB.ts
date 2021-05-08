import * as admin from 'firebase-admin';
import firebase from 'firebase';
import { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../service-account.json';
import firebaseAccount from '../firebase-account.json';

const firebaseCred = serviceAccount as ServiceAccount;
const firebaseApp = firebaseAccount;

admin.initializeApp({
	credential: admin.credential.cert(firebaseCred),
});

firebase.initializeApp(firebaseApp);

export { admin, firebase };
