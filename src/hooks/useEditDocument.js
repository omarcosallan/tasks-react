import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "EDITED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export function useEditDocument(docCollection) {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispath = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const editDocument = async (documentId, updatedData) => {
    checkCancelBeforeDispath({ type: "LOADING" });

    try {
      const documentRef = doc(db, docCollection, documentId);
      await updateDoc(documentRef, updatedData);

      checkCancelBeforeDispath({
        type: "EDITED_DOC",
        payload: editDocument,
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

  return { editDocument, response };
}
