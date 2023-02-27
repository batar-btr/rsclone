import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import { Rate } from "./updata-rate";

export const deleteRate = async (uid: string, type:Rate, id: number | undefined) => {
  const userRef = doc(db, 'users', uid);
  const stringPath = `rate.${type}.${id}`;
  await updateDoc(userRef, {
      [stringPath]: deleteField()
  });

}


// Remove the 'capital' field from the document