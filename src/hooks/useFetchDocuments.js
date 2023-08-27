import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useFilterType } from "../context/FilterType";

export function useFetchDocuments(docCollection, userID) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const { typeFilter } = useFilterType();

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    setCancelled(false);
  }, [typeFilter]);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q = await query(
          collectionRef,
          where("createdBy", "==", userID),
          orderBy("createdAt", "desc")
        );

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, cancelled, userID, typeFilter]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
}
