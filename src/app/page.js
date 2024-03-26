// import Image from "next/image";

// export default function Home() {
//   return <main>Aaagya ......</main>;
// }
"use client";
import { useState ,useEffect } from "react";
import app from "../../config.js"
import {getAuth} from 'firebase/auth';
import {useRouter} from "next/navigation";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import Dashboard from "./dashboard/page.js"


export default function Home(){
  const [user,setUser]=useState(null);
  const router =useRouter();

  useEffect(()=>{
    const auth=getAuth(app);
    const unsubscribe=auth.onAuthStateChanged((user)=>{
      if(user)
        setUser(user);
      else
        setUser(null);
    });
    return ()=>unsubscribe();
  },[]);
  const signInWithGoogle=async()=>{
    const auth =getAuth(app);
    const provider=new GoogleAuthProvider();
    try {
      await signInWithPopup(auth ,provider);
      router.push("/dashboard")
    } catch (error) {
      console.error("error signing in with google",error.message);
    }
  };
  
  return(
    <div className="flex flex-col items-center justify-center h-screen">
      {user?(
        <Dashboard/>
        ):(
          <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 round">
            Sign in with Google
          </button>
        )
        }
    </div>
  )
}
