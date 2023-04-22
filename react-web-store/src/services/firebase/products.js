import {
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    increment,
    query,
    where,
} from "firebase/firestore";
import { db } from "./firebase-config.js";

export const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "video-games"));
    const data = querySnapshot.docs.map((doc) => {
        // console.log(doc.id, "=>", doc.data());
        const id = doc.id;
        const restOfData = doc.data();
        return { id, ...restOfData };
    });
    return data;
};

const obj = {
    favourited: false,
    imageUrl:
        "https://space4games.com/wp-content/uploads/cyberpunk-2077_cover_s4g.png.webp",
    name: "Place Holder Name",
    platforms: {
        pc: "for PC",
        ps5: "for PS5",
        XBox: "for X-Box",
    },
    quantity: 20,
    unitPrice: 59.99,
};

export const addProduct = async (someObj) => {
    // someObj should ahve title, yearReleased, director
    const docRef = await addDoc(collection(db, "video-games"), someObj);

    console.log(docRef);

    //return true // return docRef
};

export const getProductById = async (id) => {
    const docRef = doc(db, "video-games", id);
    const docSnap = await getDoc(docRef);

    // console.log(docSnap.exists());
    // console.log(docSnap.data());

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

// just used to create some bare documents
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

// for (let i = 0; i < 10; i++) {
//     addProduct(obj);
// }
