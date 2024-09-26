// import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckIcon from "@mui/icons-material/Check";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useEffect, useState } from "react";
// import { OperationalFullChapterList } from "./OperationalFullChapterList";
import { getOperationalChecklistData } from "./logic/getOperationalChecklistData";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export function OperationalChecklist({
  pluginData,
  selectedTask,
  isShowSoloChecklist,
  // setIsShowSoloChecklist,
  isEditMode,
}: any) {
  const [testState, setTestState] = useState(false);

  if (!selectedTask) return null;

  const isShouldShowWorkerOne = isShowSoloChecklist == 1;
  const isShouldShowWorkerTwo = isShowSoloChecklist == 2;
  // const isShouldShowBoth = isShowSoloChecklist == null;

  return (
    <div className="operational-checklist-wrapper">
      {isShouldShowWorkerTwo ? null : (
        <div style={{ flex: 1 }}>
          <IndividualChecklist
            pluginData={pluginData}
            selectedTask={selectedTask}
            isEditMode={isEditMode}
            testState={testState}
            setTestState={setTestState}
          />
        </div>
      )}

      {isShouldShowWorkerOne ? null : (
        <div style={{ flex: 1 }}>
          <IndividualChecklist
            pluginData={pluginData}
            selectedTask={selectedTask}
            isWorkerOne
            isEditMode={isEditMode}
            testState={testState}
            setTestState={setTestState}
          />
        </div>
      )}
    </div>
  );
}

const IndividualChecklist = ({
  pluginData,
  selectedTask,
  isWorkerOne,
  isEditMode,
  testState,
  setTestState,
}: any) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {
    workerQuestion,
    workerOneQuestions,
    workerTwoQuestion,
    workerOneQuestionsText,
    workerTwoQuestionText,
  }: any = getOperationalChecklistData({
    isWorkerOne,
    pluginData,
    selectedTask,
  });

  if (!workerOneQuestions) {
    return null;
  }

  useEffect(
    () =>
      setIsChecked(
        isWorkerOne ? workerOneQuestions.isChecked : workerTwoQuestion.isChecked
      ),
    []
  );

  const isCurrentTaskChecked = isWorkerOne
    ? workerOneQuestions.isChecked
    : workerTwoQuestion.isChecked;

  return (
    <div style={{ height: "3.5em" }}>
      <div
        style={{
          color: "white",
          borderLeft: isWorkerOne ? "1px solid white" : "",
          borderBottom: "1px solid white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            marginLeft: "1em",
          }}
        >
          {!isCurrentTaskChecked ? (
            checkPreviousTasks(pluginData, selectedTask, isWorkerOne) ? (
              <GpsFixedIcon
                onClick={() => {
                  // console.log({ pluginData, selectedTask });
                  const testValue = checkPreviousTasks(
                    pluginData,
                    selectedTask,
                    isWorkerOne
                  );
                  // console.log({ testValue });
                  if (!testValue) {
                    return;
                  }
                  if (isEditMode) {
                    if (isWorkerOne) {
                      workerOneQuestions.isChecked = false;
                    } else {
                      workerTwoQuestion.isChecked = false;
                    }
                    return;
                  }
                  if (selectedTask?.chapterIdx != 0) {
                    if (
                      pluginData[selectedTask?.chapterIdx - 1]?.chapter.tasks[0]
                        .questions[workerQuestion].isChecked == false
                    ) {
                      return null;
                    }
                    if (selectedTask.taskIdx == 0) {
                    } else {
                      if (
                        pluginData[selectedTask?.chapterIdx]?.chapter?.tasks[
                          selectedTask.taskIdx - 1
                        ].questions[workerQuestion].isChecked == false
                      ) {
                        return null;
                      }
                    }
                  }

                  if (isWorkerOne) {
                    workerOneQuestions.isChecked = true;
                  } else {
                    workerTwoQuestion.isChecked = true;
                  }
                  setIsChecked(!isChecked);
                }}
              />
            ) : (
              <RadioButtonUncheckedIcon />
            )
          ) : (
            <CheckIcon
              // sx={{ color: "#40e01f" }}
              sx={isEditMode ? { color: "red" } : { color: "#40e01f" }}
              onClick={() => {
                // console.log(
                //   isWorkerOne ? workerOneQuestions : workerTwoQuestion
                // );
                if (isEditMode) {
                  console.log(
                    checkNextTask(
                      pluginData,
                      selectedTask,
                      isWorkerOne ? true : false
                    )
                  );
                  if (
                    !checkNextTask(
                      pluginData,
                      selectedTask,
                      isWorkerOne ? true : false
                    )
                  ) {
                    if (selectedTask?.chapterIdx != 0) {
                      if (
                        pluginData[selectedTask?.chapterIdx - 1]?.chapter
                          .tasks[0].questions["question-1"].isChecked == false
                      ) {
                        return null;
                      }
                    }
                    if (isWorkerOne) {
                      workerOneQuestions.isChecked = false;
                    } else {
                      workerTwoQuestion.isChecked = false;
                    }
                    setTestState(!testState);
                    return;
                  }
                  // if (selectedTask?.chapterIdx != 0) {
                  //   if (
                  //     pluginData[selectedTask?.chapterIdx - 1]?.chapter.tasks[0]
                  //       .questions["question-1"].isChecked == false
                  //   ) {
                  //     return null;
                  //   }
                  // }
                  // if (isWorkerOne) {
                  //   workerOneQuestions.isChecked = false;
                  // } else {
                  //   workerTwoQuestion.isChecked = false;
                  // }
                  // setTestState(!testState);
                  // return;
                }
              }}
            />
          )}
        </div>

        <div
          style={{
            color: "white",
            marginRight: "1em",
            fontSize: "1.2em",
            fontWeight: "bold",
            width: "82%",
          }}
        >
          {isWorkerOne ? workerOneQuestionsText : workerTwoQuestionText}
        </div>
      </div>
    </div>
  );
};

