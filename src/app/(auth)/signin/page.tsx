"use client";

import { auth } from "@/src/firebase/config";
import { GoogleAuthProvider } from "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
import AuthHeader from "../auth-header";

export const metadata = {
  title: "Sign In - Mosaic",
  description: "Page description",
};

export default function SignIn(): JSX.Element {
  const redirectUrl = "/home";
  const signInText = "Sign in to your account";

  // https://firebase.google.com/docs/auth/web/firebaseui?hl=en&authuser=0
  // https://github.com/firebase/firebaseui-web
  // https://github.com/firebase/firebaseui-web/issues/216
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() != null ||
      new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (
          authResult: firebaseui.auth.AuthResult,
          redirectUrl: string
        ) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered, hide loading bar
          const loaderElement = document.getElementById("loader");
          if (loaderElement != null) {
            loaderElement.style.display = "none";
          } else {
            console.error("Loader element not found");
          }
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInSuccessUrl: redirectUrl,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        GoogleAuthProvider.PROVIDER_ID,
      ],
    };

    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    // Page
    <main className="bg-white dark:bg-slate-900">
      {/* Content container handler */}
      <div className="justify-center relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <AuthHeader />

            {/* Sign in box */}
            <div className="max-w-sm mx-auto w-full px-4 py-8">
              {/* Title */}
              <h1 className="text-center text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                {signInText}
              </h1>

              {/* Form */}
              <div id="firebaseui-auth-container"></div>
              <div id="loader">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
