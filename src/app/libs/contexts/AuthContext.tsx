"use client"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  handelSigninWithGoogle: () => Promise<void>;
  handelLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        })
        return () => unsub()
    }, [])
    
    const handelSigninWithGoogle = async () => {
        setLoading(true)
        try {
            await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (error) {
            setError((error as Error)?.message || "An error occurred")
        }
        setLoading(false)
    }

    const handelLogout = async () => {
        setLoading(true)
        try {
            await signOut(auth)
        } catch (error) {
            setError((error as Error)?.message || "An error occurred")
        }
        setLoading(false)
    }

    return <AuthContext.Provider value={{
        user,
        isLoading,
        error,
        handelSigninWithGoogle,
        handelLogout,
    }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }
    return context
}