import styles from "./FormNewTask.module.css";

import { useInsertDocument } from "../hooks/useInsertDocument";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Timestamp } from "firebase/firestore";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const createNewTaskFormSchema = z.object({
  title: z
    .string()
    .nonempty("O título é obrigatório.")
    .min(6, "O título precisa de no mínimo 6 caracteres.")
    .transform((title) => {
      return title[0].toUpperCase().concat(title.substring(1)).trim();
    }),
  description: z
    .string()
    .nonempty("A descrição é obrigatória.")
    .min(6, "A descrição precisa de no mínimo 6 caracteres.")
    .max(100, "A descrição deve conter no máximo 100 caracteres."),
  finishIn: z
    .string()
    .refine((value) => {
      return !!value;
    }, "A data é obrigatória.")
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date);
    }, "A data é inválida.")
    .refine((value) => {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate > currentDate;
    }, "A data precisa ser maior que a data atual."),
});

export function FormNewTask({ user }) {
  const { insertDocument } = useInsertDocument("tasks");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createNewTaskFormSchema),
  });

  function createNewTask(data) {
    insertDocument({
      title: data.title,
      description: data.description,
      finishIn: Timestamp.fromDate(new Date(data.finishIn)),
      createdBy: user.uid,
      concluded: false,
    });
    navigate("/");
  }

  return (
    <form
      className={`${styles.new_task} animate__animated `}
      onSubmit={handleSubmit(createNewTask)}
      ref={formRef}
    >
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" name="title" {...register("title")} />
        {errors?.title && (
          <span className={styles.error}>{errors?.title.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="description">Descricão:</label>
        <input type="text" name="description" {...register("description")} />
        {errors?.description && (
          <span className={styles.error}>{errors?.description.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="description">Data de vencimento:</label>
        <input
          type="datetime-local"
          name="description"
          {...register("finishIn")}
          className="input_calendar"
        />
        {errors?.finishIn && (
          <span className={styles.error}>{errors?.finishIn.message}</span>
        )}
      </div>
      <button type="submit">Adicionar tarefa</button>
    </form>
  );
}
