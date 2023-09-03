import { categorizeTasks } from "../utils/categorizeTasks";
import styles from "./Graphic.module.css";

export function Graphic({ documents }) {
  const { concludedDocuments, noConcludedDocuments, expiredDocuments } =
    categorizeTasks(documents);

  return (
    <div className={`${styles.graphic_bar} ${styles.card}}`}>
      <div>
        <div className={styles.bar}>
          <div
            style={{
              height: "100%",
              backgroundColor: "var(--blue-color)",
            }}
            className="blue"
          ></div>
        </div>
        <span>Todas as tarefas ({documents?.length})</span>
      </div>
      <div>
        <div className={styles.bar}>
          <div
            style={{
              height: `${
                (concludedDocuments?.length / documents?.length) * 100
              }%`,
              backgroundColor: "var(--green-color)",
            }}
          ></div>
        </div>
        <span>
          Concluidas (
          {Math.round((concludedDocuments?.length / documents?.length) * 100)}
          %)
        </span>
      </div>
      <div>
        <div className={styles.bar}>
          <div
            style={{
              height: `${
                (noConcludedDocuments?.length / documents?.length) * 100
              }%`,
              backgroundColor: "var(--red-color)",
            }}
          ></div>
        </div>
        <span>
          Pendentes (
          {Math.round((noConcludedDocuments?.length / documents?.length) * 100)}
          %)
        </span>
      </div>
      <div>
        <div className={styles.bar}>
          <div
            style={{
              height: `${
                (expiredDocuments?.length / documents?.length) * 100
              }%`,
              backgroundColor: "var(--cyan-color)",
            }}
          ></div>
        </div>
        <span>
          Expiradas (
          {Math.round((expiredDocuments?.length / documents?.length) * 100)}
          %)
        </span>
      </div>
    </div>
  );
}
