import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Dashboard.module.css";

import { useFilterType } from "../../context/FilterType";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useAuthValue();
  const { documents } = useFetchDocuments("tasks", user.uid);
  const { setTypeFilter } = useFilterType();

  const concludedDocuments = documents?.filter((doc) => doc.concluded);
  const concludedTodayDocuments = documents?.filter(
    (doc) =>
      new Date().getDate() === doc.finishIn.toDate().getDate() && !doc.concluded
  );
  const noConcludedDocuments = documents?.filter((doc) => !doc.concluded);
  const expiredDocuments = documents?.filter(
    (doc) =>
      doc.finishIn.toDate().getDate() <= new Date().getDate() && !doc.concluded
  );

  return (
    <div className={`${styles.dashboard} animate__animated animate__fadeIn`}>
      {documents?.length > 0 && <h1>Dashboard</h1>}

      <div className={styles.resum}>
        {documents?.length > 0 && (
          <>
            <div className={styles.notification}>
              {concludedDocuments?.length > 0 &&
                concludedDocuments?.length === documents?.length && (
                  <div className={`${styles.card} ${styles.alert}`}>
                    <span className={styles.icon}>&#9889;</span>
                    <p>
                      Parabéns, {user?.displayName}! &#128079;
                      <br />
                      Você concluiu todas as suas tarefas.
                    </p>
                    <Link to="/" onClick={() => setTypeFilter("checked")}>
                      Tarefas concluidas
                    </Link>
                  </div>
                )}

              {concludedTodayDocuments?.length > 0 && (
                <div className={`${styles.card} ${styles.alert}`}>
                  <span className={styles.icon}>&#9201;</span>
                  <p>
                    {concludedTodayDocuments?.length === 1
                      ? " Uma"
                      : " Algumas"}{" "}
                    de suas tarefas de hoje
                    {concludedTodayDocuments?.length === 1
                      ? " está "
                      : " estão "}
                    prestes a expirar.
                  </p>
                  <Link to="/" onClick={() => setTypeFilter("today")}>
                    Tarefas a expirar
                  </Link>
                </div>
              )}

              {noConcludedDocuments?.length > 0 && (
                <div className={`${styles.card} ${styles.alert}`}>
                  <span className={styles.icon}>&#9203;</span>
                  <p>
                    Você tem
                    {noConcludedDocuments?.length === 1
                      ? " uma tarefa pendente"
                      : " algumas tarefas pendentes"}
                    , mantenha o cuidado para não acumulá-las.
                  </p>
                  <Link to="/" onClick={() => setTypeFilter("no-checked")}>
                    Tarefas pendentes
                  </Link>
                </div>
              )}
            </div>

            <div className={`${styles.graphic_bar} ${styles.card}`}>
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
                  {Math.round(
                    (concludedDocuments?.length / documents?.length) * 100
                  )}
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
                  {Math.round(
                    (noConcludedDocuments?.length / documents?.length) * 100
                  )}
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
                  {Math.round(
                    (expiredDocuments?.length / documents?.length) * 100
                  )}
                  %)
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {documents?.length === 0 && (
        <div className={`${styles.card} ${styles.no_tasks}`}>
          <span className={styles.icon}>&#128546;</span>
          <h2>Que pena!</h2>
          <p>
            Você ainda não criou nenhuma tarefa.
            <br />
            Volte para a página inicial e comece sua jornada no To Do List.
          </p>
          <a href="/">Criar primeira tarefa</a>
        </div>
      )}
    </div>
  );
}
