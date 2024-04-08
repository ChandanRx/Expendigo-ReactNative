import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)
    

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsAuthenticated(true);
                setUser(user)
            }else{
                setIsAuthenticated(false);
                setUser(null)
            }
        })
        return unsub;
    },[])

    const login = async (email,password) =>{
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
            return {success:true}
        } catch (error) {
            let msg = error.message
            if(msg.includes('auth/invalid-email')) msg='Invalid email'
            if(msg.includes('auth/invalid-credential')) msg='Wrong Credentials'
            return {success: false , msg}
            
        }
    }
    
    const logout = async () =>{
        try {
            await signOut(auth)
            return {success: true}
        } catch (error) {
            return {success: false , msg : error.message, error: error}
        }
    }
    
    const register = async (email,password,username,country) =>{
        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);

            // setUser(response?.user)
            // setIsAuthenticated(true)

            await setDoc(doc(db, "users",response?.user?.uid),{
                     username,
                     country,
                     email,
                     userId: response?.user?.uid

            })
            return {success: true, data:response?.user}
        } catch (error) {
            let msg = error.message
            if(msg.includes('auth/invalid-email')) msg='Invalid email'
            if(msg.includes('auth/email-already-in-use')) msg='This email already in use'
            return {success: false , msg}
        }
    }

    const deleteExpense = async (expenseId) => {
        try {
            await deleteDoc(doc(db, "expenses", expenseId));
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{user,isAuthenticated,login,register,logout , deleteExpense}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () =>{
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value
}
