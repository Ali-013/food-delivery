"use client";
import { auth, db } from "@/firebase";
import { MoodData } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: User | null;
  userData: MoodData | null;
  setUserData: React.Dispatch<React.SetStateAction<MoodData | null>>;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loading: boolean;
}

const defaultValue: AuthContextType = {
  user: null,
  login: async () => {
    throw new Error("login function not implemented");
  },
  signup: async () => {
    throw new Error("signup function not implemented");
  },
  logout: async () => {
    throw new Error("logout function not implemented");
  },
  loading: true,
  userData: null,
  setUserData: function (): void {
    throw new Error("Function not implemented.");
  },
};

// Create and export the context itself
export const AuthContext = React.createContext<AuthContextType>(defaultValue);

// Hook for using the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<MoodData | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    setCurrentUser(null);
    setUserData(null);
    return signOut(auth);
  }
  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          console.log("No user signed in");
          return;
        }

        console.log("User signed in:", user);
        console.log("Featching user data");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData: MoodData | null = null;
        if (docSnap.exists()) {
          console.log("User data fetched:", docSnap.data());
          firebaseData = docSnap.data() as MoodData;
        }
        setUserData(firebaseData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubsribe();
  }, []);

  // Create the value object that will be provided to consumers
  const value = {
    user: currentUser,
    userData,
    setUserData,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
