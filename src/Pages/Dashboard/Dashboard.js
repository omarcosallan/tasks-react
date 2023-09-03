import styles from "./Dashboard.module.css";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import { useFilterType } from "../../context/FilterType";

import { useScoreUser } from "../../hooks/useScoreUser";
import { Alert } from "../../components/Alert";
import { alertTexts } from "../../utils/alertTexts";
import { Graphic } from "../../components/Graphic";
import { NoTasks } from "../../components/NoTasks";

import {
  AlertCircle,
  CheckCircle2,
  ClipboardCheck,
  Clock1,
  XCircle,
} from "lucide-react";

export function Dashboard() {
  const { user } = useAuthValue();
  const { documents } = useFetchDocuments("tasks", user.uid);
  const { scoreCompleted, scoreNoCompleted, scoreExpired } = useScoreUser();
  const { setTypeFilter } = useFilterType();

  const { description, textButton, icon } = alertTexts(
    user,
    documents,
    setTypeFilter
  );

  return (
    <div className={`${styles.dashboard} animate__animated animate__fadeIn`}>
      {documents?.length > 0 && <h1>Dashboard</h1>}

      <div className={styles.resum}>
        {documents?.length > 0 && (
          <>
            <div className={styles.notification}>
              <Alert
                icon={icon}
                description={description}
                textButton={textButton}
              />
            </div>
            <div className={styles.informations}>
              <Graphic documents={documents} />

              <div className={`${styles.score} ${styles.card}}`}>
                <h2>Score (Pontos)</h2>
                <div>
                  <p
                    style={{
                      backgroundColor: "var(--green-color)",
                      color: "var(--main-background-color)",
                    }}
                  >
                    <CheckCircle2 />
                    Concluidas: {scoreCompleted}
                  </p>
                  <p
                    style={{
                      backgroundColor: "var(--cyan-color)",
                      color: "var(--main-background-color)",
                    }}
                  >
                    <AlertCircle />
                    Pendentes: {scoreNoCompleted}
                  </p>
                  <p
                    style={{
                      backgroundColor: "var(--red-color)",
                      color: "var(--main-background-color)",
                    }}
                  >
                    <XCircle />
                    Expiradas: {scoreExpired}
                  </p>
                  <p
                    style={{ backgroundColor: "var(--main-background-color)" }}
                  >
                    <ClipboardCheck />
                    Total: {scoreCompleted + scoreNoCompleted + scoreExpired}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {documents?.length === 0 && <NoTasks />}
    </div>
  );
}
