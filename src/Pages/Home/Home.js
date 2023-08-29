import styles from "./Home.module.css";
import "animate.css";

import { useEffect, useRef, useState } from "react";
import { Task } from "../../components/Task";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { Timestamp } from "firebase/firestore";
import { useFilterType } from "../../context/FilterType";

export function Home() {
  const { user } = useAuthValue();
  const { typeFilter, setTypeFilter } = useFilterType();
  const { documents } = useFetchDocuments("tasks", user.uid);
  const { insertDocument } = useInsertDocument("tasks");
  const [tasksDisplayed, setTasksDisplayed] = useState([]);
  const [error, setError] = useState(false);

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [finishIn, setFinishIn] = useState("");
  const createdBy = user.uid;

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const selectedDate = new Date(finishIn);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setError("Selecione uma data de vencimento posterior ao dia atual.");
      return;
    }

    insertDocument({
      title,
      description,
      finishIn: Timestamp.fromDate(new Date(finishIn)),
      createdBy,
      concluded: false,
    });

    setTitle("");
    setDescription("");
    setFinishIn("");
    setOpenAddNewTask(false);
  }

  const concludedDocuments = documents?.filter((doc) => doc.concluded);
  const noConcludedDocuments = documents?.filter((doc) => !doc.concluded);
  const todayDocumnets = documents?.filter(
    (doc) =>
      new Date().getDate() === doc.finishIn.toDate().getDate() && !doc.concluded
  );
  const expiredDocuments = documents?.filter(
    (doc) =>
      !doc.concluded && doc.finishIn.toDate().getTime() < new Date().getTime()
  );

  const progressPercentage =
    (concludedDocuments?.length / documents?.length) * 100;

  const [openAddNewTask, setOpenAddNewTask] = useState(false);
  const [isExitAddNewTask, setIsExitAddNewTask] = useState(false);

  const exitAddNewTask = async (value) => {
    await setIsExitAddNewTask(!value);

    function time() {
      if (value) {
        return 0;
      } else return 500;
    }

    setTimeout(() => {
      setOpenAddNewTask(value);
    }, time());
  };

  const newTaskRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (newTaskRef.current && !newTaskRef.current.contains(event.target)) {
        setIsExitAddNewTask(true);

        setTimeout(() => {
          setOpenAddNewTask(false);
        }, 500);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      <div className={styles.create_new_task}>
        <button onClick={() => exitAddNewTask(!openAddNewTask)}>+</button>
      </div>

      {documents && (
        <ul className={styles.filter_type}>
          <li
            className={typeFilter === "all" ? styles.selected : ""}
            onClick={() => setTypeFilter("all")}
          >
            <span>Todas as tarefas ({documents?.length})</span>
          </li>
          <li
            className={typeFilter === "today" ? styles.selected : ""}
            onClick={() => setTypeFilter("today")}
          >
            <span> Hoje ({todayDocumnets?.length})</span>
          </li>
          <li
            className={typeFilter === "checked" ? styles.selected : ""}
            onClick={() => setTypeFilter("checked")}
          >
            <span>Concluidas ({concludedDocuments?.length})</span>
          </li>
          <li
            className={typeFilter === "expired" ? styles.selected : ""}
            onClick={() => setTypeFilter("expired")}
          >
            <span>Expiradas ({expiredDocuments?.length})</span>
          </li>
          <li
            className={typeFilter === "no-checked" ? styles.selected : ""}
            onClick={() => setTypeFilter("no-checked")}
          >
            <span>Pendentes ({noConcludedDocuments?.length})</span>
          </li>
        </ul>
      )}

      {tasksDisplayed?.length === 0 ? (
        <p style={{ textAlign: "center" }}>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className={`${styles.tasks}`}>
          {tasksDisplayed &&
            tasksDisplayed.map((task) => <Task task={task} key={task.id} />)}
        </ul>
      )}

      {openAddNewTask && (
        <form
          className={`${styles.new_task} animate__animated ${
            isExitAddNewTask ? "animate__bounceOut" : "animate__bounceIn"
          } `}
          onSubmit={(e) => handleSubmit(e)}
          ref={newTaskRef}
        >
          <label>
            <span>Título:</span>
            <input
              type="text"
              placeholder="Título"
              maxLength="20"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>Descrição (Opcional):</span>
            <input
              type="text"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>Concluir até: </span>
            <input
              type="datetime-local"
              placeholder="Concluir até"
              required
              value={finishIn}
              onChange={(e) => setFinishIn(e.target.value)}
            />
          </label>
          {error && <p>{error}</p>}
          <button type="submit">Adicionar tarefa</button>
        </form>
      )}
    </div>
  );
}
