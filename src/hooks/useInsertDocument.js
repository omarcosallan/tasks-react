import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebase";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export function useInsertDocument(docCollection) {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispath = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelBeforeDispath({ type: "LOADING" });

    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const collectionRef = collection(db, docCollection);
      await addDoc(collectionRef, newDocument);

      checkCancelBeforeDispath({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      checkCancelBeforeDispath({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
}
