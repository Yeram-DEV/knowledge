import firebase from 'firebase/compat/app'
import 'firebase/compat/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

let messaging

if (typeof window !== 'undefined') {
  // Initialize Firebase app only in the client environment
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
  messaging = firebase.messaging()
}

export { messaging }
