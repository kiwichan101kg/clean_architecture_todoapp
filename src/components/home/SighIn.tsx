"use client";
import { auth, provider } from "@/lib/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const SighIn = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // console.log(result);
      // router.push("/tasks");
    });
  };
  console.log(user);

  const signOutWithGoogle = () => {
    auth.signOut();
  };

  return (
    <>
      {user ? (
        <button
          onClick={signOutWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          ログアウト
        </button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
        >
          Googleログインして開始する
        </button>
      )}
    </>
  );
};
