import { db } from "../firebase/firebase";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useAuthValue } from "../context/AuthContext";
import { useEffect, useState } from "react";

export function useAuthentication() {
  const provider = new GoogleAuthProvider();
  const { setUser } = useAuthValue();

  const auth = getAuth();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      setUser(user);

      setLoading(false);
    });
  }, [auth, setUser]);

  // memory leak
  const [cancelled, setCancelled] = useState(false);
  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  function sigInWithGoogle() {
    checkIfIsCancelled();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function sigOut() {
    checkIfIsCancelled();
    setLoading(true);
    signOut(auth).then((result) => {
      setUser(result);
      setLoading(false);
    });
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, sigInWithGoogle, sigOut, loading };
}
