import { FormNewTask } from "../../components/FormNewTask";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./NewTask.module.css";

export function NewTask() {
  const { user } = useAuthValue();
  return (
    <div className={styles.new_task}>
      <h1>Crie uma nova tarefa</h1>
      <FormNewTask user={user} />
    </div>
  );
}
