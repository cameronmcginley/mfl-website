"use client";

// import Image from "next/image";
import React from "react";

import { auth } from "../../firebase/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default function Home(): JSX.Element {
  const googleAuth = new GoogleAuthProvider();

  const signInWithGoogle = (): void => {
    console.log("Signing in...");
    signInWithPopup(auth, googleAuth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const signOutWithGoogle = (): void => {
    console.log("Signing out...");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const getUserInfo = (): void => {
    const user = auth.currentUser;
    console.log(user?.displayName);
    console.log(user?.email);
    console.log(user?.photoURL);
  };

  //   const ui = new firebaseui.auth.AuthUI(auth);

  const updateUserDisplayName = (newName: string): void => {
    const user = auth.currentUser;
    if (user != null) {
      updateProfile(user, {
        displayName: newName,
      })
        .then(() => {
          // Update successful
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h1>Google Auth</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <h1></h1>
      <button onClick={signOutWithGoogle}>Sign out</button>
      <h1></h1>
      <button onClick={getUserInfo}>Check current user</button>
      <h1></h1>
      <button
        onClick={() => {
          updateUserDisplayName("New Name");
        }}
      >
        Update user display name
      </button>
    </div>
  );
}
