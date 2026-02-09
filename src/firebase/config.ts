import { initializeApp, getApp, getApps, FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-99874364-880bd",
  "appId": "1:705618426785:web:ceb3019bef1327ec8f29e0",
  "apiKey": "AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA",
  "authDomain": "studio-99874364-880bd.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "705618426785"
};

let firebaseApp: FirebaseApp;

export function getFirebaseApp(): FirebaseApp {
  if (firebaseApp) return firebaseApp;

  if (!getApps().length) {
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.info('Firebase not auto-initialized, falling back to config object.');
      }
      firebaseApp = initializeApp(firebaseConfig);
    }
  } else {
    firebaseApp = getApp();
  }
  return firebaseApp;
}
