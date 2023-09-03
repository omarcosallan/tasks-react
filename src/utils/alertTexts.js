import { categorizeTasks } from "./categorizeTasks";

export function alertTexts(user, documents, setTypeFilter) {
  let icon = "";
  let description = "";
  let textButton = "";

  const { concludedDocuments, concludedTodayDocuments, noConcludedDocuments } =
    categorizeTasks(documents);

  if (
    concludedDocuments?.length > 0 &&
    concludedDocuments?.length === documents?.length
  ) {
    icon = `⚡`;
    description = `Parabéns, ${user?.displayName}! Você concluiu todas as suas tarefas.`;
    textButton = "Tarefas concluidas";
    setTypeFilter("all");
  } else if (concludedTodayDocuments?.length > 0) {
    icon = "⏱";
    description = `${
      concludedTodayDocuments?.length === 1 ? " Uma" : " Algumas"
    } de suas tarefas de hoje ${
      concludedTodayDocuments?.length === 1 ? " está " : " estão "
    } prestes a expirar.`;
    textButton = "Tarefas a expirar";
    setTypeFilter("today");
  } else if (noConcludedDocuments?.length > 0) {
    icon = "⏳";
    description = `Você tem ${
      noConcludedDocuments?.length === 1
        ? " uma tarefa pendente"
        : " algumas tarefas pendentes"
    }, mantenha o cuidado para não acumulá-las.`;
    textButton = "Tarefas expiradas";
    setTypeFilter("expired");
  }

  return { description, textButton, icon };
}
