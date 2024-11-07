import * as firebase from "firebase/app";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

class Firebase {
  private db: firestore.Firestore;

  constructor() {
    let app: firebase.FirebaseApp;

    if (!firebase.getApps().length) {
      app = firebase.initializeApp(firebaseConfig);
    } else {
      app = firebase.getApp();
    }
    this.db = firestore.getFirestore(app);
  }

  doCreateCollectionDocument(collectionName: string, data: unknown) {
    return firestore.addDoc(
      firestore.collection(this.db, collectionName),
      data
    );
  }

  doEditCollectionDocument(
    collectionName: string,
    docId: string,
    newData: object
  ) {
    return firestore.setDoc(
      firestore.doc(this.db, collectionName, docId),
      { ...newData },
      { merge: true }
    );
  }

  doDeleteCollectionDocument(collectionName: string, docId: string) {
    return firestore.deleteDoc(firestore.doc(this.db, collectionName, docId));
  }

  doGetCollectionDocument(collectionName: string, docId: string) {
    return firestore.getDoc(firestore.doc(this.db, collectionName, docId));
  }

  doGetAllCollectionDocument(
    collectionName: string,
    callback: (
      snapshot: firestore.QuerySnapshot<firestore.DocumentData>
    ) => void
  ) {
    return firestore.onSnapshot(
      firestore.collection(this.db, collectionName),
      callback
    );
  }
}

export { Firebase };
