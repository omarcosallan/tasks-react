export function categorizeTasks(documents) {
  const concludedDocuments = documents?.filter((doc) => doc.concluded);
  const concludedTodayDocuments = documents?.filter(
    (doc) =>
      new Date().getDate() === doc.finishIn.toDate().getDate() && !doc.concluded
  );
  const noConcludedDocuments = documents?.filter((doc) => !doc.concluded);
  const expiredDocuments = documents?.filter(
    (doc) =>
      !doc.concluded && doc.finishIn.toDate().getTime() < new Date().getTime()
  );

  return {
    concludedDocuments,
    concludedTodayDocuments,
    noConcludedDocuments,
    expiredDocuments,
  };
}
