import {
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    increment,
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
