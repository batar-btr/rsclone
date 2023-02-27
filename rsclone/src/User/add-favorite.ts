import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

// Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });

export type MediaType = 'tv' | 'movie';

export const addFavorite = async (uid: string, type:MediaType, id: number) => {
  const userRef = doc(db, 'users', uid );
  const stringPath = `favorite.${type}`;
  await updateDoc(userRef, {
   [stringPath]: arrayUnion(id)
  })
  console.log('Update Favorite');
}