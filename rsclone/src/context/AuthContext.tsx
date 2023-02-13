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

interface AuthContextModel {
  auth: Auth
  user: User | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  logOut: () => Promise<void>
  // sendPasswordResetEmail?: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextModel>({} as AuthContextModel);

interface ProviderProps {
  children: React.ReactNode
}


export const AuthProvider = ({ children }: ProviderProps): React.ReactElement => {

  const [user, setUser] = useState<User | null>(null)

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
    // console.log('USE-EFFECT');

    const unsubsribe = onAuthStateChanged(auth, (user) => {
      console.log('SET USER');
      setUser(user);
    })
    return () => {
      unsubsribe();
    }
  }, [])

  const values = {
    signUp,
    signIn,
    logOut,
    auth,
    user
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
