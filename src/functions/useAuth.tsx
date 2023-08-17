import { auth } from "@/src/firebase/config";
import { useEffect, useState } from "react";

// https://stackoverflow.com/questions/67410324/next-js-with-firebase-onauthstatechanged
export function useAuth(): { user: any; loading: boolean } {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user != null) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [user]);

  return { user, loading };
}
