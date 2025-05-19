import { collection, addDoc, deleteDoc, doc, getDocs, getDoc, setDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { redisConfig } from './redisConfig';


export const getDataFromFirestoreRedisServer = async (firestoreCollectionName, redisKeyName, redisLimit) => {
    let client;
    try {
        client = await redisConfig();
        const cached = await client.get(redisKeyName);

        if (cached) {
            console.log("Data from redis server");
            return JSON.parse(cached);
        } else {
            const collectionRef = collection(db, firestoreCollectionName);

            const q = query(
                collectionRef,
                orderBy("createdAt", "desc"),
                limit(redisLimit)
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            await client.set(redisKeyName, JSON.stringify(data));
            console.log("Data from firestore");
            return data;
        }
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        if (client) await client.quit();
    }
}



export const addDataToFirestoreRedisServer = async (firestoreCollectionName, data, redisKeyName, redisLimit) => {
    let client;
    try {
        const collectionRef = collection(db, firestoreCollectionName);
        const docRef = await addDoc(collectionRef, data);

        //Redis logic ---------------
        client = await redisConfig();
        const cached = await client.get(redisKeyName);
        const newEntry = { id: docRef.id, ...data };

        if (cached) {
            const json = JSON.parse(cached);
            const updatedData = [newEntry, ...json];
            const limtedData = updatedData.slice(0, redisLimit);
            await client.set(redisKeyName, JSON.stringify(limtedData));
        } else {
            await client.set(redisKeyName, JSON.stringify([newEntry]));
        }
        // await client.del(redisKeyName);

        return `Data saved successfully. New Id: ${docRef.id}`;
    } catch (err) {
        console.error('Error adding document: ', err);
        return "Data saving error!";
    } finally {
        if (client) await client.quit();
    }
}



export const updateDataToFirestoreRedisServer = async (firestoreCollectionName, data, id, redisKeyName) => {
    let client;
    try {
        const collectionRef = collection(db, firestoreCollectionName);
        const refDoc = doc(collectionRef, id);
        await setDoc(refDoc, data);

        //Redis logic ---------------
        client = await redisConfig();
        const cached = await client.get(redisKeyName);

        if (!cached) {
            return "Data updating error! (No Redis cache found)";
        }

        const json = JSON.parse(cached);
        const updatedData = json.map(item => (item.id === id ? { id, ...data } : item));
        await client.set(redisKeyName, JSON.stringify(updatedData));

        return `Data updated successfully. Updated Id : ${id}`;
    } catch (err) {
        console.error('Error adding document: ', err);
        return "Data updating error!";
    } finally {
        if (client) await client.quit();
    }
}



export const deleteDataFromFirestoreRedisServer = async (firestoreCollectionName, id, redisKeyName) => {
    let client;
    try {
        const collectionRef = collection(db, firestoreCollectionName);
        const refDoc = doc(collectionRef, id);


        const snapshot = await getDoc(refDoc);
        if (!snapshot.exists()) {
            return `Document with id "${id}" not found in Firestore.`;
        }

        await deleteDoc(refDoc);


        //Redis logic ---------------
        client = await redisConfig();
        await client.del(redisKeyName);

        return `Data deleted successfully. Deleted Id : ${id}`;
    } catch (err) {
        console.error('Error deleting document: ', err);
        return "Data deleting error!";
    } finally {
        if (client) await client.quit();
    }
}




export const getSingleDataFromFirestore = async (firestoreCollectionName, id) => {
    try {
        const collectionRef = doc(db, firestoreCollectionName, id);

        const docSnapshot = await getDoc(collectionRef);
        if (docSnapshot.exists()) {
            const data = {
                id: docSnapshot.id,
                ...docSnapshot.data(),
            };
            console.log("Data from firestore:", data);
            return data;
        } else {
            console.log("No document found with ID:", id);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

