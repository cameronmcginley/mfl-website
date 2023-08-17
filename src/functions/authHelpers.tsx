import { auth } from "@/src/firebase/config";
import { signOut, updateProfile, type User } from "firebase/auth";

export const handleSignOut = (): void => {
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

export const getUserInfo = async (): Promise<User | null> => {
  const user = auth.currentUser;
  console.log(user?.displayName);
  console.log(user?.email);
  console.log(user?.photoURL);
  console.log(user);
  return user;
};

export const updateUserDisplayName = (newName: string): void => {
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
