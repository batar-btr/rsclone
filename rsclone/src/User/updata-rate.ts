import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true
// });

export type Rate = 'tv' | 'movie' | undefined;

export const updateRate = async (uid: string, type:Rate, id: number | undefined,  rateCount: number) => {
  const userRef = doc(db, 'users', uid );
  const stringPath = `rate.${type}.${id}`;
  await updateDoc(userRef, {
   [stringPath]: rateCount
  })
  console.log('UPDATED!!!!!')
}