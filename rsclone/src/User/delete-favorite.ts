import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";


export type MediaType = 'tv' | 'movie';

export const deleteFavorite = async (uid: string, type:MediaType, id: number) => {
  const userRef = doc(db, 'users', uid );
  const stringPath = `favorite.${type}`;
  await updateDoc(userRef, {
   [stringPath]: arrayRemove(id)
  })
  console.log('Delete Favorite');
}