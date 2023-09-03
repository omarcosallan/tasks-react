import styles from "./NoTasks.module.css";

import { Link } from "react-router-dom";

export function NoTasks() {
  return (
    <div className={`${styles.card} ${styles.no_tasks}`}>
      <span className={styles.icon}>&#128546;</span>
      <h1>Que pena!</h1>
      <strong>
        Você ainda não criou nenhuma tarefa.
        <br />
        Volte para a página inicial e comece sua jornada no To Do List.
      </strong>
      <Link to="/create/task">Criar primeira tarefa</Link>
    </div>
  );
}
