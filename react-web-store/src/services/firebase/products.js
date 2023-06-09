import {
    addDoc,
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment,
} from "firebase/firestore";
import { db } from "./firebase-config.js";

export const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "video-games"));
    const data = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        const restOfData = doc.data();
        return { id, ...restOfData };
    });
    return data;
};

export const addProduct = async (someObj) => {
    const docRef = await addDoc(collection(db, "video-games"), someObj);

    console.log(docRef);
};

export const getProductById = async (id) => {
    const docRef = doc(db, "video-games", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Doc not found");
    }
};

export const incrementQuantity = async (id, num) => {
    const docRef = doc(db, "video-games", id);
    await updateDoc(docRef, {
        quantity: increment(num),
    });
    return "quantity incremented";
};

//for quickly adding things to db
// const obj = {
//     favourited: false,
//     imageUrl:
//         "https://space4games.com/wp-content/uploads/cyberpunk-2077_cover_s4g.png.webp",
//     name: "Place Holder Name",
//     platforms: {
//         pc: "for PC",
//         ps5: "for PS5",
//         XBox: "for X-Box",
//     },
//     quantity: 20,
//     unitPrice: 59.99,
// };
// addProduct(obj);
