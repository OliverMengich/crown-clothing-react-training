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

export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if (!userAuth) {console.log('no user'); return;}
    // if user exists. quey inside the firestore into the document to check if user exist
    const useRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await useRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try {
            //store data
            await useRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return useRef;
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () =>auth.signInWithPopup(provider);

export default firebase;