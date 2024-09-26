export const getOperationalChecklistData = ({
  isWorkerOne,
  pluginData,
  selectedTask,
}: any) => {
  const workerQuestion = isWorkerOne ? "question-1" : "question-2";

  const tasks = pluginData[selectedTask.chapterIdx]?.chapter?.tasks;
  const workerOneQuestions = tasks
    ? tasks[selectedTask.taskIdx]?.questions["question-1"] || {}
    : {};

  if (!workerOneQuestions) {
    return null;
  }

  const workerTwoQuestion =
    tasks[selectedTask.taskIdx]?.questions["question-2"] || {};
  const workerOneQuestionsText = workerOneQuestions.text;
  const workerTwoQuestionText = workerTwoQuestion.text
    ? workerTwoQuestion.text
    : workerOneQuestions.text;

  return {
    workerQuestion,
    workerOneQuestions,
    workerTwoQuestion,
    workerOneQuestionsText,
    workerTwoQuestionText,
  };
};
