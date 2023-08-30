import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "./useFetchDocuments";
import { categorizeTasks } from "../utils/categorizeTasks";

export function useScoreUser() {
  const { user } = useAuthValue();
  const { documents } = useFetchDocuments("tasks", user.uid);

  const { concludedDocuments, noConcludedDocuments, expiredDocuments } =
    categorizeTasks(documents);

  return {
    scoreCompleted: concludedDocuments?.length * 10,
    scoreNoCompleted: noConcludedDocuments?.length * -1,
    scoreExpired: expiredDocuments?.length * -5,
  };
}
