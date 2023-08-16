"use client";

// import Image from "next/image";
import React from "react";

import { auth } from "../../../firebase/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";

// import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default function Home(): JSX.Element {
  const googleAuth = new GoogleAuthProvider();

  // https://firebase.google.com/docs/auth/web/firebaseui?hl=en&authuser=0
  const ui = new firebaseui.auth.AuthUI(auth);
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById("loader").style.display = "none";
      },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      GoogleAuthProvider.PROVIDER_ID,
    ],
  };

  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);

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

      <h1>___</h1>
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
    </div>
  );
}
