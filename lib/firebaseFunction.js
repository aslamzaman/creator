
import { db } from "./firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';


export const addDataToFirebase = async (collectionName, data) => {
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, data);
        return `Data saved successfully. New Id: ${docRef.id}`;
    } catch (err) {
        console.error('Error adding document: ', err);
        return "Data saving error!";
    }
};
