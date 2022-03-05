import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDNnSabFMBa-L9Gpv-buAVv-Ya-O4jiqkY",
    authDomain: "crown-clothing-react-db.firebaseapp.com",
    projectId: "crown-clothing-react-db",
    storageBucket: "crown-clothing-react-db.appspot.com",
    messagingSenderId: "432853256671",
    appId: "1:432853256671:web:28185f9ce07567af765c6a",
    measurementId: "G-HDBPCJN49V"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;