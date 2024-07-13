import admin from 'firebase-admin';
import * as serviceAccount from "../../.firebase/voice-mail-service-account.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});