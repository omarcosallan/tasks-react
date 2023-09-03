import styles from "./Home.module.css";
import "animate.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Task } from "../../components/Task";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useFilterType } from "../../context/FilterType";
import { categorizeTasks } from "../../utils/categorizeTasks";
import { FormNewTask } from "../../components/FormNewTask";
import { FilterType } from "../../components/FilterType";
import { Plus } from "lucide-react";

export function Home() {
  const { user } = useAuthValue();
  const { typeFilter } = useFilterType();
  const { documents } = useFetchDocuments("tasks", user.uid);
  const [tasksDisplayed, setTasksDisplayed] = useState([]);

  const { concludedDocuments } = categorizeTasks(documents);

  const progressPercentage =
    (concludedDocuments?.length / documents?.length) * 100;

  useEffect(() => {
    if (typeFilter === "all") {
      setTasksDisplayed(documents);
    } else if (typeFilter === "today") {
      const currentDate = new Date();
      setTasksDisplayed(
        documents?.filter(
          (doc) =>
            currentDate.getDate() === doc.finishIn.toDate().getDate() &&
            !doc.concluded
        )
      );
    } else if (typeFilter === "checked") {
      setTasksDisplayed(documents?.filter((doc) => doc.concluded));
    } else if (typeFilter === "expired") {
      setTasksDisplayed(
        documents?.filter(
          (doc) =>
            doc.finishIn.toDate().getTime() < new Date().getTime() &&
            !doc.concluded
        )
      );
    } else if (typeFilter === "no-checked") {
      setTasksDisplayed(documents?.filter((doc) => !doc.concluded));
    }
  }, [typeFilter, documents]);

  return (
    <div className={`${styles.home} animate__animated animate__fadeIn`}>
      <div className={styles.progress}>
        <div className={styles.progress_status_container}>
          <div
            className={styles.progress_status}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <Link className={styles.create_new_task} to={"create/task"}>
        <Plus color="var(--text-color)" />
      </Link>

      {documents && <FilterType user={user} />}

      {tasksDisplayed?.length === 0 ? (
        <p style={{ textAlign: "center" }}>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className={`${styles.tasks}`}>
          {tasksDisplayed &&
            tasksDisplayed.map((task) => <Task task={task} key={task.id} />)}
        </ul>
      )}
    </div>
  );
}
