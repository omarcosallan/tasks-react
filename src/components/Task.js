import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { useEditDocument } from "../hooks/useEditDocument";
import styles from "./Task.module.css";

export function Task({ task }) {
  const { editDocument } = useEditDocument("tasks");
  const { deleteDocument } = useDeleteDocument("tasks");

  function handleConcluded(id) {
    const updatedData = {
      concluded: !task.concluded,
    };
    editDocument(id, updatedData);
  }

  function handleDeleted(id) {
    deleteDocument(id);
  }

  return (
    <li
      className={`${styles.tasks_item} ${
        task.concluded ? styles.checked : ""
      } ${
        !task.concluded &&
        task.finishIn.toDate().getDate() <= new Date().getDate()
          ? styles.expired
          : ""
      }`}
    >
      <div>
        <h2>{task.title}</h2>
        <p className={styles.tasks_description}>{task.description}</p>
      </div>
      <div>
        <div className={styles.tasks_informations}>
          <span>
            {task.finishIn.toDate().getDate() <= new Date().getDate()
              ? "Expira em: "
              : "Expirou em: "}
            {task.finishIn.toDate().toLocaleString()}
          </span>
        </div>
        <div className={styles.tasks_buttons}>
          <button
            className={task.concluded ? styles.checked : ""}
            onClick={() => handleConcluded(task.id)}
          >
            {task.concluded ? "Desmarcar" : "Concluir"}
          </button>
          <button
            style={
              task.concluded
                ? { backgroundColor: "var(--secondary-background-color)" }
                : { backgroundColor: "rgba(233, 63, 63, 255)" }
            }
            onClick={() => handleDeleted(task.id)}
          >
            Deletar
          </button>
        </div>
      </div>
    </li>
  );
}