const checkPreviousTasks = (
  pluginData: any,
  selectedTask: any,
  isWorkerOne: boolean
) => {
  const workerQuestion = isWorkerOne ? "question-1" : "question-2";
  let testVal = true;

  pluginData.forEach((chapter: any) => {
    if (!chapter) {
      return false;
    }
    for (const [key, value] of Object.entries(chapter)) {
      if (key == "chapter") {
        (value as any).tasks.forEach((task: any, taskIdx: number) => {
          if (taskIdx != selectedTask.taskIdx) {
            console.log(task);
            return;
          }
          if (selectedTask.chapterIdx == 0) {
            if (selectedTask.taskIdx == 0) {
              if (
                (selectedTask.taskIdx,
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx
                ].questions[workerQuestion].isChecked === false)
              ) {
                testVal = true;
                return;
              }
            } else {
              if (
                (selectedTask.taskIdx,
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx - 1
                ].questions[workerQuestion].isChecked === false)
              ) {
                testVal = false;
                return;
              }
            }
          } else {
            if (selectedTask.taskIdx == 0) {
              if (
                (selectedTask.taskIdx,
                pluginData[selectedTask.chapterIdx - 1].chapter.tasks[
                  pluginData[selectedTask.chapterIdx - 1].chapter.tasks.length -
                    1
                ].questions[workerQuestion].isChecked === false)
              ) {
                testVal = false;
                return;
              }
            } else {
              if (
                (selectedTask.taskIdx,
                pluginData[selectedTask.chapterIdx].chapter.tasks[
                  selectedTask.taskIdx - 1
                ].questions[workerQuestion].isChecked === false)
              ) {
                testVal = false;
                return;
              }
            }
          }
        });
      }
    }
  });
  return testVal;
};

const checkNextTask = (
  pluginData: any,
  selectedTask: any,
  isWorkerOne: boolean
): boolean => {
  const workerQuestion = isWorkerOne ? "question-1" : "question-2";

  // Get the current and next task information
  const currentChapterIdx = selectedTask.chapterIdx;
  const currentTaskIdx = selectedTask.taskIdx;

  // Check if it's the last task in the chapter
  if (
    currentTaskIdx ===
    pluginData[currentChapterIdx].chapter.tasks.length - 1
  ) {
    // Then check if it's the last chapter or not
    if (currentChapterIdx === pluginData.length - 1) {
      // If it is, there's no next task
      return false;
    } else {
      // If it's not the last chapter, get the first task of the next chapter
      return (
        pluginData[currentChapterIdx + 1].chapter.tasks[0].questions[
          workerQuestion
        ]?.isChecked === true
      );
    }
  } else {
    // If it's not the last task of the current chapter, get the next task in the same chapter
    return (
      pluginData[currentChapterIdx].chapter.tasks[currentTaskIdx + 1].questions[
        workerQuestion
      ]?.isChecked === true
    );
  }
};
