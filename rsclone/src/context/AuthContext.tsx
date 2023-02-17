import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  Auth,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../firebase";
import UserData, { userConverter } from "../User/UserData";

interface AuthContextModel {
  auth: Auth
  user: User | null
  userData: UserData | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

interface ProviderProps {
  children: React.ReactNode
}


export const AuthProvider = ({ children }: ProviderProps): React.ReactElement => {

  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logOut(): Promise<void> {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    })
    return () => {
      unsubsribe();
    }
  }, [])

  useEffect(() => {
    let unsub: Unsubscribe;
    if( user) {
      unsub = onSnapshot(doc(db, "users", user.uid).withConverter(userConverter), (doc) => {
        const data = doc.data();
        if(data) {
          setUserData(data);
        }
      })
    }
    return () => {
      if(typeof unsub === 'function') {
        unsub();
        setUserData(null);
      }
    }
  }, [user]);


  const values = {
    signUp,
    signIn,
    logOut,
    auth,
    user,
    userData
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth(): AuthContextModel {
  return useContext(AuthContext)
}
