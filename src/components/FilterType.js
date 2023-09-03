import styles from "./FilterType.module.css";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Clock1,
  XCircle,
} from "lucide-react";

import { useFilterType } from "../context/FilterType";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { categorizeTasks } from "../utils/categorizeTasks";

export function FilterType({ user }) {
  const { typeFilter, setTypeFilter } = useFilterType();
  const { documents } = useFetchDocuments("tasks", user.uid);

  const {
    concludedDocuments,
    concludedTodayDocuments,
    noConcludedDocuments,
    expiredDocuments,
  } = categorizeTasks(documents);

  return (
    <ul className={styles.filter_type}>
      <li
        className={typeFilter === "all" ? styles.selected : ""}
        onClick={() => setTypeFilter("all")}
      >
        <ClipboardCheck />
        <span>Todas as tarefas ({documents?.length})</span>
      </li>
      <li
        className={typeFilter === "today" ? styles.selected : ""}
        onClick={() => setTypeFilter("today")}
      >
        <Clock1 />
        <span> Hoje ({concludedTodayDocuments?.length})</span>
      </li>
      <li
        className={typeFilter === "checked" ? styles.selected : ""}
        onClick={() => setTypeFilter("checked")}
      >
        <CheckCircle2 />
        <span>Concluidas ({concludedDocuments?.length})</span>
      </li>
      <li
        className={typeFilter === "expired" ? styles.selected : ""}
        onClick={() => setTypeFilter("expired")}
      >
        <XCircle />
        <span>Expiradas ({expiredDocuments?.length})</span>
      </li>
      <li
        className={typeFilter === "no-checked" ? styles.selected : ""}
        onClick={() => setTypeFilter("no-checked")}
      >
        <AlertCircle />
        <span>Pendentes ({noConcludedDocuments?.length})</span>
      </li>
    </ul>
  );
}
