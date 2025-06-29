// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./dbFirebase";
import { getFirestore, collection, doc, setDoc, getDocs, updateDoc, addDoc, deleteDoc, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)

//iniciar secion
export const logInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return 'ok'
    } catch (error) {
        return error.message
    }
}

export const logOutUser = async () => {
    try {
        await signOut(auth)
        return 'out'
    } catch (error) {
        return error.message
    }
}


export const getAllData = async (proyecto) => {
    const querySnapshot = await getDocs(collection(db, proyecto));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data
}

export const getFilterDatas = async (tb, param, value) => {
    const refTb = collection(db, tb)
    const q = query(refTb, where(param, "==", value))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data
}


/*CUD itemActions - R hay un metodo unico*/
export const editItemActionState = async (idDoc, status) => {
    try {
        const docRef = doc(db, 'itemAction', idDoc)
        await updateDoc(docRef, { estado: status })
        return 'ok'
    } catch (error) {
        return (error.message)
    }
}

export const updateItemAction = async (idDoc, obj) => {
    const docRef = doc(db, 'itemAction', idDoc)
    await updateDoc(docRef, obj)
    return 'ok'
}

export const addItemAction = async (obj) => {
    const docRef = collection(db, 'itemAction')
    const res = await addDoc(docRef, obj)
    return res
}

export const deleteItemAction = async (id) => {
    try {
        await deleteDoc(doc(db, 'itemAction', id))
        return 'ok'
    } catch (error) {
        return (error.message)
    }

}

/* CUD de Items - R es general */
export const addItem = async (obj) => {
    const docRef = collection(db, 'Items')
    const res = await addDoc(docRef, obj)
    return res
}

export const editItemState = async (idDoc, status) => {
    const docRef = doc(db, 'Items', idDoc)
    try {
        await updateDoc(docRef, { estado: status })
        return 'ok'
    } catch (error) {
        return (error.message)
    }
}

export const deleteItem = async (id) => {
    try {
        await deleteDoc(doc(db, 'Items', id))
        return 'ok'
    } catch (error) {
        return (error.message)
    }
}

/*CUD Proyectos - R es general*/
export const addProyecto = async (obj) => {
    const docRef = collection(db, 'Proyectos')
    const res = await addDoc(docRef, obj)
    return res
}

export const deleteProyecto = async (id) => {
    try {
        await deleteDoc(doc(db, 'Proyectos', id))
        return 'ok'
    } catch (error) {
        return (error.message)
    }
}

/*CUD Proyectos - R es general*/
export const addNote = async (obj) => {
    const docRef = collection(db, 'Notes')
    const res = await addDoc(docRef, obj)
    return res
}

export const deleteNote = async (id) => {
    try {
        await deleteDoc(doc(db, 'Notes', id))
        return 'ok'
    } catch (error) {
        return (error.message)
    }
}

//Tipos de proyectos
export const addTipoProyecto = async(obj)=>{
    const docRef = collection(db, 'TipoProyecto')
    const res = await addDoc(docRef, obj)
    return res
}

export const deleteTipoProyecto = async(id) =>{
    try {
        await deleteDoc(doc(db, 'TipoProyecto', id))
        return 'ok'
    } catch (error) {
        return (error.message)
    }
}